import './Header.css';
import imgLogoForest from '../../../assets/images/logos/img_logo.svg';
import React from 'react';

export default function Header() {
    return (
        <div className="logo-forest-container">
            <img src={imgLogoForest} alt="logo" className="logo-forest" />
        </div>
    )
}