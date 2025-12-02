import { useState, useEffect, useCallback } from "react";

import style from "../styles/TimerPage.module.css";

import { Link } from "react-router";

function Timer()
{
	const [timer, setTimer] = useState({ id: null, time: 60 * 25 });

	const title = "연우의 개발공장";
	const point = 310;

	// memory leak!
	useEffect(() =>
	{
		return () => clearInterval(timer.id);
	},
	[]);

	const start = useCallback(() =>
	{
		// clearInterval(timer.id);
		setTimer((_) => ({ time: _.time, id: setInterval(() => setTimer((_) => ({ time: _.time - 1, id: _.id })), 1000) }));
	},
	[]);

	const pause = useCallback(() =>
	{
		clearInterval(timer.id);
		setTimer((_) => ({ time: _.time, id: null }));
	},
	[]);

	const reset = useCallback(() =>
	{
		clearInterval(timer.id);
		setTimer((_) => ({ time: 60 * 25, id: null }));
	},
	[]);

	const format = useCallback((time) =>
	{
		const [mm, ss] = [(time - (time % 60)) / 60, (time % 60)]; // TODO: YY, DD

		return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
	},
	[]);

	return (
		<div className={style.page}>
			<div className={style.head}>
				{title}
				<div className={style.goto}>
					<Link className={style.link} to="/">
						오늘의 습관
					</Link>
					<Link className={style.link} to="/">
						홈
					</Link>
				</div>
			</div>
			<div className={style.info}>
				현재까지 획득한 포인트
				<div className={style.data}>
					<img src="assets/images/icons/ic_point.svg"/>
					{point}P 획득
				</div>
			</div>
			<div className={style.body}>
				오늘의 집중
				<div className={style.clock} style={{ color: timer.time <= 10 ? "#F50E0E" :
					                                         timer.time <=  0 ? "#818181" : undefined }}>
					{format(timer.time)}
				</div>
				<div className={style.tools}>
					<button className={style.pause_btn} onClick={pause} style={{ display: timer.id ? undefined : "none" }}>
						<img src="assets/images/icons/ic_pause.svg"/>
					</button>
					<button className={style.start_btn} onClick={start} disabled={timer.id != null}>
						<img src="assets/images/icons/ic_play.svg"/>
						Start!
					</button>
					<button className={style.reset_btn} onClick={reset} style={{ display: timer.id ? undefined : "none" }}>
						<img src="assets/images/icons/ic_restart.svg"/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Timer;