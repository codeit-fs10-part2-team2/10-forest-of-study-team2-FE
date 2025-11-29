import React from 'react'
import styles from './InputText.module.css'

const InputText = ({ value, onChange, placeholder, className = '', inputTextClassName = '', type = 'text', id }) => {
    return (
        <div className={styles.inputTextContainer}>
            <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={className || styles.inputText} />
        </div>
    )
}
export default InputText