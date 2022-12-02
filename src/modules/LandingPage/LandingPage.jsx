import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { localStorageKeys } from "../../constants/localStorage";
import { CLICK_ID, useRgbaHook } from "../../hooks/rgba";
import { useDataLayer } from "../../hooks/useDataLayer";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import useSmartLook from "../../hooks/useSmartLook";
import "./index.scss";

export default function LandingPage({ Content, scriptPath }) {
  const { storeRgbaData, clickId } = useRgbaHook();
  const [search] = useSearchParams();
  const dataLayer = useDataLayer();
  const generatorQuery = useGeneratorQuery();

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
    storeRgbaData("click_id_var", Cookies.get(""));
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

  const addScript = async () => {
    const scriptId = "trackScript";
    const element = window.document.getElementById(scriptId);
    if (element) return;

    const doc = document.createElement("script");
    doc.src = scriptPath;
    doc.id = scriptId;
    doc.async = true;
    window.document.body.appendChild(doc);
  };

  useEffect(()=>{
    addScript();
  },[])

  useEffect(() => {
    if (Cookies.get(CLICK_ID)) {
      storeRgbaData("click_id_var", Cookies.get(CLICK_ID));
      setInitialData();
    }
  }, [Cookies.get(CLICK_ID)]);

  return <>{Content}</>;
}
