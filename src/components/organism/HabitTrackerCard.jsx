import React from 'react';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import Sticker from '../UI/Sticker/Sticker';

const HabitTrackerCard = ({ habits = [], days = [], studyId }) => {
  const reversedHabits = [...habits].reverse();

<<<<<<< HEAD
=======
  const convertFrontendDayToDbDay = (frontendDayIndex) => {
    const converted = (frontendDayIndex + 1) % 7;
    return converted;
  };

>>>>>>> taetae
    return (
        <>
        <div className={styles.habitTrackerCard}>
            <h2 className={styles.cardTitle}>습관 기록표</h2>
            <div className={styles.habitGrid}>
                <div className={styles.gridHeader}>
                    <div className={styles.habitHeaderCell}></div>
                    {days.map((day, index) => (
                        <div key={index} className={styles.dayHeaderCell}>
                        {day}
                        </div>
                    ))}
                    </div>
                    {reversedHabits.map(habit => (
                    <div key={habit.id} className={styles.habitRow}>
                        <div className={styles.habitNameCell}>{habit.name}</div>
<<<<<<< HEAD
                        {days.map((_day, dayIndex) => (
                        <div
                            key={dayIndex} 
                            className={styles.habitCell}
                        >
                            <Sticker 
                            completed={habit.completed.includes(dayIndex)}
                            className={habit.completed.includes(dayIndex) ? styles.completed : styles.incomplete}
                            />
                        </div>
                        ))}
=======
                        {days.map((_day, dayIndex) => {
                          const dbDayIndex = convertFrontendDayToDbDay(dayIndex);
                          const isCompleted = habit.completed.includes(dbDayIndex);
                          return (
                            <div
                              key={dayIndex} 
                              className={styles.habitCell}
                            >
                              <Sticker 
                                completed={isCompleted}
                                className={isCompleted ? styles.completed : styles.incomplete}
                              />
                            </div>
                          );
                        })}
>>>>>>> taetae
                    </div>
                    ))}
            </div>
        </div>
    </>
  )
}

export default HabitTrackerCard;