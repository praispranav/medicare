import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import "./AppStart.scss";
import { ROUTES } from "../../constants/routes";
import { Form } from "../Form/Form";
import PropagateLoader from "react-spinners/PropagateLoader";
import LandingPage from "../LandingPage";
import Landing1 from "../LandingPage/components/landing1";
import Landing2 from "../LandingPage/components/landing2";
import { useGeneratorQuery } from "../../hooks/useGeneratorQuery";
import { useDataLayer } from "../../hooks/useDataLayer";
import { localStorageKeys } from "../../constants/localStorage";

const FormEnd = React.lazy(() => import("../FormEnd/FormEnd"));
const ZipCodeForm = React.lazy(() => import("../Form/ZipCodeForm"));
const NameForm = React.lazy(() => import("../Form/NameForm"));
const PhoneEmailForm = React.lazy(() => import("../Form/PhoneEmailForm"));

const Loading = () => {
  return (
    <div className="loading-container">
      <PropagateLoader color="#2DA9C2" />
    </div>
  );
};

const DefaultNavigation = () =>{
  const generatorQuery = useGeneratorQuery();
  const [loading, setLoading] = useState(true);
  const dataLayer = useDataLayer();
  const [search] = useSearchParams();

  const init = () =>{
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
      setLoading(false)
    }
  }

  useEffect(()=>{
    init();
  },[])

  if(loading) return null
  return(
    <Navigate to={ROUTES.landing1 + '?' + generatorQuery.get() } />
  )
}

export const AppStart = () => {
  const [formEnd, setFormEnd] = useState({});
  const [form, setForm] = useState({});
  return (
    <div className="app-start">
        <Navbar />
        <Routes>
          <Route
            path={ROUTES.landing1}
            element={<LandingPage Content={<Landing1 />} />}
          />

          <Route
            path={ROUTES.landing2}
            element={<LandingPage Content={<Landing2 />} />}
          />

          <Route
            path={ROUTES.homePage}
            element={<Form setForm={setForm} setFormEnd={setFormEnd} />}
          />
          <Route
            path={ROUTES.zipCodeForm}
            element={
              <React.Suspense fallback={<Loading />}>
                <ZipCodeForm setForm={setForm} setFormEnd={setFormEnd} />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.nameForm}
            element={
              <React.Suspense fallback={<Loading />}>
                <NameForm setForm={setForm} setFormEnd={setFormEnd} />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.phoneEmailForm}
            element={
              <React.Suspense fallback={<Loading />}>
                <PhoneEmailForm setForm={setForm} setFormEnd={setFormEnd} />
              </React.Suspense>
            }
          />
          <Route
            path=":cid"
            element={<Form setForm={setForm} setFormEnd={setFormEnd} />}
          />
          <Route
            path="form"
            element={<Form setForm={setForm} setFormEnd={setFormEnd} />}
          />
          <Route
            path={ROUTES.congrats}
            element={
              <React.Suspense fallback={<Loading />}>
                <FormEnd
                  form={form}
                  fname={formEnd["fname"]}
                  lname={formEnd["lname"]}
                />
              </React.Suspense>
            }
          />
          <Route path="" element={<DefaultNavigation />} />
        </Routes>
        <Footer />
    </div>
  );
};
