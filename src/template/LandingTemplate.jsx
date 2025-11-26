import React from 'react';
import styles from '../styles/Template.module.css';
import RecentStudy from '../components/organism/RecentStudy';
import StudyList from '../components/organism/StudyList';

const LandingTemplate = ({users}) => {

  const recentUsers = users.slice(0, 3);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <RecentStudy users={recentUsers}/>
      </div>
      <div className={styles.container}>
        <StudyList />
      </div>
    </div>
  );
};

export default LandingTemplate;