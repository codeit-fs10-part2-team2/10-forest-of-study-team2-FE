import React from 'react';
import { useState, useEffect } from 'react';

import './index.css';

function Timer()
{
	const [time, setTime] = useState(60 * 25);

	useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(() => {
      setTime(prevCount => prevCount - 1);
    }, 1000); // Update every 1 second

    // Clean up the interval when the component unmounts
    return () => { clearInterval(intervalId); }; 
  },
  []); // dependency list
  
	return (
		<div>
		<div id="timer-page">
			<div className='head'>
				연우의 개발공장
				<div className='right'>
					<div className='btn'>
						<div>오늘의 습관 &gt;</div>
						</div>
					<div className='btn'>
						<div>홈 &gt;</div>
					</div>
				</div>
			</div>
		
			<div className='info'>
				현재까지 획득한 포인트
				<div className='points'>
					310P 획득
				</div>		
			</div>

			<div id = 'bottom-page'>
				{/* <div className='bottom-page-div'> */}
				<div>
					<div className='concentrate-today'>	
					오늘의 집중
					</div>

						<div className='clock-top'>
			
							<div className='clock-image'> 이미지

							</div>
							<div className='num-text'>25:00
							</div>
						</div>
					</div>
					<div className='watch-num'> 
						{(()=>{
							let m = (time -(time%60))/60 ; // 분
							let s = time%60; // 초
		
							return `${m}:${s}`;
						})()}
					</div>
					
					<div className='btn-sum'>
						{/* pause */}
						<div onClick={() => {  }}>a</div>
						{/* start */}
						<div onClick={() => {}}>b</div>
						{/* return */}
						<div onClick={() =>{clearInterval(useState)}}>c</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Timer;