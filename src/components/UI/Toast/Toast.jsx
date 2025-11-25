import React from 'react';
import { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onDismiss }) => {


    // Icon mapping (simplified)
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
    };   

    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => {
            onDismiss && onDismiss();
        }, duration);
    };

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(handleDismiss, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, handleDismiss, duration]);

    if (!isVisible) return null;
    
    return (
        <div className={`toast-container toast-${type}`}>
            <div className="toast-icon"><img src={icons[type] || icons.info} alt={type} /></div>
            <div className="toast-message">{message}</div>
            <button className="toast-close" onClick={handleDismiss}>
                &times;
            </button>
        </div>
    );
};
export default Toast;