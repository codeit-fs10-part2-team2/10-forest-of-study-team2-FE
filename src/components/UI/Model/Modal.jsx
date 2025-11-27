import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ children, title, footer, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <div className={styles.modalContainer} onClick={handleBackdropClick}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
                <div className={styles.modalBody}>
                    {children}
                </div>
                {footer && <div className={styles.modalFooter}>{footer}</div>}
            </div>
        </div>
    );
};

export default Modal;