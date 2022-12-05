import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import "./index.scss";

export default function LandingPage({ Content, scriptPath }) {
  const [search] = useSearchParams();
  const generatorQuery = useGeneratorQuery();

  const storeQueries = () =>{
    for (const entry of search.entries()) {
      generatorQuery.set(entry[0], entry[1]);
      console.log("Entry1",entry[1])
    }
  }
  console.log("Entry2",search.get('generator'))

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
    storeQueries();
  },[search.get('generator')])

  useEffect(()=>{
    console.log("Click Id", window.clickId)
  }, [window.clickId])

  return <>{Content}</>;
}
