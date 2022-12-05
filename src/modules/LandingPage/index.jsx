import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { TRACK_SCRIPT } from "../../constants/track";
import "./index.scss";
import LandingPage from "./LandingPage";

export default function LandingPageWrapper() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [script, setScript] = useState();

  const findScript = (pathName) => {
    const result = TRACK_SCRIPT.find((i) => i.pageUrl == pathName);
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
