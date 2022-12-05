import React from "react";

const SORRY_NO_OFFER =
  "Sorry, you need medicare part A & B to qualify for this!";

export default function NoOffer() {
  return (
    <div className="centered-container">
      <h3>{SORRY_NO_OFFER}</h3>
    </div>
  );
}
