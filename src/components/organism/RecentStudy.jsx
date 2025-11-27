import React from 'react';
import StudyCard from '../molecule/StudyCard';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/LandingPage.module.css';

//최근 조회한 스터디
const RecentStudy = ({users}) => {

  return (
    <section>
      <h2 className={templateStyles.title}>최근 조회한 스터디</h2>

      {users.length === 0 ? (  //사용자 데이터가 없을 때
        <div className={templateStyles.msgBox}>
          <p className={templateStyles.emptyMessage}>아직 조회한 스토리가 없어요</p>
        </div>
      ) : ( //사용자 데이터가 있을때
        <div className={styles.cardList}>
          {users.map((user) => (
            <StudyCard 
              key={user.id}
              nickName={user.nickName}
              studyName={user.studyName}
              description={user.description}
              createdAt={user.createdAt}
              point={user.point}
              thumbNail={user.thumbNail}
              stats={user.stats}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default RecentStudy;