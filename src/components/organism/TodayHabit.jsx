import templateStyles from '../../styles/Template.module.css';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import todayHabitStyles from '../../styles/TodayHabitModal.module.css';
import Button from '../UI/Button/Button';
import Modal from '../../components/UI/Model/Modal';
import HabitList from '../../components/molecule/HabitList';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import PasswordModal from '../UI/PasswordModal/PasswordModal';
import useToast from '../../hooks/useToast';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTodayHabit from '../../hooks/useTodayHabit';
import useHabitByStudyId from '../../hooks/useHabitByStudyId';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';
const backIcon = '/assets/images/icons/btn_cancel_txt.svg';
const modifyIcon = '/assets/images/icons/btn_modification_txt.svg';
import arrowRightIcon from '/public/assets/images/icons/arrow_right.svg';
import day from 'dayjs';
import { useNavigate } from 'react-router-dom';

const TodayHabit = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const { showSuccess, showError } = useToast();
  const { loading: todayHabitLoading, todayFulfillments, refreshTodayFulfillments } = useTodayHabit(studyId);
  const { loading: studyLoading, viewStudyDetailTitle, habits: allHabits, refreshHabits: refreshAllHabits } = useHabitByStudyId(studyId);
  const [saving, setSaving] = useState(false);
  const currentTime = day().locale('ko').format('YYYY-MM-DD A h:mm');
  const [displayHabits, setDisplayHabits] = useState([]);
  const loading = todayHabitLoading || studyLoading;
  
  useEffect(() => {
    if (!allHabits || allHabits.length === 0) {
      setDisplayHabits([]);
      setCompletedHabits(new Set());
      return;
    }
    
    const completedHabitPks = new Set();
    if (todayFulfillments && Array.isArray(todayFulfillments)) {
      todayFulfillments.forEach(fulfillment => {
        const habitPk = fulfillment.habit_pk;
        if (habitPk) {
          completedHabitPks.add(String(habitPk));
        }
      });
    }
    
    const habitsWithFulfillment = allHabits.map(habit => {
      const habitPk = String(habit.habit_pk || habit.id);
      const hasFullfillment = completedHabitPks.has(habitPk);
      return {
        ...habit,
        hasFullfillment
      };
    });
    
    setDisplayHabits(habitsWithFulfillment);
    setCompletedHabits(completedHabitPks);
  }, [allHabits, todayFulfillments]);

  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [habits, setHabits] = useState([]);
  const [originalHabits, setOriginalHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState(new Set());

  useEffect(() => {
    if (displayHabits && displayHabits.length > 0) {
      const habitsWithPk = displayHabits.map(habit => ({
        habit_pk: habit.habit_pk || habit.id,
        id: habit.habit_pk || habit.id,
        name: habit.name || habit.habit_name || ''
      }));
      setHabits(habitsWithPk);
      setOriginalHabits(habitsWithPk);
    } else if (displayHabits && displayHabits.length === 0) {
      setHabits([]);
      setOriginalHabits([]);
    }
  }, [displayHabits]);

  const handleCompleteEdit = async () => {
    setSaving(true);
    try {
      const validHabits = habits.filter(habit => {
        const habitName = habit.name || habit.habit_name || '';
        return habitName.trim().length > 0;
      });
      
      if (validHabits.length === 0) {
        showError('목록 수정에 실패했습니다.');
        setSaving(false);
        return;
      }
      
      const requestBody = validHabits.map(habit => {
        const habitPk = habit.habit_pk || habit.id;
        const habitName = (habit.name || habit.habit_name || '').trim();
        
        if (habitPk && String(habitPk).startsWith('temp-')) {
          return {
            habit_name: habitName
          };
        }
        
        if (habitPk && !String(habitPk).startsWith('temp-')) {
          const pk = parseInt(String(habitPk), 10);
          if (isNaN(pk)) {
            return {
              habit_name: habitName
            };
          }
          return {
            habit_pk: pk,
            habit_name: habitName
          };
        }
        
        return {
          habit_name: habitName
        };
      });

      const hasInvalidData = requestBody.some(habit => {
        if (!habit.habit_name || habit.habit_name.trim().length === 0) {
          return true;
        }
        if (habit.habit_pk !== undefined && (isNaN(habit.habit_pk) || habit.habit_pk <= 0)) {
          return true;
        }
        return false;
      });

      if (hasInvalidData) {
        showError('목록 수정에 실패했습니다.');
        setSaving(false);
        return;
      }

      const habitPkSet = new Set();
      const hasDuplicatePk = requestBody.some(habit => {
        if (habit.habit_pk !== undefined) {
          if (habitPkSet.has(habit.habit_pk)) {
            return true;
          }
          habitPkSet.add(habit.habit_pk);
        }
        return false;
      });

      if (hasDuplicatePk) {
        showError('목록 수정에 실패했습니다.');
        setSaving(false);
        return;
      }

      const response = await axiosInstance.put(
        API_ENDPOINTS.HABITS.UPDATE_ALL(studyId),
        requestBody
      );

      const [refreshedTodayFulfillments, refreshedAllHabits] = await Promise.all([
        refreshTodayFulfillments(),
        refreshAllHabits()
      ]);
      
      const completedHabitPks = new Set();
      if (refreshedTodayFulfillments && Array.isArray(refreshedTodayFulfillments)) {
        refreshedTodayFulfillments.forEach(fulfillment => {
          const habitPk = fulfillment.habit_pk;
          if (habitPk) {
            completedHabitPks.add(String(habitPk));
          }
        });
      }
      
      if (refreshedAllHabits && refreshedAllHabits.length > 0) {
        const habitsWithFulfillment = refreshedAllHabits.map(habit => {
          const habitPk = String(habit.habit_pk || habit.id);
          const hasFullfillment = completedHabitPks.has(habitPk);
          return {
            ...habit,
            hasFullfillment
          };
        });
        
        setDisplayHabits(habitsWithFulfillment);
        setCompletedHabits(completedHabitPks);
      }
      
      setShowHabitModal(false);
      showSuccess('목록 수정에 성공했습니다.');
    } catch (error) {
      console.error('습관 수정 에러:', error);
      console.error('요청 데이터:', requestBody);
      console.error('습관 개수:', validHabits.length);
      if (error.response) {
        console.error('응답 상태:', error.response.status);
        console.error('응답 데이터:', error.response.data);
      }
      showError('목록 수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  }

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => (habit.id || habit.habit_pk) !== habitId)); 
  }

  const handleUpdateHabit = (habitId, newName) => {
    if (!newName || !newName.trim()) {
      return;
    }
    setHabits(habits.map(habit => {
      const currentId = String(habit.id || habit.habit_pk);
      const targetId = String(habitId);
      if (currentId === targetId) {
        return {
          ...habit,
          name: newName.trim(),
          habit_pk: habit.habit_pk || habit.id,
          id: habit.habit_pk || habit.id
        };
      }
      return habit;
    }));
  }

  const handleAddHabit = (habitName) => {
    if (!habitName || !habitName.trim()) {
      return;
    }
    const newHabit = { 
      name: habitName.trim(),
      id: `temp-${Date.now()}`
    };
    setHabits([...habits, newHabit]);
  }

  const handleHabitClick = async (habitId) => {
    if (!studyId || !habitId) {
      return;
    }

    const habitIdKey = String(habitId);
    
    if (completedHabits.has(habitIdKey)) {
      return;
    }

    const previousCompletedHabits = new Set(completedHabits);
    const previousDisplayHabits = [...displayHabits];
    
    const newCompletedHabits = new Set(completedHabits);
    newCompletedHabits.add(habitIdKey);
    setCompletedHabits(newCompletedHabits);
    
    if (allHabits && allHabits.length > 0) {
      const habitsWithFulfillment = allHabits.map(habit => {
        const habitPk = String(habit.habit_pk || habit.id);
        const hasFullfillment = newCompletedHabits.has(habitPk);
        return {
          ...habit,
          hasFullfillment
        };
      });
      setDisplayHabits(habitsWithFulfillment);
    }

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      await axiosInstance.post(
        API_ENDPOINTS.HABITS.CREATE_FULFILLMENT(studyId, habitId),
        {
          date: today.toISOString()
        }
      );
      
      const refreshedFulfillments = await refreshTodayFulfillments();
      
      const completedHabitPks = new Set();
      if (refreshedFulfillments && Array.isArray(refreshedFulfillments)) {
        refreshedFulfillments.forEach(fulfillment => {
          const habitPk = fulfillment.habit_pk;
          if (habitPk) {
            completedHabitPks.add(String(habitPk));
          }
        });
      }
      
      if (allHabits && allHabits.length > 0) {
        const habitsWithFulfillment = allHabits.map(habit => {
          const habitPk = String(habit.habit_pk || habit.id);
          const hasFullfillment = completedHabitPks.has(habitPk);
          return {
            ...habit,
            hasFullfillment
          };
        });
        setDisplayHabits(habitsWithFulfillment);
      }
      
      setCompletedHabits(completedHabitPks);
    } catch (error) {
      setCompletedHabits(previousCompletedHabits);
      setDisplayHabits(previousDisplayHabits);
      showError('에러가 발생해 실패했습니다.');
    }
  }

  const handleCancelHabit = () => {
    if (displayHabits && displayHabits.length > 0) {
      const habitsWithPk = displayHabits.map(habit => ({
        habit_pk: habit.habit_pk || habit.id,
        id: habit.habit_pk || habit.id,
        name: habit.name || habit.habit_name || ''
      }));
      setHabits(habitsWithPk);
    } else {
      setHabits([]);
    }
    setShowHabitModal(false);
  }

  const handleOpenModal = () => {
    setShowPasswordModal(true);
  }

  const handlePasswordSubmit = () => {
    if (displayHabits && displayHabits.length > 0) {
      const habitsWithPk = displayHabits.map(habit => ({
        habit_pk: habit.habit_pk || habit.id,
        id: habit.habit_pk || habit.id,
        name: habit.name || habit.habit_name || ''
      }));
      setHabits(habitsWithPk);
      setOriginalHabits(habitsWithPk);
    } else {
      setHabits([]);
      setOriginalHabits([]);
    }
    setShowPasswordModal(false);
    setPassword('');
    setShowHabitModal(true);
  }

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
  <>
  <div>
    <section className={styles.titleSection}>
      <h1 className={styles.mainTitle}>{viewStudyDetailTitle || ''}</h1>
      <div className={styles.navButtons}>
        <Button className={styles.navBtn} onClick={() => navigate(`/Timer/${studyId}`)}>
          <span className={styles.navBtnText}>오늘의 집중 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
        </Button>
        <Button className={styles.navBtn} onClick={() => navigate(`/detail/${studyId}`)}>
          <span className={styles.navBtnText}>홈 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
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
      {displayHabits && displayHabits.length === 0 ? (
        <div className={templateStyles.msgBox}>
          <p className={templateStyles.emptyMessage}>아직 습관이 없어요<br/>목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
      ) : (
        <div className={`${styles.habitListContainer} ${styles.todayHabitListContainer}`}>
          {displayHabits && displayHabits.map((habit) => {
            const habitId = String(habit.id || habit.habit_pk);
            const isCompleted = completedHabits.has(habitId);
            
            return (
              <div 
                key={habitId} 
                className={`${styles.habitListItem} ${styles.todayHabitListItem} ${isCompleted ? styles.todayHabitListItemCompleted : ''}`}
                onClick={() => handleHabitClick(habit.id || habit.habit_pk)}
                style={{ cursor: 'pointer' }}
              >
                <span className={`${styles.habitName} ${styles.todayHabitName}`}>{habit.name || habit.habit_name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </section>
  </div>

    {showPasswordModal && (
      <PasswordModal
        password={password}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onPasswordSubmit={handlePasswordSubmit}
        buttonText="수정하기"
        modalTitleText="목록 수정"
        errorMessageText="권한이 필요합니다."
        onPasswordExit={() => {
          setShowPasswordModal(false);
          setPassword('');
        }}
        onPasswordExitText="나가기"
        studyId={studyId}
      />
    )}
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
          onUpdateHabit={handleUpdateHabit}
        />
      </Modal>
    )}
    </>
  );
};

export default TodayHabit;
