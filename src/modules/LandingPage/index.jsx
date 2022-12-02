import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import HEADER_IMAGE from "../../assets/header-image.jpeg";
import { localStorageKeys } from "../../constants/localStorage";
import { ROUTES } from "../../constants/routes";
import { TRACK_SCRIPT } from "../../constants/track";
import { CLICK_ID, useRgbaHook } from "../../hooks/rgba";
import { useDataLayer } from "../../hooks/useDataLayer";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import useSmartLook from "../../hooks/useSmartLook";
import LandingPage from "./LandingPage";
import "./index.scss";

export default function LandingPageWrapper() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [script, setScript] = useState();

  const findScript = (pathName) => {
    const result = TRACK_SCRIPT.find((i) => i.pageUrl == pathName);
    console.log("FIndScript", result, pathName)
    setScript(result);
    setLoading(false);
  };

  useEffect(() => {
    if (location) findScript(location.pathname);
  }, [location]);

  if (!location.pathname || loading || !script) return <></>;
  return (
    <>
      <LandingPage Content={script.content} scriptPath={script.scriptUrl} />
      <TrackHelmet
        httpEquiv={script.meta.httpEquiv}
        content={script.meta.content}
        noscriptNode={script.noscriptUrl}
      />
    </>
  );
}

function TrackHelmet({ httpEquiv, content, noscriptNode }) {
  return (
    <Helmet>
      <noscript>{`<link href=${noscriptNode} rel="stylesheet"/>`}</noscript>
      <meta httpEquiv={httpEquiv} content={content} />
    </Helmet>
  );
}
