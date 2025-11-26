import React from 'react';
import styles from '../../styles/Input.module.css';

//더보기 버튼
const LoadMoreButton = () => {
  return (
    <>
      <button className={`${styles.input} ${styles.LoadMoreButton}`}>더보기</button>
    </>
  );
};

export default LoadMoreButton;