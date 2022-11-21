import React, { useEffect, useState } from "react";
import $ from 'jquery';
import Cookies from "js-cookie";

import './FormEnd.scss';

import call from '../../assets/form/call.svg';
import user from '../../assets/form/user.svg';
import location from '../../assets/form/location.svg';
import list from '../../assets/form/list.svg';
import checkpoint from '../../assets/form/checkpoint.svg';
import agent from '../../assets/form/agent.svg';
import check from '../../assets/form/check.svg';
import reload from '../../assets/form/reload.svg';
import { FormStart } from "../FormStart/FormStart";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { LEAD } from "../../constants/lead";
import { sessionStorageKeys } from "../../constants/localStorage"

let load = 0;
const Congrats = ({fname, lname}) => {
    const [zipCodeData, setZipCodeData] = useState({ state:"", city:"" })

    useEffect(()=>{
        const zipCodeExtraValues = sessionStorage.getItem(sessionStorageKeys.zipCodeExtraValues);
        if(zipCodeExtraValues){
            const parsed = JSON.parse(zipCodeExtraValues)
            setZipCodeData(parsed);
        }
    },[])
    
    return <div className='flex-d-col form-end-congrats'>
        <div className="font-32 color-accent-blue congrats-headline">
            Congratulations {fname} {lname}, We’ve Found Plans in your Area!
        </div>
        <div className='congrats-card font-16'>
            <div className="flex-a-cen keymain">
                <div  className='flex-a-cen'>
                    <img src={user} alt="" /> &nbsp; {fname} {lname}
                </div>

                <img src={check} alt="" />
            </div>

            <div className="flex-a-cen keymain">
                <div className='flex-a-cen'>
                    <img src={location} alt="" /> &nbsp;&nbsp; {zipCodeData['city']},{zipCodeData['state']}
                </div>

                <img src={check} alt="" />
            </div>

            <div className="flex-a-cen keymain">
                <div  className='flex-a-cen'>
                    <img src={list} alt="" /> &nbsp;&nbsp; <p>Aetna | Blue Cross | Humana | United | Other</p>
                </div>

                <img src={check} alt="" />
            </div>

            <div className="flex-a-cen keymain">
                <div className='flex-a-cen'>
                    <img src={checkpoint} alt="" /> &nbsp;&nbsp; <p>New Medicare 2022 Plans</p>
                </div>

                <img src={check} alt="" />
            </div>

            <div className="flex-a-cen keymain">
                <div className='flex-a-cen'>
                    <img src={agent} alt="" /> &nbsp;&nbsp; <p>Connecting you with a licensed agent...</p>
                </div>

                <img className='reload' src={reload} alt="" />
            </div>
        </div>
    </div>
}

const End = ({number, fname, lname, sec, min}) => {
    return <div className="form-end">
        <div className="congrats-message">
            <div className="font-32 bold color-accent-blue congrats-headline-cta">
                {fname} {lname}, Great News!
            </div>
            <div className="font-16 row-gap-15 color-primary flex-d-col congrats-text">
                <p>You pre-qualify for up to <span>$5,100 grocery allowance plus $0 cost Vision & Dental coverage</span> with your Medicare plan. Call us now to secure your possible additional benefits & flex card.</p>
            </div>
            <a href={`tel:+${number}`} id="form-end-contact" className="form-end-contact">
                <div className="contact-btn">
                    <img src={call} alt="" />
                    <div id="font-end-contact-number" className="color-white font-24 bold toll-free">
                        <span>{number || "1-866-790-0241"}</span>
                        <div className="tfn-cta">Click To Call Toll-Free</div>
                    </div>
                </div>
            </a>
            <div className="font-16 color-primary congrats-deadline">
                <span className="uppercase bold">Your application expires in</span> <span className="bold">0{min}:{sec > 9? sec : `0${sec}`} minute.</span> 
            </div>
        </div>
    </div>
}

export const FormEnd = ({number, form,fname, lname}) => {
    fname = sessionStorage.getItem(sessionStorageKeys.firstName);
    lname = sessionStorage.getItem(sessionStorageKeys.lastName);

    const [min, setMin] = useState(3);
    const [sec, setSec] = useState(3);
    const [num, setNum] = useState();
    const [history, setHistory] = useSearchParams();
    const [submitted, setSubmitted] = useState();

    const leadNode = window.document.getElementById(LEAD.id);

    const removeLeadScript = () =>{
        if(leadNode){
            leadNode.remove()
        }
    }

    const navigate = useNavigate();

    const checkPreviousPage = () =>{
        const submitted = sessionStorage.getItem(sessionStorageKeys.submitSuccessful);
        setSubmitted(submitted)
    }

    useEffect(()=>{
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'utm_source': form['utm_source'] || "",
            'campaign_id' : form['CID'] || "",
            'adset_id': form['ADS_ID'] || "",
            'ad_id':  form['ADID'] || ""
        });
        removeLeadScript();
        checkPreviousPage();
    },[form])

    useEffect(()=>{
        removeLeadScript();
    },[leadNode])

    useEffect(()=>{
        const finalPreparedData =  sessionStorage.getItem(sessionStorageKeys.finalPreparedData);
            if(!finalPreparedData) return
            const parsed = JSON.parse(finalPreparedData);

        $(document).ready(function ($) {
            (function(e, d) {
            //Ringba.com phone number tracking
            var ringba_com_tag="JSbfbe6e3aef084885af8a574bec4f8d45";
            var _sc = d.getElementsByTagName('script'), _s = _sc[_sc.length - 1];
            e._rgba = e._rgba || { q: [] }; e._rgba.q.push({ tag: ringba_com_tag, cb: GetNumber, render: false, script: _s,displayFmt:'n-nnn-nnn-nnnn' });
            if (!(e._rgba.loading = !!e._rgba.loading)) {
                var sc = d.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
                sc.src = '//js.callcdn.com/js_v3/min/ringba.com.js';
                var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sc, s);
                e._rgba.loading = true;
            }
            })(window, document);
            function GetNumber(number, tagId, firstTime) {
                window.pnumber = number;
                setNum(number);
                $("#form-end-contact").attr("href", "tel://" + window.pnumber);
                $("#font-end-contact-number").text(window.pnumber);
            }
            
            (window._rgba_tags = (window._rgba_tags || [])).push(
                {userIp:parsed['userIp'] || ""},
                {user_agent:parsed['user_agent'] || ""},
                {zip: parsed['zip'] || ""},
                {city: parsed['city'] || ""},
                {state: parsed['state'] || ""},
                {firstName: parsed['firstName'] || ""},
                {lastName: parsed['lastName'] || ""},
                {email: parsed['email'] || ""},
                {lead_id: parsed["JornayaToken"] || ""},
                {utm_source: parsed['utm_source'] || ""},
                {ads_id: parsed['Adset_Name'] || ""},
                {cid: parsed['Campaign_Name'] || ""},
                {adid: parsed['Ad_Name'] || ""},
                {fbclid: parsed['fbclid'] || ""},
                {fbc: parsed['fbc'] || ""},
                {fbp: parsed['fbp'] || ""},
                );
            $('.callnow').click(function() {window.fbqFunc('track', 'Contact');});
        });
        setHistory({
            utm_source: parsed['utm_source'] || "", 
            CID : parsed['Campaign_Name'] || "",
            ADS_ID : parsed['Adset_Name'] || "",
            ADID : parsed['Ad_Name'] || "",
            fbclid : parsed['fbclid'] || "",
            fbc : parsed['fbc'] || "",
            fbp : parsed['fbp'] || ""
        });
        // history.replace({ pathname: location.pathname, search: params.toString() });
    },[]);

    while(true) {
        setTimeout(function () {    
            if(min === 0 && sec === 0){
                return;
            }
            else if(sec === 0){
                load += 1;
                setMin(min - 1);
                setSec(59);
            }
            else{
                setSec(sec - 1);
            }
        }, 1000)
    

        return(
            <div>
                {
                    submitted === null ? <Navigate to="/" replace={true} /> : <></>
                }
                {
                    load? <End number={num} fname={fname} lname={lname} sec={sec} min={min} /> : <Congrats fname={fname} lname={lname} />
                }
                <FormStart />
            </div>
        )
    }
}

