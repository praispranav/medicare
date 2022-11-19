import React, { useEffect } from 'react';

import './FormStart.css';

import { Rating } from './Ratings/Ratings';
import { useNavigate, useSearchParams } from "react-router-dom";

import image1 from '../../assets/ratings/image1.svg';
import image2 from '../../assets/ratings/image2.svg';
import image3 from '../../assets/ratings/image3.svg';
import image4 from '../../assets/ratings/image4.svg';
import image5 from '../../assets/ratings/image5.svg';
import image6 from '../../assets/ratings/image6.svg';
import { FloatingCard } from '../FloatingCard/FloatingCard';


export const PreForm = ({setForm}) => {
    let nav = useNavigate();
    const [search] = useSearchParams();

    useEffect(() =>{
        fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572", {
            method: "GET",
            mode: "no-cors",
        })
        .then(response => {
            try {
                let userip = response.data['IPv4'];
                let campaignname = search.get('CID');
                let adsetname = search.get('ADS_ID');
                let adname = search.get('ADID');
                let fbclid = search.get('fbclid');
                let utmsource = search.get('utm_source');

                setForm({
                    'userIp' : userip,
                    'Campaign_Name' : campaignname,
                    'Adset_Name' : adsetname,
                    'Ad_Name': adname,
                    'fbclid' : fbclid,
                    'utm_source' : utmsource
                });
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'utm_source':utmsource ,
                    'campaign_id' : campaignname ,
                    'adset_id': adsetname ,
                    'ad_id':  adname})
            } catch (error) {
                setForm({
                    'userIp' : response.data['IPv4'],
                    'Campaign_Name' : "",
                    'Adset_Name' : "",
                    'Ad_Name': "",
                    'fbclid' : "",
                    'utm_source' : ""
                });
                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'utm_source': "",
                    'campaign_id' : "",
                    'adset_id': "",
                    'ad_id':  "" 
                })

            }
        })
    },[search, setForm])


    return <div>
    
        <div className="pre-form">

            <div className="bold font-40 color-primary">New Medicare Benefits Update</div>

            <div className="font-24 color-primary">
            Americans Ages 65+ In Have 10 days to claim additional benefits & get up to $240 monthly in OTC benefits.
            </div>

            <div className="font-16 color-dark-grey">
            Thanks to a new Medicare Advantage package, Americans age 65+ could get $148.50* monthly added to their social security check with No-Cost Vision & Dental Benefits.
            </div>

            <div onClick={()=>{nav('form')}} className="qualify-button">
                See If You Qualify
            </div>

            <FloatingCard />

        </div>

        <FormStart />

    </div>
}

export const FormStart = () => {

    return <div className="form-start">
        

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
}