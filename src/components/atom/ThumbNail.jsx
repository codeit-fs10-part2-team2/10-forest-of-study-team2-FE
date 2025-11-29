import React from 'react';
import styles from "../../styles/StudyCard.module.css"

//스터디카드 배경이미지 추출
export const images = {
  0: "/public/assets/images/frame/frame00.png",
  1: "/public/assets/images/frame/frame01.png",
  2: "/public/assets/images/frame/frame02.png",
  3: "/public/assets/images/frame/frame03.png",
  4: "/public/assets/images/frame/frame04.png",
  5: "/public/assets/images/frame/frame05.png",
  6: "/public/assets/images/frame/frame06.png",
  7: "/public/assets/images/frame/frame07.png",
}
const ThumbNail = ({ value = 0, children }) => {

  return (
    <div
      className={styles.thumbNail}
      style={{ 
        backgroundImage: `url(${images[value]})`,
      }}
    >
      {children}
    </div>
  )
}
export default ThumbNail; 