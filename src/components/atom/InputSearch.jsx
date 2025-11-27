import React from 'react';
import styles from '../../styles/Input.module.css';

//검색 input
const InputSearch = ({ type = 'text', value, onChange}) => {
  return (
    <div className={styles.container}>
      <img className={styles.iconSearch} src='/src/images/icon/ic_search.svg' alt="search" />
      <input 
        className={`${styles.input} ${styles.inputSearch}`}
        type={type}
        placeholder="검색"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSearch;