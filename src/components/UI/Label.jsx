/* Label.jsx */
/* Base label component */
/*
*/

import React from 'react';
import './Label.css';

const Label = ({ children, htmlFor }) => {
    return (
        <label className="label" htmlFor={htmlFor}>{children}</label>
    );
};

export default Label;