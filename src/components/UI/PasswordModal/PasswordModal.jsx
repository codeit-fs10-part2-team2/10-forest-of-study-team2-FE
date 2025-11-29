import React from 'react';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import Label from '../Label/Label';
import icEyeOpen from '/public/assets/images/icons/eye-open.svg';
import icEyeClose from '/public/assets/images/icons/eye-closed.svg';
import { useState } from 'react';
import styles from './PasswordModal.module.css';

const icEyeOpen = '/assets/images/icons/eye-open.svg';
const icEyeClose = '/assets/images/icons/eye-closed.svg';

const PasswordModal = ({ 
    password, 
    onPasswordChange, 
    onPasswordSubmit, 
    buttonText = '수정하러 가기', 
    modalTitleText = '',
    modalTitleClassName = 'passwordModalTitle',
    modalTitleId = 'passwordModalTitle',
    errorMessageText = '권한이 필요해요!',
    errorMessageClassName = 'passwordModalErrorMessageText',
    errorMessageId = 'passwordModalErrorMessage',
    onPasswordExit,
    onPasswordExitText = '나가기',
    onPasswordExitClassName = 'passwordModalErrorMessageText',
    passwordInputClassName = 'passwordModalErrorMessageText',
    passwordInputId = 'password',
    passwordInputPlaceholder = '비밀번호를 입력해주세요',
    passwordInputType = 'password',
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const actualPasswordInputType = isPasswordVisible ? 'text' : passwordInputType;
    const handlePasswordExit = () => {
        onPasswordExit && onPasswordExit(); // onPasswordExit가 있으면 실행
    };
    return (
    <>
        <div className={styles.passwordModalContainer}>
            <div className={styles.passwordModalBox}>
                <div className={styles.passwordModalContent}>
                    <Label 
                        labelText={modalTitleText} 
                        labelClassName={`${styles.passwordModalTitle} ${modalTitleClassName}`} 
                        labelId={modalTitleId}>
                    </Label>
                    <span 
                        className={`${styles.passwordModalExit} ${onPasswordExitClassName}`} 
                        onClick={handlePasswordExit}>{onPasswordExitText}
                    </span>
                </div>
                <div className={styles.passwordModalErrorMessage}>
                    <Label 
                        labelText={errorMessageText} 
                        labelClassName={`${styles.passwordModalErrorMessageText} ${errorMessageClassName}`} 
                        labelId={errorMessageId}>
                    </Label>
                </div>
                <div className={styles.passwordModalInputContainer}>
                    <Label htmlFor="password" labelText="비밀번호" labelClassName={styles.passwordLabel} />
                    <div className={styles.passwordInputWrapper}>
                        <InputText 
                            id={passwordInputId} 
                            value={password} 
                            onChange={onPasswordChange} 
                            placeholder={passwordInputPlaceholder} 
                            type={actualPasswordInputType} 
                            className={`${styles.passwordInput} ${passwordInputClassName}`} 
                        required/>
                        <img 
                            src={isPasswordVisible ? icEyeOpen : icEyeClose} 
                            alt="비밀번호 보기" 
                            className={styles.passwordEyeIcon} 
                            onMouseDown={() => setIsPasswordVisible(true)}
                            onMouseUp={() => setIsPasswordVisible(false)}
                            onMouseLeave={() => setIsPasswordVisible(false)}
                            onTouchStart={() => setIsPasswordVisible(true)}
                            onTouchEnd={() => setIsPasswordVisible(false)}
                        />
                    </div>
                </div>
                <div className={styles.passwordModalButtonContainer}>
                    <Button 
                        className={styles.passwordSubmitBtn} 
                        onClick={onPasswordSubmit}>{buttonText}
                    </Button>
                </div>
            </div>
        </div>
    </>
  );
};

export default PasswordModal;