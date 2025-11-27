import styles from '../../styles/Input.module.css';

const eyes = '/images/icon/eyes1.svg';
const showEyes = '/images/icon/eyes2.svg';


const InputLabel = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  showPassword,
  onTogglePassword
}) => {
  
  const introInput = label === "소개";
  
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      
      {introInput ? (
        //input label : '소개'일 때 
        <textarea 
          className={`${styles.input} ${styles.inputLabel} ${styles.introInput}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        /> 
      ) : type === 'password' ? (
        //input type : 'password'일 때 
        <div className={`${styles.input} ${styles.inputLabel}`}>
          <input 
            className={styles.passwordBox}
            type={showPassword ? 'password' : 'text'} //showPassword(false)가 참이면 숨기기 / 아니면 보기
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <button type='button' onClick={onTogglePassword} className={styles.eyesButton}>
            <img
              src={showPassword ? eyes : showEyes}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            />
          </button>
        </div>
      ) : (
        //일반 input
        <input 
          className={`${styles.input} ${styles.inputLabel}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {error && (
        <p>*{errorMessage}</p>
      )}
    </div>
  );
}

export default InputLabel;