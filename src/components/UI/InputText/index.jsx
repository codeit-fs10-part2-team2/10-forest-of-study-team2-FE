import React from 'react'
import './InputText.css'

const InputText = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="input-text-container">
            {label && <label htmlFor="input-text">{label}</label>}
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}
export default InputText