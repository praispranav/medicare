import React from 'react';

import './Navbar.scss';

import logo from '../../assets/logo.png';
import phoneicon from '../../assets/phone.svg';

export const Navbar = () => {
    return <div className="navbar">
        <nav>
            <div className='logoholder'>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                    <div className='sitename'>
                        <h1>QualifyQuotes.us</h1>
                        <h2>a non-government medicare site</h2>
                    </div>
                </div>
            </div>
            <a href="tel:18008148552">
                <div className="phone-icon">
                    <img src={phoneicon} alt="logo" />
                </div>
                <div class="flex flex-col items-center phone-number-holder">
                    <div class="text-phone-number">CALL TOLL-FREE M-F 7AM-10PM CST</div>
                    <div class="toll-free-number-holder">
                        <div class="available-blinker"></div>
                        <div class="toll-free-number">
                            <span class="font-bold tracking-tighter">1-800-814-8559</span>
                            <span class="font-semibold">(TTY 711)</span>
                        </div>
                    </div>
                </div>
            </a>
        </nav>
    </div>
}