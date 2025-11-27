import React from 'react';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import InputHabit from './InputHabit';
import icDelete from '../../assets/images/icons/ic_delete.svg';


const HabitList = ({ habits = [], onDeleteHabit, onCancelHabit, onAddHabit }) => {
  return (
    <div className={styles.inputHabit}>
      <div className={styles.habitListContainer}>
        {/* Display existing habits */}
        {habits.map(habit => (
          <div key={habit.id} className={styles.habitItemWrapper}>
            <div className={styles.habitListItem}>
              <span className={styles.habitName}>{habit.name}</span>
            </div>
            <div className={styles.deleteIconContainer}>
              <img
                src={icDelete}
                alt="delete"
                className={styles.deleteIcon}
                onClick={() => onDeleteHabit && onDeleteHabit(habit.id)} />
            </div>
          </div>
        ))}
        
        {/* Input form for adding new habit at the bottom */}
        <InputHabit onAddHabit={onAddHabit} />
      </div>
    </div>
  );
};

export default HabitList;