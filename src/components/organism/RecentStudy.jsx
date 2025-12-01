import React from 'react';
import StudyCard from '../molecule/StudyCard';
import EmptyState from '../UI/EmptyState';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/LandingPage.module.css';

//최근 조회한 스터디
const RecentStudy = ({users}) => {

  return (
    <section>
      <h2 className={templateStyles.title}>최근 조회한 스터디</h2>

      {users.length === 0 ? (  
        <EmptyState message="아직 조회한 스토리가 없어요" />
      ) : ( 
        <div className={`${styles.cardList} ${styles.recentList}`}>
          {users.map((user) => (
            <StudyCard key={user.id} {...user} />
          ))}
        </div>
      )}

    </section>
  );
};

export default RecentStudy;