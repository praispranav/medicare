import React, { useEffect } from "react";

import "./Navbar.scss";

import logo from "../../assets/logo.png";
import phoneicon from "../../assets/phone.svg";
import { useInitRingba } from "../../hooks/rgba";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const Navbar = () => {
  const location = useLocation();
  const { number, staticNumber } = useInitRingba();
  return (
    <div className="navbar">
      <nav>
        <div className="logoholder">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div className="sitename">
              <h1>QualifyQuotes.us</h1>
              <h2>a non-government medicare site</h2>
            </div>
          </div>
        </div>
        {location.pathname !== ROUTES.congrats ? (
          <a href={`tel:${number || staticNumber}`} id="form-end-contact">
            <div className="phone-icon">
              <img src={phoneicon} alt="logo" />
            </div>
            <div className="phone-number-holder">
              <div className="text-phone-number">
                CALL TOLL-FREE M-F 7AM-10PM CST
              </div>
              <div className="toll-free-number-holder">
                <div className="available-blinker"></div>
                <div className="toll-free-number">
                  <span id="font-end-contact-number" className="font-bold">
                    {number || staticNumber}{" "}
                  </span>
                  <span className="font-semibold">(TTY 711)</span>
                </div>
              </div>
            </div>
          </a>
        ) : undefined}
      </nav>
    </div>
  );
};
