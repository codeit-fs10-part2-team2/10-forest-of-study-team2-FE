import styles from '../styles/Template.module.css';
import RecentStudy from '../components/organism/RecentStudy';
import StudyList from '../components/organism/StudyList';

const LandingTemplate = ({ users }) => {
  const studies = users?.data || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <RecentStudy studies={studies.slice(0, 3)} />
      </div>
      <div className={styles.container}>
        <StudyList studies={studies} />
      </div>
    </div>
  );
};

export default LandingTemplate;