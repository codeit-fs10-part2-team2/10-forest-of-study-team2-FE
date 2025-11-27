import React from 'react';
import StudyCard from '../molecule/StudyCard';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/LandingPage.module.css';
import users from '../../users.json'
import InputSearch from '../atom/InputSearch';
import SortButton from '../atom/SortButton';
import LoadMoreButton from '../atom/LoadMoreButton';

//스터디 리스트
const StudyList = () => {

  return (
    <section>
      <h2 className={templateStyles.title}>스터디 둘러보기</h2>

      {users.length === 0 ? (  //사용자 데이터가 없을때
        <div className={templateStyles.msgBox}>
          <p className={templateStyles.emptyMessage}>아직 둘러 볼 스터디가 없어요</p>
        </div>
      ) : (  //사용자 데이터가 있을때
        <>
          <div className={styles.inputBox}>
            <InputSearch />
            <SortButton />
          </div>
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
          <div className={styles.buttonBox}>
            <LoadMoreButton />
          </div>
        </>
      )}
    </section>
  );
};

export default StudyList;