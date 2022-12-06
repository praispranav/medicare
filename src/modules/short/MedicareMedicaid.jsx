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
import { useRgbaHook } from "../../hooks/rgba";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import { useDataLayer } from "../../hooks/useDataLayer";

const NO = "No";
const YES = "Yes";

const MedicareMedicaidForm = ({ setForm, setFormEnd }) => {
  const [search] = useSearchParams();
  const generatorQuery = useGeneratorQuery();
  const { storeRgbaData } = useRgbaHook();
  const dataLayer = useDataLayer();
  // const fbc = Cookies.get("_fbc") || "";
  // const fbp = Cookies.get("_fbp") || "";

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
    } catch (error) {
      console.log(error)
    }
    pushInitialData(userIp);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getIpAdd();
  }, []);

  const setInitialData = () => {
    const JornayaToken = document.getElementById("leadid_token").value;
    storeRgbaData("lead_id", JornayaToken);
    storeRgbaData("user_agent", window.navigator.userAgent);
  };

  useEffect(() => {
    setInitialData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  const nextPage = (value) => {
    sessionStorage.setItem(sessionStorageKeys.medicareMedicaid, value);
    storeRgbaData("medicareMedicaid", value);
    navigate({
      pathname: ROUTES.short.children.medicareAandB,
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
              20% Completed
            </div>
            <div className="form-completion-bar twenty-percent">
              <div className="loadingbar"></div>
            </div>
          </div>

          <div className="form-ques-card row-gap-30">
            <div className="font-24 color-primary">
              Do you have medicare or medicaid?
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

export default MedicareMedicaidForm;
