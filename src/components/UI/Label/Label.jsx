import React from 'react'
import './Label.css'

const Label = ({ children, htmlFor, labelClassName, labelId, labelText }) => {
    return (
        <label htmlFor={htmlFor} className={`label ${labelClassName}`} id={labelId}>
            {labelText && <span className="label-text">{labelText}</span>}
            {children && <span className="label-children">{children}</span>}
        </label>
        );
    };
export default Label;