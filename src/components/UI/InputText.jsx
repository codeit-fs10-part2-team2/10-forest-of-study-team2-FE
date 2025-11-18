/* InputText.jsx */
/* Base input text component */
/*


*/

import React from 'react';
import './InputText.css';

const InputText = ({ type, placeholder, value, onChange }) => {


    
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="input-text" />

    );

};

export default InputText;

