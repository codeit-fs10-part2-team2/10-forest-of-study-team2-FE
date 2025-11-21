import React, { useState, useRef, useEffect } from 'react'
import './ViewStudyDetails.css'
import icStickerGreen from './images/ic_sticker_green.svg'
import icIncomplete from './images/ic_incomplete.svg'
import EmojiPickerButton from '../../components/UI/EmojiPicker/EmojiPicker'

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
  ])

  const days = ['월', '화', '수', '목', '금', '토', '일']
  const [engagement] = useState({ participants: 37, likes: 11, emojis: 9 })
  const [points] = useState(310)
  
  // initial emoji list: 3
  const [emojiMetrics, setEmojiMetrics] = useState([
    { emoji: '👩‍💻', count: 37 },
    { emoji: '👍', count: 11 },
    { emoji: '🤩', count: 9 },
  ])
  
  const [shouldWrap, setShouldWrap] = useState(false)
  const engagementMetricsRef = useRef(null)
  const metricButtonsRef = useRef([])

  const toggleHabit = (habitId, dayIndex) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completed = [...habit.completed]
        const index = completed.indexOf(dayIndex)
        if (index > -1) {
          completed.splice(index, 1)
        } else {
          completed.push(dayIndex)
        }
        return { ...habit, completed }
      }
      return habit
    }))
  }

  const handleEmojiSelect = (emoji) => {
    setEmojiMetrics(prevMetrics => {
      const existingIndex = prevMetrics.findIndex(item => item.emoji === emoji)
      if (existingIndex > -1) {
        //  if same emoji, count + 1
        const updated = [...prevMetrics]
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: updated[existingIndex].count + 1
        }
        return updated
      } else {
        // add new emoji
        return [...prevMetrics, { emoji, count: 1 }]
      }
    })
  }

  // Make sure the total width of the emoji buttons exceeds half the screen.
  useEffect(() => {
    const checkWidth = () => {
      if (engagementMetricsRef.current && metricButtonsRef.current.length > 0) {
        let totalWidth = 0
        metricButtonsRef.current.forEach((btn) => {
          if (btn) {
            totalWidth += btn.offsetWidth + 3 // gap included
          }
        })
        
        const containerWidth = engagementMetricsRef.current.offsetWidth
        const halfWidth = containerWidth / 2
        
        setShouldWrap(totalWidth > halfWidth)
      }
    }

    // checkwidth
    checkWidth()

    // resize EventListener
    window.addEventListener('resize', checkWidth)
    
    // checkwidth when emojiMetrics is changed
    const timeoutId = setTimeout(checkWidth, 100)

    return () => {
      window.removeEventListener('resize', checkWidth)
      clearTimeout(timeoutId)
    }
  }, [emojiMetrics])

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
                          <button 
                            key={index} 
                            ref={(el) => metricButtonsRef.current[index] = el}
                            className="metric-btn"
                          >
                            <span className="icon">{item.emoji}</span>
                            <span>{item.count}</span>
                          </button>
                        ))}
                        <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
                    </div>
                    <div className="action-buttons">
                        <a href="#" className="action-link">공유하기</a>
                        <span className="divider">|</span>
                        <a href="#" className="action-link">수정하기</a>
                        <span className="divider">|</span>
                        <a href="#" className="action-link">스터디 삭제하기</a>
                    </div>
                </div>

                <div className="title-section">
                    <h1 className="main-title">{viewStudyDetailTitle}</h1>
                    <div className="nav-buttons">
                        <button className="nav-btn">
                        <span>오늘의 습관 {'>'}</span>
                        </button>
                        <button className="nav-btn">
                        <span>오늘의 집중 {'>'}</span>
                        </button>
                    </div>
                </div>
                <div className="content-section">
                    <div className="intro-section">
                        <h2 className="intro-title">소개</h2>
                        <p className="intro-text">{studyDescription}</p>
                    </div>
                    <div className="points-section">
                        <span className="points-label">현재까지 획득한 포인트</span>
                        <button className="points-btn">
                            <span className="leaf-icon">🌱</span>
                            <span>{points}P 획득</span>
                        </button>
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
                                onClick={() => toggleHabit(habit.id, dayIndex)}
                            >
                                <img 
                                src={habit.completed.includes(dayIndex) ? icStickerGreen : icIncomplete}
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

