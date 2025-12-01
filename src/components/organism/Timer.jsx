import React from 'react';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import todayHabitStyles from '../../styles/TodayHabitModal.module.css';
import timerStyles from '../../styles/Timer.module.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

import arrowRightIcon from '/assets/images/icons/arrow_right.svg';
import { useState, useEffect } from 'react';
const viewStudyDetailTitle = '연우의 개발공장';
import icTimer from '/assets/images/icons/ic_timer.svg';
import btnPause from '/assets/images/icons/btn_pause.svg';
import btnRestart from '/assets/images/icons/btn_restart.svg';
import btnStop from '/assets/images/icons/btn_stop.svg';
import icPlay from '/assets/images/icons/ic_play.svg';

//오늘의 집중 
const Timer = () => {
    const [points] = useState(310); // points value
    const INITIAL_TIME = 60 * 25; // 25:00 in seconds
    const [time, setTime] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

	useEffect(() => {
		if (isRunning) {
			const intervalId = setInterval(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);

			return () => { clearInterval(intervalId); };
		}
	}, [isRunning]);

	const formatTime = (seconds) => { // 25:00 format
		const absSeconds = Math.abs(seconds); // 2500 seconds to 25:00
		const mins = Math.floor(absSeconds / 60); // 25 minutes
		const secs = absSeconds % 60; // 00 seconds
		const sign = seconds < 0 ? '-' : ''; // -2500 seconds to -25:00
		return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; // 25:00 format
	};

	const handleStart = () => { // start button click
		setIsStarted(true);
		setIsRunning(true);
	}; // start button click

	const handleStop = () => { // stop button click
		setTime(INITIAL_TIME);
		setIsRunning(false);
		setIsStarted(false);
	};

	const handlePause = () => { // pause button click
		setIsRunning(false);
	};

	const handleRestart = () => { // restart button click
		setTime(INITIAL_TIME);
		setIsRunning(true);
	};

	const isNegative = time < 0; // time is negative
	const timerColor = isNegative ? '#818181' : (isStarted ? '#FF0000' : '#414141');
	const isStopMode = isNegative && isStarted;

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
        <span className={styles.pointsLabel}>현재까지 획득한 포인트</span> {/* points label */}
        <Button className={styles.pointsBtn}> {/* points button */}
            <span className={styles.leafIcon}>🌱</span>
            <span className={styles.pointsText}>{points}P 획득</span> {/* points button */}
        </Button>
      </div>
    </section>
    <section style={{ marginTop: '20px' }}>
    <div className={`${styles.habitTrackerCard} ${styles.todayHabitTrackerCard}`}>
      <div className={todayHabitStyles.todayHabitCardHeader}>
        <h3 className={todayHabitStyles.todayHabitCardTitle}>오늘의 집중</h3>
      </div>
      <div className={timerStyles.timerWrapper}>
        <h3 className={timerStyles.initialTime}><img src={icTimer} alt="timer" /> 25:00</h3> {/* settled time */}
      </div>
      <div className={timerStyles.timerWrapper}>
        <div className={timerStyles.timerDisplay} style={{ color: timerColor }}>
          {formatTime(time)}
        </div>
        <div className={timerStyles.timerControlButtonWrapper}>
          {isStarted && !isStopMode && (
            <button 
              className={timerStyles.iconButton}
              onClick={handlePause}
            >
              <img src={btnPause} alt="pause" />
            </button>
          )}
          <button 
            className={timerStyles.startButton}
            onClick={isStopMode ? handleStop : handleStart}
            disabled={isStarted && !isStopMode}
            style={isStopMode ? { backgroundColor: '#99C08E' } : {}}
          >
            {isStopMode ? (
              <>
                <img src={btnStop} alt="stop" className={timerStyles.playIcon} />
                <span className={timerStyles.startText}>Stop</span>
              </>
            ) : (
              <>
                <img src={icPlay} alt="play" className={timerStyles.playIcon} />
                <span className={timerStyles.startText}>Start!</span>
              </>
            )}
          </button>
          {isStarted && !isStopMode && (
            <button 
              className={timerStyles.iconButton}
              onClick={handleRestart}
            >
              <img src={btnRestart} alt="restart" />
            </button>
          )}
        </div>
      </div>

    </div>
    </section>
  </div>
    </>
  );
};

export default Timer;