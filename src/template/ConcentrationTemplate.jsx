import React from 'react';
import styles from '../styles/Template.module.css';
import Timer from '../components/organism/Timer';

const TodayFocusTemplate = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Timer />
      </div>
    </div>
  );
};

export default TodayFocusTemplate;