import { memo } from 'react';
import styles from '../styles/Template.module.css';
import RecentStudy from '../components/organism/RecentStudy';
import StudyList from '../components/organism/StudyList';
import ApiComponent from './ApiComponent';

const LandingTemplate = memo(({ 
  studies = [],
  recentStudies = [],
  searchKeyword = '',
  sortOption = '최근 순',
  onSearchChange,
  onSearchKeyDown,
  onSortChange,
  onLoadMore,
  hasMore = false,
  loading = false
}) => {
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
});

LandingTemplate.displayName = 'LandingTemplate';

export default LandingTemplate;