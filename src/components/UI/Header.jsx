import React from 'react';
import TemplateStyles from '../../styles/Template.module.css'
import styles from '../../styles/Input.module.css'
import logo from '/public/images/logo/img_logo.svg'
import { Link } from 'react-router';

//로고, 스터디만들기 헤더 고정 //스터디만들기 링크는 홈페이지에서만 보이게 하고 싶음
const Header = () => {
  return (
  <header className={TemplateStyles.navbar}>
    <Link to='/'>
      <img src={logo} alt="로고" width="135" />
    </Link>
    <Link to='/enrollment' className={styles.button}>스터디 만들기</Link>
  </header>
  );
};

export default Header;
