import styles from '../../styles/Input.module.css';

//더보기 버튼
const LoadMoreButton = ({ onClick }) => {
  return (
    <>
      <button className={`${styles.input} ${styles.LoadMoreButton}`} onClick={onClick}>더보기</button>
    </>
  );
};

export default LoadMoreButton;