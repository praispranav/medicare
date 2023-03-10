import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "../assets/styles/Navigator.scss";
import { ROUTES } from "../constants/routes";
import { MODULE_TYPE } from "../constants/moduleType";
import PropagateLoader from "react-spinners/PropagateLoader";
import TypeShortMedicareAandB from "../modules/short/MedicareAandB";
import TypeShortZipCodeForm from "../modules/short/ZipCodeForm";
import TypeShortCongrats from "../modules/short/Congrats";
import TypeShortNoOffer from "../modules/short/NoOffer"

const TypeFullAgeForm = React.lazy(() => import("../modules/full/AgeForm"));
const TypeFullCongrats = React.lazy(() => import("../modules/full/Congrats"));
const TypeFullZipCodeForm = React.lazy(() =>
  import("../modules/full/ZipCodeForm")
);
const TypeFullNameForm = React.lazy(() => import("../modules/full/NameForm"));
const TypeFullPhoneEmailForm = React.lazy(() =>
  import("../modules/full/PhoneEmailForm")
);

const TypeShortMedicareMedicaid = React.lazy(() =>
  import("../modules/short/MedicareMedicaid")
);


const TypeCallCongrats = React.lazy(() => import("../modules/call/Congrats"));

const Loading = () => {
  return (
    <div className="centered-container">
      <PropagateLoader color="#2DA9C2" />
    </div>
  );
};

const ModuleTypeNavigator = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const navigateToModules = () => {
    let queryStr = "?";
    for (const entry of queryParams.entries()) {
      queryStr += `${entry[0]}=${entry[1]}&`;
    }

    const type = queryParams.get("type");
    switch (type) {
      case MODULE_TYPE.full:
        navigate(ROUTES.full.route + queryStr);
        break;
      case MODULE_TYPE.short:
        navigate(ROUTES.short.route + queryStr);
        break;
      case MODULE_TYPE.call:
        navigate(ROUTES.call.route + queryStr);
        break;
      default:
        navigate(ROUTES.full.route + queryStr);
        break;
    }
  };

  useEffect(() => {
    navigateToModules();
  }, []);

  if (!queryParams.get("type")) return null;
  return <Loading />;
};

const Navigator = () => {
  return (
    <div className="app-start">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path={ROUTES.full.route} element={<Outlet />}>
            <Route
              index
              path={ROUTES.full.children.homePage}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeFullAgeForm />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTES.full.children.zipCodeForm}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeFullZipCodeForm />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTES.full.children.nameForm}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeFullNameForm />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTES.full.children.phoneEmailForm}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeFullPhoneEmailForm />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTES.full.children.congrats}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeFullCongrats />
                </React.Suspense>
              }
            />
          </Route>
          <Route path={ROUTES.short.route} element={<Outlet />}>
            <Route
              path={ROUTES.short.children.homePage}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeShortMedicareMedicaid />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTES.short.children.medicareAandB}
              element={<TypeShortMedicareAandB />}
            />
            <Route
              path={ROUTES.short.children.zipCodeForm}
              element={<TypeShortZipCodeForm />}
            />
            <Route
              path={ROUTES.short.children.congrats}
              element={<TypeShortCongrats />}
            />
            <Route
              path={ROUTES.short.children.noOffer}
              element={<TypeShortNoOffer />}
            />
          </Route>
          <Route path={ROUTES.call.route} element={<Outlet />}>
            <Route
              index
              path={ROUTES.call.children.homePage}
              element={
                <React.Suspense fallback={<Loading />}>
                  <TypeCallCongrats />
                </React.Suspense>
              }
            />
          </Route>

          <Route path={"/"} element={<ModuleTypeNavigator />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Navigator;
