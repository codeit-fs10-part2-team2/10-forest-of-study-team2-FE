import templateStyles from '../../styles/Template.module.css';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import todayHabitStyles from '../../styles/TodayHabitModal.module.css';
import Button from '../UI/Button/Button';
import Modal from '../../components/UI/Model/Modal';
import HabitList from '../../components/molecule/HabitList';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const backIcon = '/assets/images/icons/btn_cancel_txt.svg';
const modifyIcon = '/assets/images/icons/btn_modification_txt.svg';
import arrowRightIcon from '/public/assets/images/icons/arrow_right.svg';
import day from 'dayjs';

const viewStudyDetailTitle = '연우의 개발공장';

const initialHabits = [
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

  // 습관 목록 관리 in modal
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [habits, setHabits] = useState(initialHabits);

  const handleCompleteEdit = () => {
    setShowHabitModal(false);
  }

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId)); 
  }

  const handleAddHabit = (habitName) => {
    if (!habitName || !habitName.trim()) {
      return;
    }
    const maxId = habits.length > 0 
      ? Math.max(...habits.map(h => parseInt(h.id))) 
      : 0;
    const newHabit = { 
      id: String(maxId + 1), 
      name: habitName.trim() 
    };
    setHabits([...habits, newHabit]);
  }

  const handleCancelHabit = () => {
    setShowHabitModal(false);
  }

  return (
  <>
  <div>
    <section className={styles.titleSection}>
      <h1 className={styles.mainTitle}>{viewStudyDetailTitle}</h1>
      <div className={styles.navButtons}>
        <Button className={styles.navBtn}>
          <span className={styles.navBtnText}>오늘의 집중 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span> {/* habit button */}
        </Button>
        <Button className={styles.navBtn}>
          <Link to="/">
            <span className={styles.navBtnText}>홈 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
          </Link>
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
    <section style={{ marginTop: '20px' }}>
    <div className={`${styles.habitTrackerCard} ${styles.todayHabitTrackerCard}`}>
      <div className={todayHabitStyles.todayHabitCardHeader}>
        <h3 className={todayHabitStyles.todayHabitCardTitle}>오늘의 습관</h3>
        <span className={`${styles.actionLink} ${todayHabitStyles.todayActionLink}`}>
          <Link to="#" onClick={() => setShowHabitModal(true)}>목록 수정</Link>
        </span>
      </div>
      {habits.length === 0 ? (
        <div className={templateStyles.msgBox}>
          <p className={templateStyles.emptyMessage}>아직 습관이 없어요<br/>목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
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

    {showHabitModal && (
      <Modal 
        title="습관 목록"
        onClose={() => setShowHabitModal(false)}
        footer={
          <div className={todayHabitStyles.habitButtonContainer}>
            <Button onClick={() => setShowHabitModal(false)}><img src={backIcon} alt="back" /></Button>
            <Button onClick={handleCompleteEdit}><img src={modifyIcon} alt="modify" /></Button>
          </div>
        }
      >
        <HabitList 
          habits={habits}
          onDeleteHabit={handleDeleteHabit}
          onCancelHabit={handleCancelHabit}
          onAddHabit={handleAddHabit}
        />
      </Modal>
    )}
    </>
  );
};

export default TodayHabit;
