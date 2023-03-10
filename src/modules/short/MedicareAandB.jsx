import axios from "axios";
import React, { useEffect } from "react";
import "../../assets/styles/Form.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  localStorageKeys,
  sessionStorageKeys,
} from "../../constants/localStorage.js";
import { ROUTES } from "../../constants/routes";
import { REDIRECT_AND_STORAGE_KEYS } from "../../constants/queryStrings";
import { useRgbaHook, CLICK_ID } from "../../hooks/rgba";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import { useDataLayer } from "../../hooks/useDataLayer";
import useSmartLook from "../../hooks/useSmartLook";
import Cookies from "js-cookie";

const NO = "No";
const YES = "Yes";

const AgeForm = ({ setForm, setFormEnd }) => {
  const generatorQuery = useGeneratorQuery();
  const { storeRgbaData } = useRgbaHook();
  const dataLayer = useDataLayer();
  const [search] = useSearchParams();

  const pushInitialData = (userIp) => {
    const redirectQueries = {
      userIp,
    };

    REDIRECT_AND_STORAGE_KEYS.forEach((obj) => {
      redirectQueries[obj.storageKey] = search.get(obj.redirectString) || "";
      storeRgbaData(obj.ringbaKey, search.get(obj.redirectString));
    });
    storeRgbaData("userIp", userIp);

    sessionStorage.setItem(
      sessionStorageKeys.utm_fbclid,
      JSON.stringify(redirectQueries)
    );

    for (const entry of search.entries()) {
      generatorQuery.set(entry[0], entry[1]);
    }

    const currentDataLayerData = dataLayer.get();
    if (currentDataLayerData)
      dataLayer.getAndSetFromSession(currentDataLayerData);
    else {
      dataLayer.set("interest", search.get("interest"));
      dataLayer.set("language", search.get("language"));
      dataLayer.set("device_model", window.navigator.userAgent);
      dataLayer.set("country", "us");
      dataLayer.set(
        "visitor_id",
        localStorage.getItem(localStorageKeys.visitorId)
      );
    }
    storeRgbaData(
      "visitor_id",
      localStorage.getItem(localStorageKeys.visitorId)
    );
  };

  const getIpAdd = async () => {
    let userIp;
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

      userIp = response.data["IPv4"];
    } catch (error) {}
    pushInitialData(userIp);
  };
  
  useSmartLook();

  const setInitialData = () => {
    storeRgbaData("generator_var", search.get("generator"));
    storeRgbaData("type_var", search.get("type"));
    storeRgbaData("device_var", search.get("device"));
    storeRgbaData("fbclid_var", search.get("fbclid"));
    storeRgbaData("gclid_var", search.get("gclid"));
    storeRgbaData("interest_var", search.get("interest"));
    storeRgbaData("utm_medium_var", search.get("utm_medium"));
    storeRgbaData("language_var", search.get("language"));
    storeRgbaData("utm_source_var", search.get("utm_source"));

    for (const entry of search.entries()) {
      generatorQuery.set(entry[0], entry[1]);
    }

    const currentDataLayerData = dataLayer.get();
    if (currentDataLayerData)
      dataLayer.getAndSetFromSession(currentDataLayerData);
    else {
      dataLayer.set("interest", search.get("interest"));
      dataLayer.set("language", search.get("language"));
      dataLayer.set("device_model", window.navigator.userAgent);
      dataLayer.set("country", "us");
      dataLayer.set(
        "visitor_id",
        localStorage.getItem(localStorageKeys.visitorId)
      );
    }
  };

  useEffect(() => {
    if(Cookies.get(CLICK_ID) ? Cookies.get(CLICK_ID) : window.clickId){
      storeRgbaData("click_id", Cookies.get(CLICK_ID) ? Cookies.get(CLICK_ID) : window.clickId );
    }
  }, [Cookies.get(CLICK_ID), window.clickId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getIpAdd();
    setInitialData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  const nextPage = (value) => {
    sessionStorage.setItem(sessionStorageKeys.medicareAandB, value);
    storeRgbaData("medicareAandB", value);
    navigate({
      pathname: ROUTES.short.children.zipCodeForm,
      search: generatorQuery.get(),
    });
  };

  const blankEnter = (e) => {};

  return (
    <div className="formHolder">
      <form
        action="POST"
        onSubmit={blankEnter}
        className="form row-gap-30 flex-d-col"
      >
        <div className="form-card-holder flex-a-cen-j-cen row-gap-30 flex-d-col">
          <div className="form-completion">
            <div className="semi-bold font-16 color-accent-blue">
              60% Completed
            </div>
            <div className="form-completion-bar sixty-percent">
              <div className="loadingbar"></div>
            </div>
          </div>

          <div className="form-ques-card row-gap-30">
            <div className="font-24 color-primary">
              Do you have medicare part A & B?
            </div>
            <div className="form-options row-gap-20 flex-d-col flex-a-cen">
              <div
                onClick={() => {
                  nextPage(YES);
                }}
                className="form-age-option font-24 color-primary"
              >
                Yes
              </div>
              <div
                onClick={() => {
                  nextPage(NO);
                }}
                className="form-age-option font-24 color-primary"
              >
                No
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgeForm;
