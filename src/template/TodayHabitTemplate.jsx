import React from 'react';
import TodayHabit from '../components/organism/TodayHabit';
import styles from '../styles/Template.module.css';

const TodayHabitTemplate = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <TodayHabit />
      </div>
    </div>
  );
};

export default TodayHabitTemplate;