import React from 'react';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import Label from '../Label/Label';
import icEyeOpen from '../../assets/images/icons/eye_open.svg';
import icEyeClose from '../../assets/images/icons/eye_closed.svg';
import { useState } from 'react';
import './PasswordModal.css';

const PasswordModal = ({ 
    password, 
    onPasswordChange, 
    onPasswordSubmit, 
    buttonText = '수정하러 가기', 
    modalTitleText = '연우의 개발공장',
    modalTitleClassName = '',
    modalTitleId = 'password-modal-title',
    errorMessageText = '권한이 필요해요!',
    errorMessageClassName = 'password-modal-error-message-text',
    errorMessageId = 'password-modal-error-message',
    onPasswordExit,
    onPasswordExitText = '나가기',
    onPasswordExitClassName = 'password-modal-exit-icon-text',
    onPasswordExitId = 'password-modal-exit-icon',
    passwordInputClassName = 'password-modal-input-container-input',
    passwordInputId = 'password',
    passwordInputPlaceholder = '비밀번호를 입력해주세요',
    passwordInputType = 'password',
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const passwordInputType = isPasswordVisible ? 'text' : 'password';
    const onPasswordExit = () => {
        onPasswordExit && onPasswordExit(); // onPasswordExit가 있으면 실행
    };
    return (
    <>
        <div className="password-modal-container">
            <div className="password-modal-content">
                <Label labelText={modalTitleText} labelClassName={modalTitleClassName} labelId={modalTitleId}></Label>
                <span className={onPasswordExitClassName} onClick={onPasswordExit}>{onPasswordExitText}</span>
            </div>
            <div className="password-modal-error-message">
                <Label labelText={errorMessageText} labelClassName={errorMessageClassName} labelId={errorMessageId}></Label>
            </div>
            <div className="password-modal-input-container">
                <Label htmlFor="password" labelText="비밀번호" />
                <InputText id={passwordInputId} value={password} onChange={onPasswordChange} placeholder={passwordInputPlaceholder} type={passwordInputType} className={passwordInputClassName} />
                <img src={isPasswordVisible ? icEyeOpen : icEyeClose} alt="비밀번호 보기" className="password-eye-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
            </div>
            <div className="password-modal-button-container">
                <Button className="password-submit-btn" onClick={onPasswordSubmit}>{buttonText}</Button>
            </div>
        </div>
    </>
  );
};

export default PasswordModal;