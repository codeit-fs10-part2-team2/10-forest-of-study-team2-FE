import React, { useState } from 'react';
import styles from '../../pages/ViewStudyDetails/ViewStudyDetails.module.css';
import InputText from '../UI/InputText/InputText';

const InputHabit = ({ onAddHabit }) => {
    const [habitName, setHabitName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handlePlaceholderClick = () => {
        setIsAdding(true);
    };

    const handleAdd = () => {   // add habit
        if (habitName.trim() && onAddHabit) {
            onAddHabit(habitName);
            setHabitName('');
            setIsAdding(false);
        }
    };

    // add habit button click
    const handleAddButtonClick = () => {
        if (isAdding) {
            handleAdd();
        } else {
            setIsAdding(true);
        }
    };

    if (isAdding) {
        return (
            <div className={styles.habitInputForm}>
                <div className={styles.habitInputWrapper}>
                    <InputText 
                        value={habitName} 
                        onChange={(e) => setHabitName(e.target.value)} 
                        placeholder="습관 이름을 입력해 주세요"
                    />
                </div>
                <div className={styles.habitAddButton} onClick={handleAddButtonClick}>
                    +
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.habitAddButton} onClick={handleAddButtonClick}>
                +
            </div>
        </>
    );
}

export default InputHabit;