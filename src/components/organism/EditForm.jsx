import React from 'react';
import InputLabel from '../molecule/InputLabel';
import ThumbNailSelect from '../molecule/ThumbNailSelect';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/Input.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from '/assets/images/icons/btn_cancel_txt.svg';
import modifyIcon from '/assets/images/icons/btn_modification_txt.svg';
import useStudyModification from '../../hooks/useStudyModification';

const EditForm = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();

  const {
    formData,
    errors,
    touched,      
    handleChange,
    handleBlur,    
    handleSubmit
  } = useStudyModification(studyId);

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

        <div style={{ marginTop: '16px' }}>
          <ThumbNailSelect 
            selectedThumbNail={formData.thumbNail}
            onSelectThumbNail={(thumbNail) => handleChange('thumbNail', thumbNail)}
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