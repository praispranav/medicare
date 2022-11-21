import React from 'react';

import './Navbar.css';

import logo from '../../assets/logo.png'

export const Navbar = () => {
    return <div className="navbar">
        <img src={logo} alt="logo" />
    </div>
}