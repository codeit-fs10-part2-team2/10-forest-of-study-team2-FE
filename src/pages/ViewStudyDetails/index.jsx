import React, { useState, useRef, useEffect } from 'react';
import icStickerGreen from './images/ic_sticker_green.svg';
import icIncomplete from './images/ic_incomplete.svg';
import arrowRightIcon from '../../assets/images/icons/arrow_right.svg';
import EmojiPickerButton from '../../components/UI/EmojiPicker/EmojiPicker';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import './ViewStudyDetails.css';

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

  // If emojiMetrics has 4 or more items, enable wrap
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
                      className={`engagement-metrics ${shouldWrap ? 'wrap-enabled' : ''}`}
                    >
                        {emojiMetrics.map((item, index) => (
                          <Button 
                            key={index} 
                            ref={(el) => metricButtonsRef.current[index] = el}
                            className="metric-btn"
                          >
                            <span className="icon">{item.emoji}</span> 
                            <span>{item.count}</span> {/* emoji count */}
                          </Button>
                        ))}
                        <EmojiPickerButton onEmojiSelect={handleEmojiSelect} /> {/* emoji picker button - used to select the emoji and add the emoji to the metrics */}
                    </div>
                    <div className="action-buttons">
                        <Link to="#" className="action-link">공유하기</Link> {/* share button */}
                        <span className="divider">|</span>
                        <Link to="#" className="action-link">수정하기</Link> {/* edit button */}
                        <span className="divider">|</span>
                        <Link to="#" className="action-link">스터디 삭제하기</Link> {/* delete button */}
                    </div>
                </div>

                <div className="title-section">
                    <h1 className="main-title">{viewStudyDetailTitle}</h1> {/* study title */}
                    <div className="nav-buttons">
                        <Button className="nav-btn">
                          <span className="nav-btn-text">오늘의 습관 <img src={arrowRightIcon} alt="arrow right" className="arrow-right-icon" /></span> {/* habit button */}
                        </Button>
                        <Button className="nav-btn">
                          <span className="nav-btn-text">오늘의 집중 <img src={arrowRightIcon} alt="arrow right" className="arrow-right-icon" /></span> {/* focus button */}
                        </Button>
                    </div>
                </div>
                <div className="content-section">
                    <div className="intro-section">
                        <h2 className="intro-title">소개</h2>
                        <p className="intro-text">{studyDescription}</p>
                    </div>
                    <div className="points-section">
                        <span className="points-label">현재까지 획득한 포인트</span> {/* points label */}
                        <Button className="points-btn"> {/* points button */}
                            <span className="leaf-icon">🌱</span>
                            <span>{points}P 획득</span> {/* points button */}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="habit-tracker-card">
                    <h2 className="card-title">습관 기록표</h2>
                    <div className="habit-grid">
                        <div className="grid-header">
                        <div className="habit-header-cell"></div>
                        {days.map((day, index) => (
                            <div key={index} className="day-header-cell">
                            {day}
                            </div>
                        ))}
                        </div>
                        {habits.map(habit => (
                        <div key={habit.id} className="habit-row">
                            <div className="habit-name-cell">{habit.name}</div>
                            {days.map((day, dayIndex) => (
                            <div
                                key={dayIndex} 
                                className="habit-cell"
                                onClick={() => toggleHabit(habit.id, dayIndex)} // call the toggleHabit function with the habit id and day index
                            >
                                <img 
                                src={habit.completed.includes(dayIndex) ? icStickerGreen : icIncomplete} // set the icon based on the completion status
                                alt={habit.completed.includes(dayIndex) ? 'completed' : 'incomplete'}
                                className="habit-icon"
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

