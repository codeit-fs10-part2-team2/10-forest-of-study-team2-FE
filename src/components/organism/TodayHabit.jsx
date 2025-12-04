import templateStyles from '../../styles/Template.module.css';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import todayHabitStyles from '../../styles/TodayHabitModal.module.css';
import Button from '../UI/Button/Button';
import Modal from '../../components/UI/Model/Modal';
import HabitList from '../../components/molecule/HabitList';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTodayHabit from './useTodayHabit';
import useTodayHabitInsert from './useTodayHabitInsert';
import useHabitByStudyId from './useHabitByStudyId';
const backIcon = '/assets/images/icons/btn_cancel_txt.svg';
const modifyIcon = '/assets/images/icons/btn_modification_txt.svg';
import arrowRightIcon from '/public/assets/images/icons/arrow_right.svg';
import day from 'dayjs';
import { useNavigate } from 'react-router-dom';

//오늘의 습관 
const TodayHabit = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const { loading: todayHabitLoading, habits: todayHabits, refreshHabits, setHabitsFromSaved } = useTodayHabit(studyId);
  const { loading: studyLoading, viewStudyDetailTitle, habits: allHabits } = useHabitByStudyId(studyId);
  const { loading: saving, insertTodayHabits } = useTodayHabitInsert();
  const currentTime = day().locale('ko').format('YYYY-MM-DD A h:mm');
  
  // 오늘의 습관이 있으면 오늘의 습관을, 없으면 전체 습관을 표시
  const fetchedHabits = todayHabits && todayHabits.length > 0 ? todayHabits : allHabits;
  const loading = todayHabitLoading || studyLoading;

  // 습관 목록 관리 in modal (로컬 상태로 모달에서 편집)
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [habits, setHabits] = useState([]);

  // DB에서 가져온 습관 데이터를 로컬 상태로 동기화
  useEffect(() => {
    if (fetchedHabits) {
      setHabits(fetchedHabits);
    }
  }, [fetchedHabits]);

  const handleCompleteEdit = async () => {
    if (habits.length === 0) {
      setShowHabitModal(false);
      return;
    }

    try {
      const result = await insertTodayHabits(studyId, habits);
      if (result.success && result.data) {
        const responseData = result.data.data || {};
        const createdHabits = responseData.created || [];
        const skippedHabits = responseData.skipped || [];
        
        // 저장 응답에서 created와 skipped를 모두 확인
        // created: 새로 생성된 습관들 (habit_pk 포함)
        // skipped: 이미 존재하는 습관들 (이름만 배열)
        
        // 새로 생성된 습관들의 이름과 ID 매핑
        const createdHabitsMap = new Map();
        createdHabits.forEach(habit => {
          createdHabitsMap.set(habit.habit_name || habit.name, {
            id: String(habit.habit_pk || habit.id),
            name: habit.habit_name || habit.name || ''
          });
        });
        
        // 기존 습관 목록에서 skipped된 습관들을 찾아서 유지
        const existingHabitsMap = new Map();
        fetchedHabits.forEach(habit => {
          existingHabitsMap.set(habit.name, habit);
        });
        
        // 저장할 때 보낸 전체 습관 목록을 기반으로 최종 습관 목록 구성
        const finalHabits = habits.map(habit => {
          const habitName = habit.name;
          
          // 새로 생성된 습관이면 새 ID 사용
          if (createdHabitsMap.has(habitName)) {
            return createdHabitsMap.get(habitName);
          }
          
          // skipped된 습관이면 기존 습관 목록에서 찾아서 ID 유지
          if (skippedHabits.includes(habitName) && existingHabitsMap.has(habitName)) {
            return existingHabitsMap.get(habitName);
          }
          
          // 둘 다 아니면 임시 ID 유지 (이론적으로는 발생하지 않아야 함)
          return habit;
        });
        
        // 저장된 습관 데이터로 직접 업데이트
        setHabitsFromSaved(finalHabits);
        console.log('습관 저장 성공, 저장된 데이터로 화면 업데이트', {
          created: createdHabits.length,
          skipped: skippedHabits.length,
          final: finalHabits
        });
        
        // refreshHabits도 시도하되, 빈 배열이면 저장된 데이터 유지
        try {
          await refreshHabits();
        } catch (refreshError) {
          console.warn('습관 새로고침 실패, 저장된 데이터 유지:', refreshError);
        }
        
        setShowHabitModal(false);
      } else {
        console.error('습관 저장 실패:', result.error);
        alert('습관 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('습관 저장 중 오류 발생:', error);
      alert('습관 저장 중 오류가 발생했습니다.');
    }
  }

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId)); 
  }

  const handleAddHabit = (habitName) => {
    if (!habitName || !habitName.trim()) {
      return;
    }
    const maxId = habits.length > 0 
      ? Math.max(...habits.map(h => parseInt(h.id) || 0)) 
      : 0;
    const newHabit = { 
      id: String(maxId + 1), 
      name: habitName.trim() 
    };
    setHabits([...habits, newHabit]);
  }

  const handleCancelHabit = () => {
    // 모달을 닫을 때 DB에서 가져온 원본 데이터로 복원
    if (fetchedHabits) {
      setHabits(fetchedHabits);
    }
    setShowHabitModal(false);
  }

  // 모달이 열릴 때 현재 습관 데이터를 로컬 상태로 복사
  const handleOpenModal = () => {
    if (fetchedHabits) {
      setHabits(fetchedHabits);
    }
    setShowHabitModal(true);
  }

  if (loading) {
    return (
      <div>
        <div className={styles.loadingText}>로딩 중...</div>
      </div>
    );
  }

  return (
  <>
  <div>
    <section className={styles.titleSection}>
      <h1 className={styles.mainTitle}>{viewStudyDetailTitle || '로딩 중...'}</h1>
      <div className={styles.navButtons}>
        <Button className={styles.navBtn} onClick={() => navigate(`/Timer`)}>
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
        <div className={styles.pointsBtn}>
          <span className={styles.pointsText}>{currentTime}</span>
        </div>
      </div>
    </section>
    <section style={{ marginTop: '20px' }}>
    <div className={`${styles.habitTrackerCard} ${styles.todayHabitTrackerCard}`}>
      <div className={todayHabitStyles.todayHabitCardHeader}>
        <h3 className={todayHabitStyles.todayHabitCardTitle}>오늘의 습관</h3>
        <span className={`${todayHabitStyles.todayActionLink}`}>
          <Link to="#" onClick={handleOpenModal}>목록 수정</Link>
        </span>
      </div>
      {fetchedHabits && fetchedHabits.length === 0 ? (
        <div className={templateStyles.msgBox}>
          <p className={templateStyles.emptyMessage}>아직 습관이 없어요<br/>목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
      ) : (
        <div className={`${styles.habitListContainer} ${styles.todayHabitListContainer}`}>
          {fetchedHabits && fetchedHabits.map((habit) => (
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
            <Button onClick={handleCancelHabit} disabled={saving}><img src={backIcon} alt="back" /></Button>
            <Button onClick={handleCompleteEdit} disabled={saving}>
              {saving ? '저장 중...' : <img src={modifyIcon} alt="modify" />}
            </Button>
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
