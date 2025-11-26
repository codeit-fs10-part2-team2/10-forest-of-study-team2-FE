import styles from './Header.module.css';
import imgLogoForest from '../../../assets/images/logos/img_logo.svg';
import React from 'react';

export default function Header() {
    return (
        <div className={styles.logoForestContainer}>
            <img src={imgLogoForest} alt="logo" className={styles.logoForest} />
        </div>
    )
}