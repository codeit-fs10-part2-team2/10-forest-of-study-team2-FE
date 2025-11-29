import React from 'react';
import ThumbNail, { images } from '../atom/ThumbNail';
import styles from '../../styles/Input.module.css';
import selectIcon from '/public/assets/images/icon/ic_bg_selected.svg'

//스터디만들기에서 배경이미지 선택
const ThumbNailSelect = () => {
  
  return (
    <div>
      <p className= {styles.label}>배경을 선택해주세요</p>
      <div className={styles.thumbNailSelect}>
        {Object.keys(images).map((key, index) => {
          const selected = index === 0;
          
          return (
            <div className={styles.selectBox} key={key}>
              <ThumbNail 
                value={key}
                selected={selected}
              />
              {selected && (
                <img 
                  className={styles.selectIcon}
                  src={selectIcon}
                  alt="선택됨"
                /> //배경이미지가 선택 이되면 배경이미지 위에 스티커가 보이도록
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ThumbNailSelect;