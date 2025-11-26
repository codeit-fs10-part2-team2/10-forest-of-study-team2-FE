import React from 'react';
import styles from '../styles/Template.module.css';
import CreateForm from '../components/organism/CreateForm';

const StudyInsertionTemplate = () => {
  return (
    <div className={styles.createWrapper}>
      <div className={styles.container}>
        <CreateForm />
      </div>
    </div>
  );
};

export default StudyInsertionTemplate;