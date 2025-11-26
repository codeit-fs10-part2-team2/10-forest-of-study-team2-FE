import React from 'react'
import styles from './InputText.module.css'

const InputText = ({ value, onChange, placeholder, className = '', inputTextClassName = '' }) => {
    return (
        <div className={styles.inputTextContainer}>
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={className || styles.inputText} />
        </div>
    )
}
export default InputText