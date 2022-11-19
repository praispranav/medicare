import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Ratings.scss';

import star5 from '../../../assets/ratings/5star.svg';
import trustpilot from '../../../assets/ratings/trustpilot.svg';
import { RatingCard } from "./RatingCard/RatingCard";
import { Carousel } from "react-configurable-carousel";



export const Rating = () => {
    const rc = [
        {
            head : "Matt Gardner was knowledgeable",
            body : "Matt Gardner was knowledgeable about the medicare marketplace and current insurance companies and 2022 plans. He was very helpful getting us the right policy to fit our needs and at the right price.",
            name : "Leslie Craven"
        },
        {
            head : "They were so helpful and patient",
            body : "Sheryl was so helpful and patient as she helped me navigate medicare plan options and find what is best.",
            name : "Maurice C."
        },
        {
            head : "Great Insurance Agent",
            body : "I talked with a young man named Edis K. to finish my medicare sign-up process. He was amazing to work with on the phone. He walked me through stuff and spelled things out very clearly. He got me set up with just what I wanted: dental, vision and healthcare. Great guy!! Thanks again!",
            name : "Donna L."
        },
        {
            head : "Great Insurance Agent",
            body : "I talked with a young man named Edis K. to finish my medicare sign-up process. He was amazing to work with on the phone. He walked me through stuff and spelled things out very clearly. He got me set up with just what I wanted: dental, vision and healthcare. Great guy!! Thanks again!",
            name : "Donna L."
        },
        {
            head : "Great Insurance Agent",
            body : "I talked with a young man named Edis K. to finish my medicare sign-up process. He was amazing to work with on the phone. He walked me through stuff and spelled things out very clearly. He got me set up with just what I wanted: dental, vision and healthcare. Great guy!! Thanks again!",
            name : "Donna L."
        },
    ]

    const slicksettings = {
        arrows: false,
        dotsNavigation: false,
        carouselStyle: '3d',
        width: '100%',
        height: '100%',
        autoScrollInterval: 3000,
        centerMode: true, 
        centerPadding: 0,
        responsive: [{
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
        }]
    }


    return <div className="rating flex-a-cen-j-cen flex-d-col">

        <div className="rating-head flex-a-cen-j-cen flex-d-col">
            <div className="font-32 color-primary bold">What Our Customers Are Saying?</div>

            <div className="font-16 color-dark-grey">Here's what some of our thousands of customers over the years have to say!</div>
        </div>
        
        <div className="flex-a-cen-j-cen review-head">
            <div className="font-24 bold color-dark-grey first">Excellent</div>
            <img className="second" src={star5} alt="5 stars" />
            <div className="font-16 color-dark-grey third">Based on 786 reviews</div>
            <img className="fourth" src={trustpilot} alt="Trust Pilot" />
        </div>

        <div className="rating-card-holder">
            <Carousel {...slicksettings}>
                {(rc).map((k,i) => {
                    return <div key={i}>
                        <RatingCard head={k["head"]} body={k["body"]} name={k["name"]} />
                    </div>
                })}
            </Carousel>
        </div>

    </div>
}
