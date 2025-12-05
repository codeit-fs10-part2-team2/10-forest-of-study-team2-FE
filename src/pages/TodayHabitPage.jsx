import React from 'react';
import { memo } from 'react';
import TodayHabitTemplate from '../template/TodayHabitTemplate';

//오늘의 습관 페이지
const TodayHabitPage = () => {
const TodayHabitPage = memo(() => {
  return (
    <TodayHabitTemplate />
  );
});

TodayHabitPage.displayName = 'TodayHabitPage';
}
export default TodayHabitPage;