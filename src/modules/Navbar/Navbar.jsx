import React from 'react';

import './Navbar.css';

import logo from '../../assets/logo.svg'

export const Navbar = () => {
    return <div className="navbar">
        <img src={logo} alt="logo" />
    </div>
}