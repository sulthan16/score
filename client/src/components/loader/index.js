import React from 'react';
import './style.css'
import logo from 'assets/logo.png'

function Loader() {
    return (
        <div className="full-page-loader">
            <img width="200" src={logo} alt="AIP.Trade logo" />
        </div>)
}

export default Loader