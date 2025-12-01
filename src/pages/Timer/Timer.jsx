import React from 'react';
import { useState, useEffect } from 'react';

import Pause from './assets/Pause';

import style from './Timer.module.css';

function Timer() {
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
		<div className={style.page}>
			<div className={style.head}>
				연우의 개발공장
				<div className={style.right}>
					<div className={style.btn}>
						<div>오늘의 습관 &gt;</div>
					</div>
					<div className={style.btn}>
						<div>홈 &gt;</div>
					</div>
				</div>
			</div>

			<div className= {style.info}>
				현재까지 획득한 포인트
				<div className={style.points}>
					310P 획득
				</div>
			</div>

			<div id={style.bottom}>
				<div className={style.concentrate_today}>
					오늘의 집중
				</div>

				<div className={style.clock_top}>

					<div className={style.clock_image}> 이미지

					</div>
					<div className={style.num_text}>25:00
					</div>
				</div>
				<div className={style.watch_num}>
					{(() => {
						let m = (time - (time % 60)) / 60; // 분
						let s = time % 60; // 초

						return `${m}:${s}`;
					})()}
				</div>

				<div className={style.btn_sum}>
					{/* pause */}
					<div className={style.pause} onClick={() => { }}><Pause/></div>
					{/* start */}
					<div onClick={() => { }}>b</div>
					{/* return */}
					<div onClick={() => { clearInterval(useState) }}>c</div>
				</div>
			</div>
		</div>
	);
}

export default Timer;