import React, { useState } from 'react';
import StudyCard from '../molecule/StudyCard';
import EmptyState from '../UI/EmptyState';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/LandingPage.module.css';
import users from '../../users.json'
import InputSearch from '../atom/InputSearch';
import SortButton from '../atom/SortButton';
import LoadMoreButton from '../atom/LoadMoreButton';

//스터디 리스트
const StudyList = () => {
  const [displayCount, setDisplayCount] = useState(6);

  // 더보기 클릭 시 6개씩 추가
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 6);
  };

  // 표시할 데이터
  const displayedUsers = users.slice(0, displayCount);

  return (
    <section>
      <h2 className={templateStyles.title}>스터디 둘러보기</h2>

      {users.length === 0 ? (  
        <EmptyState message="아직 둘러 볼 스터디가 없어요" />
      ) : (  
        <>
          <div className={styles.inputBox}>
            <InputSearch />
            <SortButton />
          </div>
          <div className={`${styles.cardList} ${styles.list}`}>
            {displayedUsers.map((user) => (
              <StudyCard key={user.id} {...user} />
            ))}
          </div>

          {displayCount < users.length && (
            <div className={styles.buttonBox}>
              <LoadMoreButton onClick={handleLoadMore} />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default StudyList;