import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ children, title, footer }) => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                {title && <h2>{title}</h2>}
                <div className={styles.modalBody}>
                    {children}
                </div>
                {footer && <div className={styles.modalFooter}>{footer}</div>}
            </div>
        </div>
  );
};

export default Modal;