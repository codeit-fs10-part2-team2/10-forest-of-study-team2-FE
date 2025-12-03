import { useState } from 'react';
import styles from '../styles/Template.module.css';
import RecentStudy from '../components/organism/RecentStudy';
import StudyList from '../components/organism/StudyList';
import useGetRequestHandler from '../utils/useGetRequestHandler';
import API_ENDPOINTS from '../utils/apiEndpoints'
import users from '../users.json'

const LandingTemplate = () => {
  // API 연동 (현재는 enabled: false로 목데이터 사용)
  const { data: apiStudies, loading, error } = useGetRequestHandler(
    API_ENDPOINTS.STUDIES.GET_ALL,
    { enabled: false } // 백엔드 준비되면 true로 변경
  )

  // 목데이터 사용
  const studies = apiStudies || users;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <RecentStudy studies={studies.slice(0, 3)} />
      </div>
      <div className={styles.container}>
        <StudyList studies={studies} />
      </div>
    </div>
  );
};

export default LandingTemplate;