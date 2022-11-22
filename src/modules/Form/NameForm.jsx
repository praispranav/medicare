import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import back from "../../assets/form/back.svg";
import errorimg from "../../assets/form/error.svg";
import next from "../../assets/form/next.svg";
import { sessionStorageKeys } from "../../constants/localStorage";
import { ROUTES } from "../../constants/routes";
import "./Form.css";

const initialValues = {
  firstName: "",
  lastName: "",
};

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
});

export default function NameForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    touched,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, event) => {
      sessionStorage.setItem(
        sessionStorageKeys.firstName,
        String(values.firstName)
      );
      sessionStorage.setItem(
        sessionStorageKeys.lastName,
        String(values.lastName)
      );
        navigate("../" + ROUTES.phoneEmailForm)
    },
  });

  const goBack = () => navigate("../" + ROUTES.zipCodeForm);

  const checkPreviousPageData = () => {
    const data = sessionStorage.getItem(sessionStorageKeys.zip);
    if (data === null) navigate("../" + ROUTES.zipCodeForm);
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    checkPreviousPageData();
    const firstName = sessionStorage.getItem(sessionStorageKeys.firstName);
    const lastName = sessionStorage.getItem(sessionStorageKeys.lastName);
    setValues({ lastName: lastName ? lastName: "", firstName: firstName ? firstName : "" });
  }, []);
  return (
    <form onSubmit={handleSubmit} className="form row-gap-30 flex-d-col">
      {/*<div className="row-gap-20 flex-d-col">
        <div className="font-40 bold color-primary main-headline">
        Medicare Annual Enrollment Benefits
        </div>
      </div>*/}

      <div className="flex-a-cen-j-cen flex-d-col row-gap-30 form-card-holder">
        <div className="form-completion">
          <div className="semi-bold font-16 color-accent-blue">
            90% Completed
          </div>
          <div className="form-completion-bar ninty-percent">
            <div className="loadingbar"></div>
          </div>
        </div>
        <div className="form-ques-card row-gap-30">
          <div className="font-24 color-primary">What’s your Full Name?</div>
          <div className="form-options row-gap-20 flex-d-col">
            <div>
              <input
                value={values.firstName}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </div>
            <div>
              <input
                value={values.lastName}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </div>
            {(errors.lastName && touched.lastName) ||
            (errors.firstName && touched.firstName) ? (
              <div className="form-error font-12 flex-a-cen color-error">
                <img src={errorimg} alt="" /> &nbsp;&nbsp; {errors.firstName || errors.lastName}
              </div>
            ) : (
              ""
            )}
            <button
              //   onClick={incName}
              type="submit"
              className="form-button form-option-continue color-white font-20 bold margin-top-5px"
            >
              Continue <img src={next} alt="" />
            </button>
            <div
              onClick={goBack}
              className="form-option-back color-primary font-20 bold"
            >
              <img src={back} alt="" /> &nbsp; Back
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
