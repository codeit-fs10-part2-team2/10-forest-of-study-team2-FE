import React from 'react';
import './Button.css';

const Button = React.forwardRef(({ children, onClick, className }, ref) => {
    const buttonClassName = className || 'button';

    return (
        <button ref={ref} className={buttonClassName} onClick={onClick}>{children}</button>
    );
});

export default Button;