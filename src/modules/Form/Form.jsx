import axios from "axios";
import React, { useEffect } from "react";
import "./Form.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sessionStorageKeys } from "../../constants/localStorage.js";
import { ROUTES } from "../../constants/routes";
import { REDIRECT_AND_STORAGE_KEYS } from "../../constants/queryStrings";
import { useRgbaHook } from '../../hooks/rgba'

export const Form = ({ setForm, setFormEnd }) => {
  const [search] = useSearchParams();
  const { storeRgbaData } = useRgbaHook();

  const pushInitialData = (userIp) =>{
    const redirectQueries = {
      userIp,
    };

    REDIRECT_AND_STORAGE_KEYS.forEach(
      (obj) =>{
        redirectQueries[obj.storageKey] = search.get(obj.redirectString) || "";
        storeRgbaData(obj.ringbaKey, search.get(obj.redirectString)) 
      }
    );
    storeRgbaData('userIp', userIp)

    sessionStorage.setItem(
      sessionStorageKeys.utm_fbclid,
      JSON.stringify(redirectQueries)
    );

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(redirectQueries);
  }

  const getIpAdd = async () => {
    let userIp;
    try {
      var response;
      response = await axios.get(
        "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      userIp = response.data["IPv4"];
    } catch (error) {}
    pushInitialData(userIp)
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getIpAdd();
  }, []);

  const navigate = useNavigate();

  const incFormState = () => {
    navigate(ROUTES.zipCodeForm);
  };

  const blankEnter = (e) => {};

  return (
    <div className="">
      <form
        action="POST"
        onSubmit={blankEnter}
        className="form row-gap-30 flex-d-col"
      >
          <div className="form-card-holder flex-a-cen-j-cen row-gap-30 flex-d-col">
            <div className="form-completion">
              <div className="semi-bold font-16 color-accent-blue">
                20% Completed
              </div>
              <div className="form-completion-bar twenty-percent">
                <div className="loadingbar"></div>
              </div>
            </div>

            <div className="form-ques-card row-gap-30">
              <div className="font-24 color-primary">
                Are you over 64 years old?
              </div>
              <div className="form-options row-gap-20 flex-d-col flex-a-cen">
                <div
                  onClick={() => {
                    sessionStorage.setItem(sessionStorageKeys.ageAbove64, "yes");
                    incFormState();
                  }}
                  className="form-age-option font-24 color-primary"
                >
                  Yes
                </div>
                <div
                  onClick={() => {
                    sessionStorage.setItem(sessionStorageKeys.ageAbove64, "no");
                    incFormState();
                  }}
                  className="form-age-option font-24 color-primary"
                >
                  No
                </div>
              </div>
            </div>
          </div>
      </form>
    </div>
  );
};
