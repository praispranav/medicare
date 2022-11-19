import React from 'react';

import './Footer.css';

import logo from '../../assets/logo.svg';

export const Footer = () => {
    return <div className="footer">
        <img src={logo} alt="logo" />

        <div className="footer-horizontal-divider"></div>

        <div className="font-13 color-dark-grey">
        Disclaimer: senioradvantage.co is a referral source that provides information and access to a helpline to match consumers with companies that may provide certain insurance coverage to them. senioradvantage.co does not act as an insurance broker and does not make decisions about insurance coverage that may be available to you. senioradvantage.co doesn’t promise a specific outcome or the results you may achieve by calling the helpline. The helpline is free to call but the services or programs that you pursue may have costs associated with them. Neither senioradvantage.co nor any of the supplemental insurance plans to which you may be connected are endorsed by the U.S. Government or the federal Medicare program.
        </div>

        <div className="footer-links color-dark-grey">
            <div className="font-13">Copyright © 2022 | Senior Health Benefits</div>

            <div className="footer-vertical-divider"></div>

            <div className="font-13"><a target="blank" href="https://seniorhealthbenefits.co/privacy-policy.html">PRIVACY POLICY</a></div>

            <div className="footer-vertical-divider"></div>

            <div className="font-13"><a target="blank" href="https://seniorhealthbenefits.co/terms.html">TERMS OF USE</a></div>
        </div>

    </div>
}