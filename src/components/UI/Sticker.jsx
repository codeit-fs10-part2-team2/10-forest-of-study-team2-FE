import React from 'react';
import './Sticker.css';

const Sticker = ({ 
    children, 
    borderColor = '--primary-color',
    textColor = 'white', 
    backgroundColor = '--primary-color',
}) => {
    const titleBorderColor = getComputedStyle(document.documentElement).getPropertyValue(borderColor);
    const titleBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue(backgroundColor);  
    return (
        <div className="sticker" style={{ 
            color: titleTextColor, 
            backgroundColor: titleBackgroundColor, 
            borderColor: titleBorderColor, 
            borderWidth: '1px', 
            borderStyle: 'solid', 
            borderRadius: '5px', 
            padding: '10px' 
        }} >{children}</div>
    );
};

export default Sticker;
