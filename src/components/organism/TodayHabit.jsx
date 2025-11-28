import React from 'react';
import EmptyState from '../UI/EmptyState';
import Button from '../UI/Button/Button';
import templateStyles from '../../styles/Template.module.css';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import arrowRightIcon from '/public/assets/images/icons/arrow_right.svg';
import day from 'dayjs';

const viewStudyDetailTitle = '연우의 개발공장';

const habits = [
  { id: '1', name: '미라클모닝 6시 기상' }, 
  { id: '2', name: '아침 챙겨 먹기' }, 
  { id: '3', name: 'React 스터디 책 1챕터 읽기' },
  { id: '4', name: '스트레칭' },
  { id: '5', name: '사이드 프로젝트' },
  { id: '6', name: '물 2L 마시기' },
];

//오늘의 습관 
const TodayHabit = () => {
  const currentTime = day().locale('ko').format('YYYY-MM-DD A h:mm');
  
  return (
  <div>
    <section className={styles.titleSection}>
      <h1 className={styles.mainTitle}>{viewStudyDetailTitle}</h1>
      <div className={styles.navButtons}>
        <Button className={styles.navBtn}>
          <span className={styles.navBtnText}>오늘의 집중 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span> {/* habit button */}
        </Button>
        <Button className={styles.navBtn}>
          <span className={styles.navBtnText}>홈 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
        </Button>
      </div>
    </section>
    <section>
      <div className={styles.introSection}></div>
      <div className={styles.pointsSection}>
        <span className={styles.pointsLabel}>현재시간</span>
        <Button className={styles.pointsBtn}>
          <span className={styles.pointsText}>{currentTime}</span>
        </Button>
      </div>
    </section>
    <section className={styles.habitSection}>
    <div className={`${styles.habitTrackerCard} ${styles.todayHabitTrackerCard}`}>
      <div>
        <h3 className={styles.todayHabitCardTitle}>오늘의 습관<span className= {`${styles.actionLink} ${styles.todayActionLink}`}>목록 수정</span></h3>
      </div>
      {habits.length === 0 ? (
        <EmptyState message="아직 조회한 스토리가 없어요" />
      ) : (
        <div className={`${styles.habitListContainer} ${styles.todayHabitListContainer}`}>
          {habits.map((habit) => (
            <div key={habit.id} className={`${styles.habitListItem} ${styles.todayHabitListItem}`} >
              <span className={`${styles.habitName} ${styles.todayHabitName}`}>{habit.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    </section>
  </div>
  );
};

export default TodayHabit;
