import React, { useState, useEffect, useRef } from "react";



const TimerPage = () => {
  const INITIAL_TIME = 25 * 60;
  const [time, setTime] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

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
    
    
    <ul style={{ textAlign: "center", padding: "70px" }}>
      <h2>오늘의 집중</h2>
      <br></br>
      <img src="../../assets/images/icons/25_timer.png" alt="25_timer" />
      <br></br>
      <h1 style={{ fontSize: "80px", marginBottom: "40px", color: "red", fontWeight: "bold" }}>
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
