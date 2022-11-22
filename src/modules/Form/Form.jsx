import axios from "axios";
import React, { useEffect } from "react";
import "./Form.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  sessionStorageKeys
} from "../../constants/localStorage.js";
import { ROUTES } from "../../constants/routes";

export const Form = ({ setForm, setFormEnd }) => {
  const [search] = useSearchParams();
  
  async function getIpAdd() {
    try {
      var response;
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
      let campaignname = search.get("CID");
      let adsetname = search.get("ADS_ID");
      let adname = search.get("ADID");
      let fbclid = search.get("fbclid");
      let utmsource = search.get("utm_source");

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
      sessionStorage.setItem(
        sessionStorageKeys.utm_fbclid,
        JSON.stringify({
          userIp: error.response.data ? error.response.data["IPv4"] : "",
          Campaign_Name: "",
          Adset_Name: "",
          Ad_Name: "",
          fbclid: "",
          utm_source: "",
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

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    getIpAdd();
  }, []);

  const navigate = useNavigate();

  const incFormState = () => {
    navigate(ROUTES.zipCodeForm);
  };

  const blankEnter = (e) => {};

  return (
    <form
      action="POST"
      onSubmit={blankEnter}
      className="form row-gap-30 flex-d-col"
    >
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
                  sessionStorage.setItem(sessionStorageKeys.ageAbove64, "yes");
                  incFormState();
                }}
                className="form-age-option font-24 color-primary"
              >
                Yes
              </div>
              <div
                onClick={() => {
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
    </form>
  );
};
