import React from 'react';
import styles from '../../styles/Template.module.css'
import logo from '../../images/logo/img_logo.svg'
import { Link } from 'react-router';

//로고, 스터디만들기 헤더 고정 //스터디만들기 링크는 홈페이지에서만 보이게 하고 싶음
const Header = () => {
  return (
  <header className={styles.navbar}>
    <Link to='/'>
      <img src={logo} alt="로고" width="135" />
    </Link>
    <Link to='/enrollment' className={styles.studyCreate}>스터디 만들기</Link>
  </header>
  );
};

export default Header;