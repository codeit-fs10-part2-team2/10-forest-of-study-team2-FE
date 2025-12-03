import React, { useState, useRef, useEffect } from 'react';
import EmojiPickerButton from '../../components/UI/EmojiPicker/EmojiPicker';

const arrowRightIcon = '/assets/images/icons/arrow_right.svg';
import Button from '../../components/UI/Button/Button';
import HabitTrackerCard from '../../components/organism/HabitTrackerCard';
import PasswordModal from '../../components/UI/PasswordModal/PasswordModal';
import styles from './ViewStudyDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewStudyDetails = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  
  // State variables for data from backend
  const [viewStudyDetailTitle, setViewStudyDetailTitle] = useState('');
  const [studyDescription, setStudyDescription] = useState('');
  const [habits, setHabits] = useState([]);
  const [points, setPoints] = useState(0);
  const [emojiMetrics, setEmojiMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const days = ['월', '화', '수', '목', '금', '토', '일']; // days list for habit tracker card
  
  const [shouldWrap, setShouldWrap] = useState(false);    // whether to wrap the engagement metrics buttons in mobile screen
  const engagementMetricsRef = useRef(null);              // engagement-metrics div - used to check the width of the div in mobile screen
  const metricButtonsRef = useRef([]);                    // metric-btn buttons - used to check the width of the buttons in mobile screen
  const [showDeleteStudyModal, setShowDeleteStudyModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState(''); // dummy password state for PasswordModal

  const handleEmojiSelect = (emoji) => {
    setEmojiMetrics(prevMetrics => {
      const existingIndex = prevMetrics.findIndex(item => item.emoji === emoji);
      if (existingIndex > -1) {              // if the emoji already exists, count + 1
        const updated = [...prevMetrics];   
        updated[existingIndex] = {       
          ...updated[existingIndex],            // update the existing emoji
          count: updated[existingIndex].count + 1, // increment the count
        };
        return updated;                 // return the updated metrics
      }
      return [...prevMetrics, { emoji, count: 1 }]; // add the new emoji to the metrics
    }) // return the updated metrics
  }

  // Enable wrap when button count is 4 or more
  useEffect(() => {
    setShouldWrap(emojiMetrics.length >= 4); // enable wrap if the emojiMetrics has 4 or more items
  }, [emojiMetrics]); // re-run the effect when the emojiMetrics changes(when the emoji is added or removed)

  const handleDeleteStudy = () => {
    navigate('/');
  }

  return (
    <>
    <main>
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div 
                      ref={engagementMetricsRef}
                      className={`${styles.engagementMetrics} ${shouldWrap ? styles.wrapEnabled : ''}`}
                    >
                        {emojiMetrics.map((item, index) => (
                          <Button 
                            key={index} 
                            ref={(el) => metricButtonsRef.current[index] = el}
                            className={styles.metricBtn}
                          >
                            <span className={styles.icon}>{item.emoji}</span> 
                            <span>{item.count}</span> {/* emoji count */}
                          </Button>
                        ))}
                        <EmojiPickerButton onEmojiSelect={handleEmojiSelect} /> {/* emoji picker button - used to select the emoji and add the emoji to the metrics */}
                    </div>
                    <div className={styles.actionButtons}>
                        <Link to="#" className={styles.actionLink}>공유하기</Link> {/* share button */}
                        <span className={styles.divider}>|</span>
                        <Link to={`/enrollment/${studyId}`} className={styles.actionLink}>수정하기</Link> {/* edit button */}
                        <span className={styles.divider}>|</span>
                        <Link to="#" className={styles.actionLink} onClick={(e) => { e.preventDefault(); setShowDeleteStudyModal(true); }}>스터디 삭제하기</Link> {/* delete button */}
                    </div>
                </div>

                <div className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>{viewStudyDetailTitle}</h1> {/* study title */}
                    <div className={styles.navButtons}>
                        <Button className={styles.navBtn} onClick={() => navigate('/todayHabit')}>
                          <span className={styles.navBtnText}>오늘의 습관 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
                        </Button>
                        <Button className={styles.navBtn}>
                          <span className={styles.navBtnText}><Link to="/timer" className={styles.actionLink}>오늘의 집중</Link> <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
                        </Button>
                    </div>
                </div>
                <div className={styles.contentSection}>
                    <div className={styles.introSection}>
                        <h2 className={styles.introTitle}>소개</h2>
                        <p className={styles.introText}>{studyDescription}</p>
                    </div>
                    <div className={styles.pointsSection}>
                        <span className={styles.pointsLabel}>현재까지 획득한 포인트</span> {/* points label */}
                        <Button className={styles.pointsBtn}> {/* points button */}
                            <span className={styles.leafIcon}>🌱</span>
                            <span className={styles.pointsText}>{points}P 획득</span> {/* points button */}
                        </Button>
                    </div>
                </div>
            </div>

            <div className={styles.mainContent} data-main-content>
              <HabitTrackerCard habits={habits} days={days} />
            </div>
        </div>
    </main>
    {showDeleteStudyModal && (
      <PasswordModal
        password={deletePassword}
        onPasswordChange={(e) => setDeletePassword(e.target.value)}
        onPasswordSubmit={handleDeleteStudy}
        buttonText="삭제하기"
        modalTitleText="스터디 삭제"
        errorMessageText="권한이 필요합니다."
        onPasswordExit={() => setShowDeleteStudyModal(false)}
        onPasswordExitText="나가기"
      />
    )}
  </>
  )
}

export default ViewStudyDetails;

