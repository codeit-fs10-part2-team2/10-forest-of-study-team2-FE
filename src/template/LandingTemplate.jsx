import styles from '../styles/Template.module.css';
import RecentStudy from '../components/organism/RecentStudy';
import StudyList from '../components/organism/StudyList';
import users from '../users.json'

const LandingTemplate = ({ studies }) => {
  const studiesData = studies || users;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <RecentStudy studies={studiesData.slice(0, 3)} />
      </div>
      <div className={styles.container}>
        <StudyList studies={studiesData} />
      </div>
    </div>
  );
};

export default LandingTemplate;