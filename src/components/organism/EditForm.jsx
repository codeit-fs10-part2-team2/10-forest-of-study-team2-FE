import React from 'react';
import InputLabel from '../molecule/InputLabel';
import ThumbNailSelect from '../molecule/ThumbNailSelect';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/Input.module.css';

//스터디 만들기 폼
const EditForm = () => {
  
  //'배경선택' 전(위) 위치한 text input
  const topInputFields = [
    { label: '닉네임', placeholder: '닉네임은 필수 입력 항목입니다.', type: 'text'},
    { label: '스터디 이름', placeholder: '스터디 이름은 필수 입력 항목입니다.', type: 'text'},
    { label: '소개', placeholder: '소개 멘트는 필수 입력 항목입니다.', type: 'text'},
  ]

  //'배경선택' 후(아래) 위치한 password input
  const bottomInputFields = [
    { label: '비밀번호', placeholder: '비밀번호는 필수 입력 항목입니다.', type: 'password', error: false, errorMessage: ''},
    { label: '비밀번호 확인', placeholder: '비밀번호를 다시 한 번 입력해 주세요', type: 'password', error: false, errorMessage: '비밀번호가 일치하지 않습니다'}
  ]

  return (
    <section>
      <h2 className={templateStyles.title}>스터디 수정하기</h2>

      <div>
        {topInputFields.map((field, index) => ( 
          <InputLabel 
            key={index}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}
      </div>

        <ThumbNailSelect />

      <div>
        {bottomInputFields.map((field, index) => ( 
          <InputLabel 
            key={index}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={field.error}
            errorMessage={field.errorMessage}
            showPassword={false}
            onTogglePassword={()=>{}} //비밀번호 숨기기/보기
          />
        ))}
      </div>

      <div className={styles.buttonBox}>
        <button className={styles.button}>수정하기</button>
      </div>
    </section>
  );
};

export default EditForm;