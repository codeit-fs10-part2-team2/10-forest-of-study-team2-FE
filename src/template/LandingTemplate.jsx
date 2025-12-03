import React from 'react';
import styles from '../styles/Template.module.css';
import RecentStudy from '../components/organism/RecentStudy';
import StudyList from '../components/organism/StudyList';
// import ApiComponent from './ApiComponent';

const LandingTemplate = ({users}) => {

  const recentUsers = users.slice(0, 3);
  // const apiData = ApiComponent();
  // console.log(apiData);
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