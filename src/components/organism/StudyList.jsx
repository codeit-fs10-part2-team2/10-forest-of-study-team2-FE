import { useState } from 'react';
import StudyCard from '../molecule/StudyCard';
import EmptyState from '../UI/EmptyState';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../styles/LandingPage.module.css';
import InputSearch from '../atom/InputSearch';
import SortButton from '../atom/SortButton';
import LoadMoreButton from '../atom/LoadMoreButton';
import useStudyFilter from './useStudyFilter'

//스터디 리스트
const StudyList = ({ studies = [] }) => {
  const {
    searchKeyword,
    sortOption,
    sortedStudies,
    displayedStudies,
    displayCount,
    handleSearchChange,
    handleSortChange,
    handleLoadMore
  } = useStudyFilter(studies);

  return (
    <section>
      <h2 className={templateStyles.title}>스터디 둘러보기</h2>

      {studies.length === 0 ? (
        <EmptyState message={searchKeyword ? "검색 결과가 없습니다" : "아직 둘러 볼 스터디가 없어요"} />
      ) : (  
        <>
          <div className={styles.inputBox}>
            <InputSearch 
              value={searchKeyword}
              onChange={handleSearchChange}
            />
            <SortButton 
              value={sortOption}
              onChange={handleSortChange}
            />
          </div>
          <div className={`${styles.cardList} ${styles.list}`}>
            {displayedStudies.map((study) => (
              <StudyCard key={study.id} {...study} />
            ))}
          </div>

          {displayCount < sortedStudies.length && (
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