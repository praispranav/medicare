import "./Form.scss";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import * as yup from "yup";
import errorimg from "../../assets/form/error.svg";
import next from "../../assets/form/next.svg";
import { sessionStorageKeys } from "../../constants/localStorage";
import { ROUTES } from "../../constants/routes";
import { useRgbaHook } from '../../hooks/rgba'

const initialValues = {
  zip: "",
};

const validationSchema = yup.object({
  zip: yup
    .string()
    .required("Zip Code is Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Zip code should be of 5 digit.")
    .max(5, "Zip code should be of 5 digit."),
});

export default function ZipCodeForm({ setForm, setFormEnd }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { storeRgbaData } = useRgbaHook();
  const [response, setResponse] = useState({});
  const fbc = Cookies.get("_fbc") || "";
  const fbp = Cookies.get("_fbp") || "";
  
  const {
    handleSubmit,
    touched,
    setErrors,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, event) => {
      if (!loading) {
        const JornayaToken = document.getElementById("leadid_token").value;
        sessionStorage.setItem(sessionStorageKeys.zip, String(values.zip));
        incZipFormState(values.zip);
        storeRgbaData("zip", values.zip);
        storeRgbaData("city", response.city);
        storeRgbaData("state", response.state);
        storeRgbaData("lead_id", JornayaToken);
        storeRgbaData("user_agent", window.navigator.userAgent);
      }
    },
  });

  const incZipFormState = (zip) => {
    setLoading(true);
    const JornayaToken = document.getElementById("leadid_token").value;
    axios
      .get("https://api.zippopotam.us/us/" + zip, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      })
      .then((response) => {
        setResponse({
          city: response.data["places"][0]["place name"],
          state: response.data["places"][0]["state abbreviation"],
        });
        sessionStorage.setItem(
          sessionStorageKeys.zipCodeExtraValues,
          JSON.stringify({
            user_agent: navigator.userAgent,
            fbc: fbc,
            fbp: fbp,
            city: response.data["places"][0]["place name"],
            state: response.data["places"][0]["state abbreviation"],
            JornayaToken: JornayaToken,
          })
        );
        navigate("../" + ROUTES.nameForm);
        setLoading(false);
      })
      .catch((error) => {
        setErrors({ zip: "Zip Code not valid" });
        setLoading(false);
      });
  };

  const onChangeZipValue = (e) => {
    const value = e.target.value;
    const obj = {
      target: {
        name: "zip",
        value: String(value).slice(0, 5),
      },
    };
    handleChange(obj);
  };

  const checkPreviousPageData = () => {
    const data = sessionStorage.getItem(sessionStorageKeys.ageAbove64);
    if (data === null) navigate(ROUTES.homePage);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    checkPreviousPageData();
    const zipInitialValue = sessionStorage.getItem(sessionStorageKeys.zip);
    if (zipInitialValue) setValues({ zip: Number(zipInitialValue) });
  }, []);

  return (
    <div className="form row-gap-30 flex-d-col">
      <div className="form-card-holder flex-a-cen-j-cen row-gap-30 flex-d-col">
        <div className="form-completion">
          <div className="semi-bold font-16 color-accent-blue">
            50% Completed
          </div>
          <div className="form-completion-bar fifty-percent">
            <div className="loadingbar"></div>
          </div>
        </div>
        <div className="form-ques-card row-gap-30">
          <div className="font-24 color-primary">What's your Zip Code?</div>
          <div className="form-options row-gap-30 flex-d-col">
            <form onSubmit={handleSubmit}>
              <input
                value={values.zip}
                required
                onChange={onChangeZipValue}
                onBlur={handleBlur}
                maxLength={5}
                max={99999}
                type="number"
                name="zip"
                id="zip"
                placeholder="Zip Code"
              />
              {errors.zip && touched.zip ? (
                <div className="form-error font-12 form-error-2">
                  <img src={errorimg} alt="" /> &nbsp;&nbsp; {errors.zip}
                </div>
              ) : (
                ""
              )}
              <button
                disabled={errors.zip}
                className="form-button form-option-continue color-white font-20 bold"
              >
                {loading ? (
                  <>
                    <PropagateLoader
                      color="#2DA9C2"
                      className="margin-loader"
                    />{" "}
                    <p className="visibility-hidden">.</p>{" "}
                  </>
                ) : (
                  <>
                    Continue <img src={next} alt="" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
