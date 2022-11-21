import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Form.css";

import next from "../../assets/form/next.svg";
import back from "../../assets/form/back.svg";
import errorimg from "../../assets/form/error.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  localStorageKeys,
  sessionStorageKeys,
} from "../../constants/localStorage.js";
import { ROUTES } from "../../constants/routes";

export const Form = ({ setForm, setFormEnd }) => {
  const [formState, setFormState] = useState(1);
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [ziperror, setZipError] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  // const [phoneError, setPhoneError] = useState(false);
  // const [nameError, setNameError] = useState(false);
  // const nav = useNavigate();
  // const fbc = Cookies.get("_fbc") || "";
  // const fbp = Cookies.get("_fbp") || "";
  const [search] = useSearchParams();

  useEffect(() => {
    var response;
    async function getIpAdd() {
      try {
        response = await axios.get(
          "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572",
          {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let userip = response.data["IPv4"];
        // add dynamic
        let campaignname = search.get("CID");
        let adsetname = search.get("ADS_ID");
        let adname = search.get("ADID");
        let fbclid = search.get("fbclid");
        let utmsource = search.get("utm_source");

        // setFormData({
        //   ...formData,
        //   userIp: userip,
        //   Campaign_Name: campaignname,
        //   Adset_Name: adsetname,
        //   Ad_Name: adname,
        //   fbclid: fbclid,
        //   utm_source: utmsource,
        // });

        sessionStorage.setItem(
          sessionStorageKeys.utm_fbclid,
          JSON.stringify({
            userIp: userip,
            Campaign_Name: campaignname,
            Adset_Name: adsetname,
            Ad_Name: adname,
            fbclid: fbclid,
            utm_source: utmsource,
          })
        );

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          utm_source: utmsource,
          campaign_id: campaignname,
          adset_id: adsetname,
          ad_id: adname,
        });
      } catch (error) {
        // setFormData({
        //   ...formData,
        //   userIp: error.response.data ? error.response.data["IPv4"] : "",
        //   Campaign_Name: "",
        //   Adset_Name: "",
        //   Ad_Name: "",
        //   fbclid: "",
        //   utm_source: "",
        // });

        sessionStorage.setItem(
          sessionStorageKeys.utm_fbclid,
          JSON.stringify({
            userIp: error.response.data ? error.response.data["IPv4"] : "",
            Campaign_Name: campaignname,
            Adset_Name: adsetname,
            Ad_Name: adname,
            fbclid: fbclid,
            utm_source: utmsource,
          })
        );

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          utm_source: "",
          campaign_id: "",
          adset_id: "",
          ad_id: "",
        });
      }
    }
    getIpAdd();
  }, []);

  const navigate = useNavigate();

  const incFormState = () => {
    navigate(ROUTES.zipCodeForm);
    // if (!emailError && !phoneError) {
    //   if(formState === 1){
    //     navigate(ROUTES.zipCodeForm)
    //   }
    //   setFormState(formState + 1);
    // }
  };

  // const incZipFormState = () => {
  //   if (!error) {
  //     const temp = document.getElementById("leadid_token").value;
  //     axios
  //       .get("https://api.zippopotam.us/us/" + formData["zip"], {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         mode: "no-cors",
  //       })
  //       .then((response) => {
  //         setFormData({
  //           ...formData,
  //           user_agent: navigator.userAgent,
  //           fbc: fbc,
  //           fbp: fbp,
  //           city: response.data["places"][0]["place name"],
  //           state: response.data["places"][0]["state"],
  //           caller_state: response.data["places"][0]["state abbreviation"],
  //           JornayaToken: temp,
  //         });
  //       })
  //       .then((data) => setFormState(formState + 1))
  //       .catch((error) => {
  //         setZipError(true);
  //       });
  //   }
  // };

  // const incName = () => {
  //   if (
  //     formData.firstName === undefined ||
  //     formData.lastName === undefined ||
  //     !formData.firstName.match(/^[A-Za-z]+$/) ||
  //     !formData.lastName.match(/^[A-Za-z]+$/)
  //   ) {
  //     setNameError(true);
  //   } else {
  //     setNameError(false);
  //     incFormState();
  //   }
  // };

  // const decFormState = () => {
  //   setFormState(formState - 1);
  // };

  // const checkZip = (e) => {
  //   const v = e.target.value;
  //   setFormData({ ...formData, zip: v });
  //   if (v.length < 5) {
  //     setError(true);
  //     setZipError(false);
  //   } else {
  //     setFormData({ ...formData, zip: v });
  //     setError(false);
  //   }
  // };

  // const enterZip = (e) => {
  //   if (e.key === "Enter") {
  //     incZipFormState();
  //   }
  // };

  // const checkEmail = (e) => {
  //   var validRegex =
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   const v = e.target.value;

  //   setFormData({ ...formData, email: v });
  //   if (v.match(validRegex)) {
  //     setEmailError(false);
  //   } else {
  //     setEmailError(true);
  //   }
  // };

  // const checkPhone = (e) => {
  //   const v = e.target.value;
  //   setFormData({ ...formData, homePhone: v });

  //   if (v.length < 10 || !v.match(/^[0-9]+$/)) {
  //     setPhoneError(true);
  //   } else {
  //     setPhoneError(false);
  //   }
  // };

  // const updateLastSavedFormValues = (values) =>{
  //   const currentFormValues = localStorage.getItem(localStorageKeys.lastSubmittedData);
  //   values.createdDate = new Date();
  //   let finalValue = [];

  //   if(currentFormValues){
  //     const parsed = JSON.stringify(currentFormValues);
  //     if(Array.isArray(parsed)){
  //       const copyParsedValues = [...parsed];
  //       copyParsedValues.push(values);
  //       finalValue = copyParsedValues
  //     } else {
  //       localStorage.removeItem(localStorageKeys.lastSubmittedData)
  //       finalValue = [values]
  //     }
  //   } else {
  //     finalValue = [values]
  //   }

  //   localStorage.setItem(localStorageKeys.lastSubmittedData, JSON.stringify(finalValue))
  // }

  const blankEnter = (e) => {};

  return (
    <form
      action="POST"
      onSubmit={blankEnter}
      className="form row-gap-30 flex-d-col"
    >
      <div className="row-gap-20 flex-d-col">
        <div className="font-40 bold color-primary main-headline">
          Medicare Open Enrollment Update
        </div>
      </div>

      {formState === 1 && (
        <div className="form-card-holder flex-a-cen-j-cen row-gap-30 flex-d-col">
          <div className="form-completion">
            <div className="semi-bold font-16 color-accent-blue">
              20% Completed
            </div>
            <div className="form-completion-bar twenty-percent">
              <div className="loadingbar"></div>
            </div>
          </div>

          <div className="form-ques-card row-gap-30">
            <div className="font-24 color-primary">
              Are you over 64 years old?
            </div>
            <div className="form-options row-gap-20 flex-d-col flex-a-cen">
              <div
                onClick={() => {
                  // setFormData({ ...formData, ageAbove64: "yes" });
                  sessionStorage.setItem(sessionStorageKeys.ageAbove64, "yes");
                  incFormState();
                }}
                className="form-age-option font-24 color-primary"
              >
                Yes
              </div>
              <div
                onClick={() => {
                  // setFormData({ ...formData, ageAbove64: "no" });
                  sessionStorage.setItem(sessionStorageKeys.ageAbove64, "no");
                  incFormState();
                }}
                className="form-age-option font-24 color-primary"
              >
                No
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {formState === 2 && (
        <div className="form-card-holder flex-a-cen-j-cen row-gap-30 flex-d-col">
          <div className="form-completion">
            <div className="semi-bold font-16 color-accent-blue">
              50% Completed
            </div>
            <div className="form-completion-bar fifty-percent">
              <div className="loadingbar"></div>
            </div>
          </div>
          <div className="form-ques-card row-gap-30">
            <div className="font-24 color-primary">What's your Zipcode?</div>
            <div className="form-options row-gap-30 flex-d-col">
              <div>
                <input
                  onKeyPress={(e) => {
                    enterZip(e);
                  }}
                  value={formData.zip}
                  required
                  maxLength={5}
                  type="text"
                  onChange={checkZip}
                  name=""
                  id=""
                  placeholder="Zipcode"
                />
                {error ? (
                  <div className="form-error font-12">
                    <img src={errorimg} alt="" /> &nbsp;&nbsp; Zipcode must be
                    at least 5 characters.
                  </div>
                ) : (
                  ""
                )}
                {ziperror ? (
                  <div className="form-error font-12">
                    <img src={errorimg} alt="" /> &nbsp;&nbsp; Enter a valid US
                    Zipcode
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div
                onClick={incZipFormState}
                className="form-option-continue color-white font-20 bold"
              >
                Continue <img src={next} alt="" />
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* {formState === 3 && (
        <div className="flex-a-cen-j-cen flex-d-col row-gap-30 form-card-holder">
          <div className="form-completion">
            <div className="semi-bold font-16 color-accent-blue">
              90% Completed
            </div>
            <div className="form-completion-bar ninty-percent">
              <div className="loadingbar"></div>
            </div>
          </div>
          <div className="form-ques-card row-gap-30">
            <div className="font-24 color-primary">What’s your Full Name?</div>
            <div className="form-options row-gap-20 flex-d-col">
              <div>
                <input
                  value={formData.firstName}
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                  }}
                  type="text"
                  name=""
                  id=""
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  value={formData.lastName}
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                  }}
                  type="text"
                  name=""
                  id=""
                  placeholder="Last Name"
                />
              </div>
              {nameError ? (
                <div className="form-error font-12 flex-a-cen color-error">
                  <img src={errorimg} alt="" /> &nbsp;&nbsp; Fill all the fields
                  correctly!
                </div>
              ) : (
                ""
              )}
              <div
                onClick={incName}
                className="form-option-continue color-white font-20 bold"
              >
                Continue <img src={next} alt="" />
              </div>
              <div
                onClick={decFormState}
                className="form-option-back color-primary font-20 bold"
              >
                <img src={back} alt="" /> &nbsp; Back
              </div>
            </div>
          </div>
        </div>
      )}

      {formState === 4 && (
        <div className="form-card-holder flex-a-cen-j-cen flex-d-col row-gap-30">
          <div className="form-completion">
            <div className="semi-bold font-16 color-accent-blue">
              100% Completed
            </div>
            <div className="form-completion-bar hundred-percent">
              <div className="loadingbar"></div>
            </div>
          </div>
          <div className="form-ques-card row-gap-30 flex-d-col">
            <div className="font-24 color-primary">
              Thanks{" "}
              <strong>
                {formData["firstName"]} {formData["lastName"]}
              </strong>
              , We’ve Found Plans in your Area.
            </div>
            <div className="form-options row-gap-20 flex-d-col">
              <div>
                <input
                  value={formData.email}
                  onChange={checkEmail}
                  pattern=".+@globex\.com"
                  type={"email"}
                  name=""
                  id=""
                  placeholder="Email"
                  required
                />
                {emailError ? (
                  <div className="form-error font-12">
                    <img src={errorimg} alt="" /> &nbsp;&nbsp; Enter a valid
                    email id.
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  maxLength={10}
                  value={formData.homePhone}
                  onChange={checkPhone}
                  type="text"
                  name=""
                  id=""
                  placeholder="Phone Number"
                  required
                />
                {phoneError ? (
                  <div className="form-error font-12">
                    <img src={errorimg} alt="" /> &nbsp;&nbsp; Enter valid phone
                    number.
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button
                onClick={submit}
                className="bg-accent-green form-give-quote color-white font-20 bold"
              >
                View My Quote <img src={next} alt="" />
              </button>
              <div
                onClick={decFormState}
                className="form-option-back color-primary font-20 bold"
              >
                <img src={back} alt="" /> &nbsp; Back
              </div>
            </div>

            <div className="font-13 color-dark-grey tcpa">
              <label>
                By pressing the "View My Quote" (1) I provide my express written
                consent via electronic signature to receive emails, telephone
                calls, text messages (SMS), artificial or pre-recorded messages
                from Senior Assistant its Affiliates, And/Or Any{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="//seniorhealthbenefits.co/partner-list.html"
                >
                  {" "}
                  Third-Party Partners{" "}
                </a>{" "}
                (or their service provider partners on their behalf) regarding
                their products and services (Including Medicare Advantage plans,
                Medicare Part D Prescription Drug Plans or Medicare Supplement
                Insurance Plans, Final Expense Plans) at the email address and
                telephone number provided, including my wireless phone number
                (if provided). utilizing an automated telephone dialing system
                and I understand that I am not required to grant this consent as
                a condition of purchasing and property, goods or services from
                the foregoing companies and my consent can be revoked at any
                time. (2) I agree to this websites{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="//seniorhealthbenefits.co/privacy-policy.html"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="//seniorhealthbenefits.co/terms.html">Terms of Use</a>.
                (3) I understand that this is a solicitation for insurance.
                Plans are insured or covered by a Medicare Advantage
                organization with a Medicare contract and/or a Medicare-approved
                Part D sponsor. Enrollment in the plan depends on the plan’s
                contract renewal with Medicare. We do not offer every plan
                available in your area. Any information we provide is limited to
                those plans we do offer in your area. Please contact
                Medicare.gov or 1–800 MEDICARE to get information on all of your
                options
              </label>
            </div>
          </div>
        </div>
      )} */}
    </form>
  );
};
