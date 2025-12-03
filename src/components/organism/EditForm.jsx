import React from 'react';
import InputLabel from '../molecule/InputLabel';
import ThumbNailSelect from '../molecule/ThumbNailSelect';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/Input.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from '/assets/images/icons/btn_cancel_txt.svg';
import modifyIcon from '/assets/images/icons/btn_modification_txt.svg';
import useStudyModification from './useStudyModification';

//스터디 수정 폼
const EditForm = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const {
    formData,
    showPassword,
    errors,
    touched,      
    handleChange,
    handleBlur,    
    togglePassword,
    handleSubmit
  } = useStudyModification(studyId);

  //'배경선택' 전(위) 위치한 text input
  const topInputFields = [
    { 
      label: '닉네임',
      placeholder: '닉네임을 수정해 주세요',
      type: 'text',
      field: 'nickName',
      errorMessage: '닉네임을 수정해주세요'
    },
    { 
      label: '스터디 이름', 
      placeholder: '스터디 이름을 수정해 주세요', 
      type: 'text',
      field: 'studyName',
      errorMessage: '스터디 이름을 수정해주세요'
    },
    { 
      label: '소개', 
      placeholder: '소개 멘트를 수정해 주세요', 
      type: 'text',
      field: 'introduction'
    },
  ]

  return (
    <section>
      <h2 className={templateStyles.title}>스터디 수정하기</h2>

      <form onSubmit={handleSubmit}>
        <div>
          {topInputFields.map((field, index) => (
            <InputLabel
              key={index}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.field]}
              onChange={(e) => handleChange(field.field, e.target.value)}
              onBlur={() => handleBlur(field.field)}
              error={touched[field.field] && errors[field.field]}
              errorMessage={field.errorMessage}
            />
          ))}
        </div>
        
        {/* 배경선택 */}
        <ThumbNailSelect 
          selectedThumbNail={formData.thumbNail}
          onSelectThumbNail={(thumbNail) => handleChange('thumbNail', thumbNail)}
        />

        {/* 비밀번호 input */}
        <div>
          <InputLabel
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={touched.password && errors.password}
            errorMessage="비밀번호를 입력해주세요"
            showPassword={showPassword.password}
            onTogglePassword={() => togglePassword('password')}
          />

          <InputLabel
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            value={formData.passwordConfirm}
            onChange={(e) => handleChange('passwordConfirm', e.target.value)}
            onBlur={() => handleBlur('passwordConfirm')}
            error={touched.passwordConfirm && errors.passwordConfirm}
            errorMessage="비밀번호가 일치하지 않습니다"
            showPassword={showPassword.passwordConfirm}
            onTogglePassword={() => togglePassword('passwordConfirm')}
          />
        </div>

        <div className={styles.buttonBoxForEditForm}>
          <button 
            type="button" 
            className={styles.button} 
            onClick={() => navigate(`/detail/${studyId}`)}
          >
            <img src={backIcon} alt="back" />
          </button>
          <button type="submit" className={styles.button}>
            <img src={modifyIcon} alt="modify" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditForm;