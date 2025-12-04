import React, { useRef } from 'react';
import EmojiPickerButton from '../../components/UI/EmojiPicker/EmojiPicker';

const arrowRightIcon = '/assets/images/icons/arrow_right.svg';
import Button from '../../components/UI/Button/Button';
import HabitTrackerCard from '../../components/organism/HabitTrackerCard';
import PasswordModal from '../../components/UI/PasswordModal/PasswordModal';
import styles from './ViewStudyDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useStudyView from '../../components/organism/useStudyView';

const ViewStudyDetails = () => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  
  console.log('ViewStudyDetails: studyId from params:', studyId);
  
  // Use custom hook for study data
  const {
    viewStudyDetailTitle,
    studyDescription,
    habits,
    points,
    emojiMetrics,
    loading,
    shouldWrap,
    showDeleteStudyModal,
    setShowDeleteStudyModal,
    deletePassword,
    setDeletePassword,
    showEditStudyModal,
    setShowEditStudyModal,
    editPassword,
    setEditPassword,
    handleEmojiSelect,
    handleDeleteStudy,
    handleEditStudy,
  } = useStudyView(studyId);

  const days = ['월', '화', '수', '목', '금', '토', '일']; // days list for habit tracker card
  
  const engagementMetricsRef = useRef(null);              // engagement-metrics div - used to check the width of the div in mobile screen
  const metricButtonsRef = useRef([]);                    // metric-btn buttons - used to check the width of the buttons in mobile screen

  if (loading) {
    return (
      <main>
        <div className={styles.mainContainer}>
          <div className={styles.loadingText}>로딩 중...</div>
        </div>
      </main>
    );
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
                        <Link to="#" className={styles.actionLink} onClick={(e) => { e.preventDefault(); setShowEditStudyModal(true); }}>수정하기</Link> {/* edit button */}
                        <span className={styles.divider}>|</span>
                        <Link to="#" className={styles.actionLink} onClick={(e) => { e.preventDefault(); setShowDeleteStudyModal(true); }}>스터디 삭제하기</Link> {/* delete button */}
                    </div>
                </div>

                <div className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>{viewStudyDetailTitle}</h1> {/* study title */}
                    <div className={styles.navButtons}>
                        <Button className={styles.navBtn} onClick={() => navigate(`/todayHabit/${studyId}`)}>
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
    {showEditStudyModal && (
      <PasswordModal
        password={editPassword}
        onPasswordChange={(e) => setEditPassword(e.target.value)}
        onPasswordSubmit={handleEditStudy}
        buttonText=""
        buttonIcon="/assets/images/icons/btn_modification.svg"
        modalTitleText="스터디 수정"
        errorMessageText="권한이 필요합니다."
        onPasswordExit={() => setShowEditStudyModal(false)}
        onPasswordExitText="나가기"
      />
    )}
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

