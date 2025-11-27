import React from 'react';
import { useParams } from 'react-router';
import styles from '../styles/Template.module.css';
import CreateForm from '../components/organism/CreateForm';
import EditForm from '../components/organism/EditForm';
/* 
    StudyInsertionTemplate.jsx updated by Taeyoung Seon, 11/26/2025
    This template is used to display the study insertion page.
    It includes the CreateForm and EditForm components.
    If studyId from route params is not null, the EditForm component is displayed.
    If studyId is null, the CreateForm component is displayed.
*/
const StudyInsertionTemplate = () => {
  const { studyId } = useParams();
  
  return (
    <div className={styles.createWrapper}>
      <div className={styles.container}>
        {studyId ? <EditForm /> : <CreateForm />}
      </div>
    </div>
  );
};

export default StudyInsertionTemplate;