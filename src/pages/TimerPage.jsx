import { useState, useEffect, useCallback } from "react";

import style from "./TimerPage.module.css";

function Timer()
{
	const [timer, setTimer] = useState({ id: null, time: 60 * 25 });

	// memory leak!
	useEffect(() =>
	{
		return () => clearInterval(timer.id);
	},
	[]);

	const start = useCallback(() =>
	{
		setTimer((_) => ({ time: _.time, id: setInterval(() =>
		// repeat every 1s
		setTimer((_) => ({ ..._, time: _.time - 1 })), 1000) }));
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
				연우의 개발공장
				<div className={style.goto}>
					<a className={style.link} href="">
						오늘의 습관
					</a>
					<a className={style.link} href="">
						홈
					</a>
				</div>
			</div>
			<div className={style.info}>
				현재까지 획득한 포인트
				<div className={style.data}>
					310P 획득
				</div>
			</div>
			<div className={style.body}>
				오늘의 집중
				<div className={style.clock} style={{ color: timer.time <= 10 ? "#F50E0E" : timer.time < 0 ? "#818181" : undefined }}>
					{format(timer.time)}
				</div>
				<div className={style.tools}>
					<button className={style.pause_btn} onClick={pause} style={{ display: timer.id ? undefined : "none" }}>
						Pause!
					</button>
					<button className={style.start_btn} onClick={start} disabled={timer.id != null}>
						Start!
					</button>
					<button className={style.reset_btn} onClick={reset} style={{ display: timer.id ? undefined : "none" }}>
						Reset!
					</button>
				</div>
			</div>
		</div>
	);
}

export default Timer;