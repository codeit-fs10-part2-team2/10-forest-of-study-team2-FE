import React, { useState } from 'react';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import InputHabit from './InputHabit';
import icDelete from '/assets/images/icons/ic_delete.svg';

/**
 * HabitList component that displays the list of habits
   updated by Taeyoung Seon, 11/27/2025
   InputHabit component is included
 */
const HabitList = ({ habits = [], onDeleteHabit, onCancelHabit, onAddHabit }) => {
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  const handleHabitClick = (habitId) => {
    setSelectedHabitId(habitId);
  };

  return (
    <div className={styles.inputHabit}>
      <div className={styles.habitListContainer}>
        {/* Display existing habits */}
        {habits.map(habit => (
          <div key={habit.id} className={styles.habitItemWrapper}>
            <div 
              className={`${styles.habitListItem} ${selectedHabitId === habit.id ? styles.habitListItemActive : ''}`}
              onClick={() => handleHabitClick(habit.id)}
            >
              <span className={styles.habitName}>{habit.name}</span>
            </div>
            <div className={styles.deleteIconContainer}>
              <img
                src={icDelete}
                alt="delete"
                className={styles.deleteIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteHabit && onDeleteHabit(habit.id);
                }} />
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