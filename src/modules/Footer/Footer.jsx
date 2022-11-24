import React from 'react';

import './Footer.scss';

import logo from '../../assets/logo.png';

export const Footer = () => {
    return <div className="footer">
        <div className='logoholder'>
            <div className='logo'>
                <img src={logo} alt="logo" />
                <div className='sitename'>
                    <h1>QualifyQuotes.us</h1>
                    <h2>a non-government medicare site</h2>
                </div>
            </div>
        </div>

        <div className="footer-horizontal-divider"></div>

        <div className="font-13 color-dark-grey">
        Disclaimer: Qualifybenefits.co is not an insurance or operating company but connects individuals with insurance providers and other affiliates. Plans are insured or covered by a Medicare Advantage organization with a Medicare contract and/or a Medicare-approved Part D sponsor.
        Enrollment in the plan depends on the plan’s contract renewal with Medicare. Possible options include, but are not limited to Major Medical Plans, Short Term Plans, Christian Health Plans, Health Sharing Plans, discount cards and Fixed Indemnity Plans.
        Descriptions are for informational purposes only and subject to change. Qualifybenefits.co is not affiliated with any insurance plan nor does it represent or endorse any plan. We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1–800 MEDICARE to get information on all of your options.
        By using this site, you acknowledge that you have read and agree to the <a target="blank" href="//qualifybenefits.co/terms.html">Terms and Conditions</a>, and <a target="blank" href="//qualifybenefits.co/privacy-policy.html">Privacy Policy</a>. Not affiliated with the U. S. government or federal Medicare program. A licensed agent may contact you regarding this insurance-related information.
        </div>

        <div className="footer-links color-dark-grey">
            <div className="font-13">Copyright © 2022 | Qualify Benefits</div>

            <div className="footer-vertical-divider"></div>

            <div className="font-13"><a target="blank" href="//qualifybenefits.co/privacy-policy.html">PRIVACY POLICY</a></div>

            <div className="footer-vertical-divider"></div>

            <div className="font-13"><a target="blank" href="//qualifybenefits.co/terms.html">TERMS OF USE</a></div>
        </div>

    </div>
}