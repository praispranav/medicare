import React from 'react';

import './Navbar.css';

import logo from '../../assets/logo.png';
import phoneicon from '../../assets/phone.svg';

export const Navbar = () => {
    return <div className="navbar">
        <nav>
            <div className='logoholder'>
                <img src={logo} alt="logo" />
            </div>
            <a href="tel:18008148559">
                <div className="phone-icon">
                    <img src={phoneicon} alt="logo" />
                </div>
                <div class="flex flex-col items-center phone-number-holder">
                    <div class="text-phone-number-holder">CALL TOLL-FREE M-F 7AM-10PM CST</div>
                    <div class="primary-text-dark flex items-center">
                        <div class="bg-green-400 rounded-full w-2 h-2 mr-2.5 lg:hidden"></div>
                        <div class="absolute bg-green-400 animate-ping rounded-full w-2 h-2 mr-2.5 lg:hidden"></div>
                        <div class="flex space-x-1 items-center text-xl whitespace-nowrap">
                            <span class="font-bold tracking-tighter">1-800-814-8559</span>
                            <span class="font-semibold">(TTY 711)</span>
                        </div>
                    </div>
                </div>
            </a>
        </nav>
    </div>
}