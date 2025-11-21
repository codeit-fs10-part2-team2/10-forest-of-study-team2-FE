import React from 'react'
import './Modal.css'

const Modal = ({ children, title, footer }) => {
    return (
        <div className="modal-container">
            <div className="modal-content">
                {title && <h2>{title}</h2>}
                <div className="modal-body">
                    {children}
                </div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
  );
};

export default Modal;