import React from 'react'
import './InputText.css'

const InputText = ({ value, onChange, placeholder, className = '', inputTextClassName = '' }) => {
    return (
        <div className={`input-text-container ${className}`}>
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={`input-text ${inputTextClassName}`} />
        </div>
    )
}
export default InputText