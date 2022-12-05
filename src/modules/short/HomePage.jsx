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

const HomePage = ({ setForm, setFormEnd }) => {
  const [search] = useSearchParams();
  const generatorQuery = useGeneratorQuery();
  const { storeRgbaData } = useRgbaHook();
  const dataLayer = useDataLayer();

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getIpAdd();
  }, []);

  const navigate = useNavigate();

  const nextPage = () => {
    navigate({
      pathname: ROUTES.short.children.medicareMedicaid,
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
          <div className="form-ques-card row-gap-30">
            <div className="font-16 color-error">
              ATTENTION: Residents of Maharashtra
            </div>
            <div className="font-20 color-primary bold">
              Americans 64½ or older in Maharashtra have less than 2 weeks to
              get upto $5,100 in OTC benefits
            </div>
            <div className="font-20 color-primary">
              These OTC benefits through the Flex Card can be used to pay for
              groceries, doctor’s visits, prescriptions and more. Consult with
              one of our representatives for free today.
            </div>
            <div className="form-options row-gap-20 flex-d-col flex-a-cen">
              <div
                onClick={nextPage}
                className="bg-accent-green form-give-quote color-white font-20 bold"
              >
                SEE IF YOU QUALIFY
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
