import React, { useEffect } from "react";

import "./FormStart.css";

import { Rating } from "./Ratings/Ratings";
import { useNavigate, useSearchParams } from "react-router-dom";

import image1 from "../../assets/ratings/image1.svg";
import image2 from "../../assets/ratings/image2.svg";
import image3 from "../../assets/ratings/image3.svg";
import image4 from "../../assets/ratings/image4.svg";
import image5 from "../../assets/ratings/image5.svg";
import image6 from "../../assets/ratings/image6.svg";
import { FloatingCard } from "../../components/FloatingCard/FloatingCard";

export const PreForm = ({ setForm }) => {
  let nav = useNavigate();
  const [search] = useSearchParams();
  return (
    <div>
      <div className="pre-form">
        <div className="bold font-40 color-primary">
          New Medicare Benefits Update
        </div>

        <div className="font-24 color-primary">
          Americans Ages 65+ In Have 10 days to claim additional benefits & get
          up to $240 monthly in OTC benefits.
        </div>

        <div className="font-16 color-dark-grey">
          Thanks to a new Medicare Advantage package, Americans age 65+ could
          get $148.50* monthly added to their social security check with No-Cost
          Vision & Dental Benefits.
        </div>

        <div
          onClick={() => {
            nav("form");
          }}
          className="qualify-button"
        >
          See If You Qualify
        </div>

        <FloatingCard />
      </div>

      <FormStart />
    </div>
  );
};

export const FormStart = () => {
  return (
    <div className="form-start">
      <div className="image-section carrier-images">
        <img src={image1} alt="rating section" />
        <img src={image2} alt="rating section" />
        <img src={image3} alt="rating section" />
        <img src={image4} alt="rating section" />
        <img src={image5} alt="rating section" />
        <img src={image6} alt="rating section" />
      </div>

      <Rating />
    </div>
  );
};
