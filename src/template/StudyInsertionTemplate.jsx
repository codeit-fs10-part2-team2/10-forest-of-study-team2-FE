import React from 'react';
import styles from '../styles/Template.module.css';
import StudyInsertion from '../components/organism/StudyInsertion';

const StudyInsertionTemplate = () => {
  return (
    <div className={`${styles.wrapper} ${styles.StudyInsertionWrapper}`}>
      <div className={styles.container}>
        <StudyInsertion />
      </div>
    </div>
  );
};

export default StudyInsertionTemplate;