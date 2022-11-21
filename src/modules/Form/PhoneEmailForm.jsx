import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import errorimg from "../../assets/form/error.svg";
import { useEffect } from "react";
import {
  sessionStorageKeys,
  localStorageKeys,
} from "../../constants/localStorage";
import next from "../../assets/form/next.svg";
import "./Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/form/back.svg";
import { ROUTES } from "../../constants/routes";
import Cookies from "js-cookie";

const EMAIL_RX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_RX = /^[0-9]+$/;

const initialValues = {
  email: "",
  homePhone: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(EMAIL_RX, "Email is not valid")
    .required("Email is required."),
  homePhone: yup
    .string()
    .required("Phone is required.")
    .matches(PHONE_RX, "Phone number is not valid")
    .min(10)
    .max(10),
});

export default function PhoneEmailForm({ setFormEnd, setForm }) {
  const navigate = useNavigate();
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const {
    handleSubmit,
    touched,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, event) => {
      sessionStorage.setItem(sessionStorageKeys.email, String(values.email));
      sessionStorage.setItem(
        sessionStorageKeys.homePhone,
        String(values.homePhone)
      );
      onSubmit();
    },
  });

  const onSubmit = () => {
    const firstName = sessionStorage.getItem(sessionStorageKeys.firstName);
    const lastName = sessionStorage.getItem(sessionStorageKeys.lastName);
    const zip = sessionStorage.getItem(sessionStorageKeys.zip);
    const ageAbove64 = sessionStorage.getItem(sessionStorageKeys.ageAbove64);
    const homePhone = sessionStorage.getItem(sessionStorageKeys.homePhone);
    const email = sessionStorage.getItem(sessionStorageKeys.email);

    const extraData = sessionStorage.getItem(sessionStorageKeys.zipCodeExtraValues);
    const utm_fbclid = sessionStorage.getItem(sessionStorageKeys.utm_fbclid);

    const zipCodeDataParsed = JSON.parse(extraData);
    const utmParsed = JSON.parse(utm_fbclid);

    const preparedData = {
      firstName,
      lastName,
      zip,
      ageAbove64,
      homePhone,
      email, ...zipCodeDataParsed, ...utmParsed
    };
    setForm(preparedData);
    save(preparedData);
  };

  const updateLastSavedFormValues = (values) => {
    const currentFormValues = localStorage.getItem(
      localStorageKeys.lastSubmittedData
    );
    values.createdDate = new Date();
    let finalValue = [];

    if (currentFormValues) {
      const parsed = JSON.stringify(currentFormValues);
      if (Array.isArray(parsed)) {
        const copyParsedValues = [...parsed];
        copyParsedValues.push(values);
        finalValue = copyParsedValues;
      } else {
        localStorage.removeItem(localStorageKeys.lastSubmittedData);
        finalValue = [values];
      }
    } else {
      finalValue = [values];
    }

    localStorage.setItem(
      localStorageKeys.lastSubmittedData,
      JSON.stringify(finalValue)
    );
  };

  const save = (formData) => {
    updateLastSavedFormValues(formData);
    const requestOptions = {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": formData.length,
      },
      body: JSON.stringify(formData),
    };
    fetch(
      "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjIwNTZjMDYzMjA0MzY1MjY0NTUzMiI_3D_pc",
      requestOptions
    )
      .then((response) => {
        sessionStorage.setItem(sessionStorageKeys.finalPreparedData, JSON.stringify(formData));
        setFormEnd({
          fname: formData.firstName,
          lname: formData.lastName,
        });

       sessionStorage.setItem(sessionStorageKeys.submitSuccessful, "yes")
      })
      .then((data) => {
        Cookies.set(
          "full_name",
          formData["firstName"] + " " + formData["lastName"]
        );
        Cookies.set("userIp", formData["userIp"]);
        Cookies.set("user_agent", formData["user_agent"]);
        Cookies.set("zip", formData["zip"]);
        Cookies.set("city", formData["city"]);
        Cookies.set("state", formData["state"]);
        Cookies.set("firstName", formData["firstName"]);
        Cookies.set("lastName", formData["lastName"]);
        Cookies.set("email", formData["email"]);
        Cookies.set("utm_source", formData["utm_source"]);
        Cookies.set("Ads_Id", formData["Adset_Name"]);
        Cookies.set("cid", formData["Campaign_Name"]);
        Cookies.set("Adid", formData["Ad_Name"]);
        Cookies.set("fbclid", formData["fbclid"]);
        Cookies.set("fbp", formData["fbp"]);
        Cookies.set("fbc", formData["fbc"]);
        Cookies.set("caller_state", formData["caller_state"]);
        Cookies.set("JornayaToken", formData["JornayaToken"]);
        navigate("../" + ROUTES.congrats);
      });
  };

  const goBack = () => navigate("../" + ROUTES.nameForm);

  const checkPreviousPageData = () => {
    const firstName = sessionStorage.getItem(sessionStorageKeys.firstName);
    const lastName = sessionStorage.getItem(sessionStorageKeys.lastName);
    setName({ firstName, lastName });
    if (firstName === null || lastName === null)
      navigate("../" + ROUTES.nameForm);
  };

  useEffect(() => {
    checkPreviousPageData();
    const homePhone = sessionStorage.getItem(sessionStorageKeys.homePhone);
    const email = sessionStorage.getItem(sessionStorageKeys.email);
    setValues({
      email: email ? email : "",
      homePhone: homePhone ? homePhone : "",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form row-gap-30 flex-d-col">
      <div className="row-gap-20 flex-d-col">
        <div className="font-40 bold color-primary main-headline">
          Medicare Open Enrollment Update
        </div>
      </div>

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
              {name.firstName} {name.lastName}
            </strong>
            , We’ve Found Plans in your Area.
          </div>
          <div className="form-options row-gap-20 flex-d-col">
            <div>
              <input
                value={values.email}
                onChange={handleChange}
                pattern=".+@globex\.com"
                type={"email"}
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              {errors.email && touched.homePhone ? (
                <div className="form-error font-12">
                  <img src={errorimg} alt="" /> &nbsp;&nbsp; {errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <input
                maxLength={10}
                value={values.homePhone}
                onChange={handleChange}
                type="text"
                name="homePhone"
                id="homePhone"
                placeholder="Phone Number"
                required
              />
              {errors.homePhone && touched.homePhone ? (
                <div className="form-error font-12">
                  <img src={errorimg} alt="" /> &nbsp;&nbsp; {errors.homePhone}
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              //   onClick={submit}
              type="submit"
              className="bg-accent-green form-give-quote color-white font-20 bold"
            >
              View My Quote <img src={next} alt="" />
            </button>
            <div
              onClick={goBack}
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
              telephone number provided, including my wireless phone number (if
              provided). utilizing an automated telephone dialing system and I
              understand that I am not required to grant this consent as a
              condition of purchasing and property, goods or services from the
              foregoing companies and my consent can be revoked at any time. (2)
              I agree to this websites{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="//seniorhealthbenefits.co/privacy-policy.html"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="//seniorhealthbenefits.co/terms.html">Terms of Use</a>.
              (3) I understand that this is a solicitation for insurance. Plans
              are insured or covered by a Medicare Advantage organization with a
              Medicare contract and/or a Medicare-approved Part D sponsor.
              Enrollment in the plan depends on the plan’s contract renewal with
              Medicare. We do not offer every plan available in your area. Any
              information we provide is limited to those plans we do offer in
              your area. Please contact Medicare.gov or 1–800 MEDICARE to get
              information on all of your options
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}