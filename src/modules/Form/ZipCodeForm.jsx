import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import errorimg from "../../assets/form/error.svg";
import { useEffect } from "react";
import { sessionStorageKeys } from "../../constants/localStorage";
import next from "../../assets/form/next.svg";
import "./Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

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

  const { handleSubmit,touched, errors, setValues, values, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, event) => {
        sessionStorage.setItem(sessionStorageKeys.zip, String(values.zip));
        alert(JSON.stringify(values, null, 2));
      },
    });

  const onChangeZipValue = (e) => {
    const value = e.target.value;
    const obj = {
      target: {
        name: "zip",
        value: String(value).slice(0, 5),
      },
    };
    console.log("ValueChange", value);
    console.log("ValueChange2", Number(String(value).slice(0, 5)));
    handleChange(obj);
  };

  const checkPreviousPageData = () =>{
    const data = sessionStorage.getItem(sessionStorageKeys.ageAbove64);
    if(data === null) navigate(ROUTES.homePage)
  }

  useEffect(() => {
    checkPreviousPageData();
    const zipInitialValue = sessionStorage.getItem(sessionStorageKeys.zip);
    if (zipInitialValue) setValues({ zip: Number(zipInitialValue) });
  }, []);

  return (
    <div className="form row-gap-30 flex-d-col">
      <div className="row-gap-20 flex-d-col">
        <div className="font-40 bold color-primary main-headline">
          Medicare Open Enrollment Update
        </div>
      </div>

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
                //   onKeyPress={onChangeZipValue}
                value={values.zip}
                required
                onChange={onChangeZipValue}
                onBlur={handleBlur}
                maxLength={5}
                max={99999}
                type="number"
                //   onChange={checkZip}
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
              {/* {ziperror ? (
                  <div className="form-error font-12">
                    <img src={errorimg} alt="" /> &nbsp;&nbsp; Enter a valid US
                    Zipcode
                  </div>
                ) : (
                  ""
                )} */}
              <button className="form-button form-option-continue color-white font-20 bold">
                Continue <img src={next} alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
