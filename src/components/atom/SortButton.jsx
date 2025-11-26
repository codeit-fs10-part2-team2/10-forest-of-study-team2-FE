import React from 'react';
import styles from '../../styles/Input.module.css';

//정렬 버튼
const SortButton = () => {

  return (
    <div className={styles.container} >
      <select className={`${styles.input} ${styles.sortButton}`}>
        <option>최근 순</option>
        <option>오래된 순</option>
        <option>많은 포인트 순</option>
        <option>적은 포인트 순</option>
      </select>
    </div>
  );
};

export default SortButton;