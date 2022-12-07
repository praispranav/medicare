import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import call from "../../assets/form/call.svg";
import "../../assets/styles/Congrats.scss";
import "../../assets/styles/Form.scss";
import { FloatingCard } from "../../components/FloatingCard/FloatingCard";
import { LEAD } from "../../constants/lead";
import { sessionStorageKeys } from "../../constants/localStorage";
import { useRingbaUser } from "../../constants/ringba";
import { useInitRingba } from "../../hooks/rgba";
import { FormStart } from "../FormStart/FormStart";
import { useRgbaHook, CLICK_ID } from "../../hooks/rgba"
import Cookies from "js-cookie"

let load = 0;
const PAGE_TITLE = "Congratulations - Qualify Benefits";

const End = ({ number, fname, lname, sec, min, staticNumber }) => {
  return (
    <div className="form-end">
      <div className="congrats-message">
        <div className="font-32 bold color-accent-blue congrats-headline-cta">
          Great News!
        </div>
        <div className="font-16 row-gap-15 color-primary flex-d-col congrats-text">
          <p>
            You pre-qualify for up to{" "}
            <span>
              $5,100 grocery allowance plus $0 cost Vision & Dental coverage
            </span>{" "}
            with your Medicare plan. Call us now to secure your possible
            additional benefits & flex card.
          </p>
        </div>
        <a
          href={`tel:+1${number}`}
          id="form-end-contact"
          className="form-end-contact"
        >
          <div className="contact-btn">
            <img src={call} alt="" />
            <div
              id="font-end-contact-number"
              className="color-white font-24 bold toll-free"
            >
              <span>{window.pnumber || staticNumber}</span>
              <div className="tfn-cta">Click To Call Toll-Free</div>
            </div>
          </div>
        </a>
        <div className="font-16 color-primary congrats-deadline">
          <span className="uppercase bold">Your application expires in</span>{" "}
          <span className="bold">
            0{min}:{sec > 9 ? sec : `0${sec}`} minute.
          </span>
        </div>
      </div>
    </div>
  );
};

const CongratsPage = ({ form, fname, lname }) => {
  fname = sessionStorage.getItem(sessionStorageKeys.firstName);
  lname = sessionStorage.getItem(sessionStorageKeys.lastName);

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(3);
  const [history] = useSearchParams();
  const { storeRgbaData } = useRgbaHook();

  const { number: num } = useInitRingba();
  const ringbaKey = useRingbaUser(history);

  useEffect(() => {
    if(Cookies.get(CLICK_ID) ? Cookies.get(CLICK_ID) : window.clickId){
      storeRgbaData("click_id", Cookies.get(CLICK_ID) ? Cookies.get(CLICK_ID) : window.clickId );
    }
  }, [Cookies.get(CLICK_ID), window.clickId]);

  const leadNode = window.document.getElementById(LEAD.id);

  const removeLeadScript = () => {
    if (leadNode) leadNode.remove();
    const leadWrapper = window.document.getElementById(LEAD.wrapperId);
    if (leadWrapper) leadWrapper.remove();
  };

  const addDataLayerAndQuery = () => {};

  useEffect(() => {
    window.document.title = PAGE_TITLE;
    addDataLayerAndQuery();

    removeLeadScript();
  }, [form]);

  useEffect(() => {
    removeLeadScript();
  }, [leadNode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {}, []);

  while (true) {
    setTimeout(function () {
      if (min === 0 && sec === 0) {
        return;
      } else if (sec === 0) {
        load += 1;
        setMin(min - 1);
        setSec(59);
      } else {
        setSec(sec - 1);
      }
    }, 1000);

    return (
      <div>
        <End
          number={num}
          staticNumber={ringbaKey.number}
          fname={fname}
          lname={lname}
          sec={sec}
          min={min}
        />
        <FloatingCard />
        <FormStart />
      </div>
    );
  }
};

export default CongratsPage;
