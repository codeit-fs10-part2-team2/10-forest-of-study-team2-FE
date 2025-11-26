import React, { useState, useRef, useEffect } from 'react';
import Sticker from '../../components/UI/Sticker/Sticker';
import arrowRightIcon from '../../assets/images/icons/arrow_right.svg';
import EmojiPickerButton from '../../components/UI/EmojiPicker/EmojiPicker';
import Button from '../../components/UI/Button/Button';
import styles from './ViewStudyDetails.module.css';
import { Link } from 'react-router-dom';

const viewStudyDetailTitle = '연우의 개발공장';
const studyDescription = 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)';

const ViewStudyDetails = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: '미라클모닝 6시 기상', completed: [0, 2, 3, 5] }, // 월, 수, 목, 토
    { id: 2, name: '아침 챙겨 먹기', completed: [0, 1] }, // 월, 화
    { id: 3, name: 'React 스터디 책 1챕터 읽기', completed: [0] }, // 월
    { id: 4, name: '스트레칭', completed: [] },
    { id: 5, name: '사이드 프로젝트', completed: [] },
    { id: 6, name: '물 2L 마시기', completed: [] },
  ]); // habits list

  const days = ['월', '화', '수', '목', '금', '토', '일']; // days list for habit tracker card
  const [points] = useState(310); // points value
  
  // initial emoji list: 3
  const [emojiMetrics, setEmojiMetrics] = useState([
    { emoji: '👩‍💻', count: 37 },
    { emoji: '👍', count: 11 },
    { emoji: '🤩', count: 9 },
  ]);
  
  const [shouldWrap, setShouldWrap] = useState(false);    // whether to wrap the engagement metrics buttons in mobile screen
  const engagementMetricsRef = useRef(null);              // engagement-metrics div - used to check the width of the div in mobile screen
  const metricButtonsRef = useRef([]);                    // metric-btn buttons - used to check the width of the buttons in mobile screen

  const toggleHabit = (habitId, dayIndex) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completed = [...habit.completed];
        const index = completed.indexOf(dayIndex);
        if (index > -1) {              // if the day is already completed, remove it
          completed.splice(index, 1);
        } else {
          completed.push(dayIndex);     // if the day is not completed, add it to the completed list
        }
        return { ...habit, completed }; // return the updated habit
      }
      return habit;                    // return the original habit
    }))
  }

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

  return (
    <>
    <main>
        <div className="main-container">
            <div className="header">
                <div className="header-top">
                    <div 
                      ref={engagementMetricsRef}
                      className={shouldWrap ? styles.wrapEnabled : styles.engagementMetrics}
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
                        <Link to="#" className={styles.actionLink}>수정하기</Link> {/* edit button */}
                        <span className={styles.divider}>|</span>
                        <Link to="#" className={styles.actionLink}>스터디 삭제하기</Link> {/* delete button */}
                    </div>
                </div>

                <div className={styles.titleSection}>
                    <h1 className="main-title">{viewStudyDetailTitle}</h1> {/* study title */}
                    <div className={styles.navButtons}>
                        <Button className={styles.navBtn}>
                          <span className={styles.navBtnText}>오늘의 습관 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span> {/* habit button */}
                        </Button>
                        <Button className={styles.navBtn}>
                          <span className={styles.navBtnText}>오늘의 집중 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span> {/* focus button */}
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

            <div className={styles.mainContent}>
                <div className={styles.habitTrackerCard}>
                    <h2 className={styles.cardTitle}>습관 기록표</h2>
                    <div className={styles.habitGrid}>
                        <div className={styles.gridHeader}>
                        <div className={styles.habitHeaderCell}></div>
                        {days.map((day, index) => (
                            <div key={index} className={styles.dayHeaderCell}>
                            {day}
                            </div>
                        ))}
                        </div>
                        {habits.map(habit => (
                        <div key={habit.id} className={styles.habitRow}>
                            <div className={styles.habitNameCell}>{habit.name}</div>
                            {days.map((day, dayIndex) => (
                            <div
                                key={dayIndex} 
                                className={styles.habitCell}
                                onClick={() => toggleHabit(habit.id, dayIndex)} // call the toggleHabit function with the habit id and day index
                            >
                                <Sticker 
                                  completed={habit.completed.includes(dayIndex)} // set the completion status
                                  className={habit.completed.includes(dayIndex) ? styles.completed : styles.incomplete}
                                />
                            </div>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default ViewStudyDetails

