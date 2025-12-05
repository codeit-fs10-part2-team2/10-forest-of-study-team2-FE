import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import styles from './ViewStudyDetails/ViewStudyDetails.module.css';
import Button from '../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import arrowRightIcon from '/public/assets/images/icons/arrow_right.svg';

const TimerPage = () => {
  const { studyId } = useParams();
  const INITIAL_TIME = 25 * 60;
  const [time, setTime] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const [studyName, setStudyName] = useState("연우의 개발공장");

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div  
      style={{
      backgroundColor: "white",     
      minHeight: "100vh",           
   }}

    >
    <div style={{ padding: "20px", marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>  
        <h2 style={{ margin: 0, fontSize: "28px" }}>{studyName}</h2>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button className={styles.navBtn}>
            <Link to={`/todayHabit/${studyId}`} style={{ textDecoration: 'none' }}>
              <span className={styles.navBtnText}>오늘의 습관 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
            </Link>
          </Button>
          <Button className={styles.navBtn}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className={styles.navBtnText}>홈 <img src={arrowRightIcon} alt="arrow right" className={styles.arrowRightIcon} /></span>
            </Link>
          </Button>
        </div>
      </div>
      <div className={styles.pointsSection}>
        <span className={styles.pointsLabel}>현재까지 획득한 포인트</span>
        <Button className={styles.pointsBtn}>
          <span className={styles.leafIcon}>🌱</span>
          <span className={styles.pointsText}>310P 획득</span>
        </Button>
      </div>
    </div>

    
    <ul style={{ textAlign: "center", padding: "10px" }}>
      <h2>오늘의 집중</h2>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button className={styles.pointsBtn}>
          <span className={styles.leafIcon}><img src="/assets/images/icons/ic_timer.svg" alt="timer" /> </span>
          <span className={styles.pointsText}>25:00</span>
        </Button>
      </div>
      <br></br>
      <h1 style={{ fontSize: "80px", marginBottom: "20px", color: "red", fontWeight: "bold" }}>
        {formatTime(time)}
      </h1>

      <div style={{ display: "flex", justifyContent: "center",  gap: "20px" }}>
      {isRunning && (
          <img
            src="../../assets/images/icons/btn_pause.png"
            alt="pause"
        
            style={{ cursor: "pointer" }}
            onClick={() => setIsRunning(false)}
          />
        )}

        {!isRunning && (
          <img
            src="../../assets/images/icons/btn_start.png"
            alt="reset"
        
            style={{ cursor: "pointer" }}
            onClick={() => setIsRunning(true)}
          />
        )}

        {isRunning && (
          <img
            src="../../assets/images/icons/btn_reset.png"
            alt="stop"
        
            style={{ cursor: "pointer" }}
            onClick={() => { setIsRunning(false);
                             setTime(INITIAL_TIME);}

            }
          />
        )}


      </div>


 
    </ul>
  
    </div>
  );
};

export default TimerPage;
