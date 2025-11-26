import React from 'react';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import Label from '../Label/Label';
import icEyeOpen from '../../assets/images/icons/eye_open.svg';
import icEyeClose from '../../assets/images/icons/eye_closed.svg';
import { useState } from 'react';
import styles from './PasswordModal.module.css';

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
        <div className={styles.passwordModalContainer}>
            <div className={styles.passwordModalContent}>
                <Label labelText={modalTitleText} labelClassName={modalTitleClassName} labelId={modalTitleId}></Label>
                <span className={onPasswordExitClassName} onClick={onPasswordExit}>{onPasswordExitText}</span>
            </div>
            <div className={styles.passwordModalErrorMessage}>
                <Label labelText={errorMessageText} labelClassName={errorMessageClassName} labelId={errorMessageId}></Label>
            </div>
            <div className={styles.passwordModalInputContainer}>
                <Label htmlFor="password" labelText="비밀번호" />
                <InputText id={passwordInputId} value={password} onChange={onPasswordChange} placeholder={passwordInputPlaceholder} type={passwordInputType} className={passwordInputClassName} />
                <img src={isPasswordVisible ? icEyeOpen : icEyeClose} alt="비밀번호 보기" className={styles.passwordEyeIcon} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
            </div>
            <div className={styles.passwordModalButtonContainer}>
                <Button className={styles.passwordSubmitBtn} onClick={onPasswordSubmit}>{buttonText}</Button>
            </div>
        </div>
    </>
  );
};

export default PasswordModal;