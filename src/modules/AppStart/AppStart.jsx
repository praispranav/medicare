import React, { useState } from "react";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./AppStart.scss";
import { ROUTES } from "../../constants/routes";
import { Form } from "../Form/Form";
import PropagateLoader from "react-spinners/PropagateLoader";
import LandingPage from "../LandingPage";
import Landing1 from "../LandingPage/components/landing1";
import Landing2 from "../LandingPage/components/landing2";

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

export const AppStart = () => {
  const [formEnd, setFormEnd] = useState({});
  const [form, setForm] = useState({});
  return (
    <div className="app-start">
      <BrowserRouter>
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
          <Route path="" element={<Navigate to={ROUTES.landing1} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
