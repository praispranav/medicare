import React from "react";

import './RatingCard.css';

import star5 from '../../../../assets/ratings/5star.svg';

export const RatingCard = ({head, body, name}) => {
    return <div className="rating-card flex-a-cen-j-cen flex-d-col">
        <img src={star5} alt="5 star" />

        <div className="font-24 bold color-primary">{head}</div>

        <div className="font-16 color-dark-grey">{body}</div>

        <div className="font-16 color-dark-grey">{name}</div>
    </div>
}