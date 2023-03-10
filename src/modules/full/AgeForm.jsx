import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  localStorageKeys,
  sessionStorageKeys,
} from "../../constants/localStorage.js";
import { REDIRECT_AND_STORAGE_KEYS } from "../../constants/queryStrings";
import { ROUTES } from "../../constants/routes";
import { useRgbaHook, CLICK_ID } from "../../hooks/rgba";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import "../../assets/styles/Form.scss";
import { LEAD } from "../../constants/lead";
import Cookies from "js-cookie";
import VoluumScripts from "../../constants/voluumScripts.js";

const AgeForm = ({ setForm, setFormEnd }) => {
  const [search] = useSearchParams();
  const generatorQuery = useGeneratorQuery();
  const { storeRgbaData } = useRgbaHook();
  const [clickId, setClickId] = useState();

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
      console.error(error);
    }
    pushInitialData(userIp);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getIpAdd();
  }, []);

  useEffect(() => {
    if (Cookies.get(CLICK_ID) ? Cookies.get(CLICK_ID) : window.clickId) {
      storeRgbaData(
        "click_id",
        Cookies.get(CLICK_ID) ? Cookies.get(CLICK_ID) : window.clickId
      );
    }
  }, [Cookies.get(CLICK_ID), window.clickId]);

  const navigate = useNavigate();

  const incFormState = () => {
    navigate({
      pathname: ROUTES.full.children.zipCodeForm,
      search: generatorQuery.get(),
    });
  };

  const blankEnter = (e) => {};

  const addVoluumScript = async () => {
    const scriptId = "trackScript";
    const element = window.document.getElementById(scriptId);
    const clickIdValue = search.get("click_id");
    if (
      clickIdValue !== "" &&
      clickIdValue !== "{click_id}" &&
      clickIdValue !== "{clickid}" &&
      clickIdValue !== null &&
      clickIdValue !== undefined &&
      clickIdValue.length > 10
    )
      return storeRgbaData("click_id", search.get("click_id"));

    if (element) return;

    const doc = document.createElement("script");
    doc.src = VoluumScripts.FULL_SCRIPT;
    doc.id = scriptId;
    doc.async = false;
    window.document.body.appendChild(doc);
  };

  useEffect(() => {
    addVoluumScript();
  }, []);

  useEffect(() => {
    if (clickId) {
      storeRgbaData("click_id", clickId);
    }
  }, [clickId]);

  return (
    <>
      {!sessionStorage.getItem(sessionStorageKeys.leadScriptInjected) ? (
        <LeadNode />
      ) : undefined}

      {!clickId ? (
        <GetClickId clickId={clickId} setClickId={setClickId} />
      ) : undefined}

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
                Are you over 64 years old?
              </div>
              <div className="form-options row-gap-20 flex-d-col flex-a-cen">
                <div
                  onClick={() => {
                    sessionStorage.setItem(
                      sessionStorageKeys.ageAbove64,
                      "yes"
                    );
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
      </div>
    </>
  );
};

function LeadNode() {
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKeys.leadScriptInjected, "yes");
  }, []);
  return (
    <Helmet>
      <script
        id={LEAD.id}
        type={LEAD.type}
        async={LEAD.async}
        src={LEAD.src}
      ></script>
      <noscript> Fail to load javascript </noscript>
    </Helmet>
  );
}

function GetClickId(props) {
  React.useEffect(() => {
    if (!props.clickId) {
      const interval = setInterval(() => {
        props.setClickId(window.clickId);
      }, 400);
      return () => clearInterval(interval);
    }
  }, []);
  return <></>;
}

export default AgeForm;
