import React from 'react';
import styles from '../../styles/StudyCard.module.css';

//스터디카드 하단 이모지 통계 부분
const Emoji = ({ stats = [] }) => {
  return (
    <div className={styles.stats}>
      {stats.map((stat, index) => (
        <div className={styles.stat} key={index}>
          {stat.icon} {stat.value}
        </div> 
      ))}
    </div>
  );
};

export default Emoji;
