import styles from '../../styles/StudyCard.module.css';
import Emoji from '../atom/Emoji';
import ThumbNail from '../atom/ThumbNail';
import day from 'dayjs';
import { Link } from 'react-router';

//스터디카드
const StudyCard = ({ key, nickName, studyName, description, createdAt, point, thumbNail = 0, stats = [] }) => {

  //사용자의 스터디 생성일자를 '2025-11-11' -> 금일 기준 '00'일째인지 
  const dayDiff = (createdAt) => {
    const today = day();
    const createdDate = day(createdAt);
    const diffDays = today.diff(createdDate, 'day', false);
    const dDay = Math.floor(diffDays);
    
    return dDay
  } 

  const date = dayDiff(createdAt)
  const textColor = thumbNail > 3 ? '#fff' : '';
  //사용자가 선택한 배경이미지에 따라 글자색상 다르게 적용

  return (
    <section>
      <Link to={`/detail/${key}`} className={styles.underlineLink}>
        <div className={`${styles.container} ${styles[`thumbnail${thumbNail}`]}`} > 
          <ThumbNail value={thumbNail}>
            <div className={styles.content}>
              <div className={styles.titleBox}>
                <h3 className={styles.title}>
                  <p className={styles.nickName}>{nickName}</p><p style={{ color: textColor }} className={styles.studyName}>의 {studyName}</p>
                </h3>
                {point && 
                <div className={styles.badge}> 
                  <img className={styles.emoji} src='/assets/images/icon/ic_point.svg' alt="Point" /> 
                  {point}P 획득 
                </div>}
              </div>
              <p style={{ color: textColor }} className={styles.meta}>{date}일째 진행 중</p>
              <p style={{ color: textColor }} className= {styles.description}>{description}</p>
            </div>
            
            <Emoji stats={stats} />
          </ThumbNail>
        </div>
      </Link>
    </section>
  );
}

export default StudyCard;
