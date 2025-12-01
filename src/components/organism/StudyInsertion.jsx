import React from 'react';
import InputLabel from '../molecule/InputLabel';
import ThumbNailSelect from '../molecule/ThumbNailSelect';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/Input.module.css';

//스터디 만들기 폼
const StudyInsertion = () => {
  
  //'배경선택' 전(위) 위치한 text input
  const topInputFields = [
    { label: '닉네임', placeholder: '닉네임을 입력해 주세요', type: 'text'},
    { label: '스터디 이름', placeholder: '스터디 이름을 입력해 주세요', type: 'text'},
    { label: '소개', placeholder: '소개 멘트를 작성해 주세요', type: 'text'},
  ];

  //'배경선택' 후(아래) 위치한 password input
  const bottomInputFields = [
    { label: '비밀번호', placeholder: '비밀번호를 입력해 주세요', type: 'password', error: false, errorMessage: ''},
    { label: '비밀번호 확인', placeholder: '비밀번호를 다시 한 번 입력해 주세요', type: 'password', error: false, errorMessage: '비밀번호가 일치하지 않습니다'}
  ];

  const renderInputFields = (fields) => (
    <div>
      {fields.map((field, index) => (
        <InputLabel key={index} {...field} />
      ))}
    </div>
  );

  return (
    <section>
      <h2 className={templateStyles.title}>스터디 만들기</h2>

      {renderInputFields(topInputFields)}

        <ThumbNailSelect />

      <div>
        {bottomInputFields.map((field, index) => (
          <InputLabel 
            key={index}
            {...field}
            showPassword={false}
            onTogglePassword={() => {}}
          />
        ))}
      </div>

      <div className={styles.buttonBox}>
        <button className={styles.button}>만들기</button>
      </div>
    </section>
  );
};

export default StudyInsertion;