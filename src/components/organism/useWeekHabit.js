import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';
import useHabitByStudyId from './useHabitByStudyId';

const useWeekHabit = (studyId) => {
  const { loading: studyLoading, viewStudyDetailTitle } = useHabitByStudyId(studyId);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);

  // Fetch week's habits data from API
  useEffect(() => {
    const fetchWeekHabitsData = async () => {
      if (!studyId) {
        console.log(`useWeekHabit: no studyId provided: ${studyId}`);
        setLoading(false);
        return;
      }
      
      console.log(`useWeekHabit: fetching week's habits data, API endpoint: ${API_ENDPOINTS.HABITS.GET_WEEK(studyId)}`);
      
      try {
        setLoading(true);
        
        // Fetch week's habits
        try {
          console.log(`useWeekHabit: fetching week's habits, API endpoint: ${API_ENDPOINTS.HABITS.GET_WEEK(studyId)}`);
          const weekHabitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_WEEK(studyId));
          console.log(`useWeekHabit: week's habits response:`, weekHabitsResponse.data);
          const todayHabitsResponseData = todayHabitsResponse.data || {};
          
          // Handle different API response formats
          let habitsData = [];
          if (todayHabitsResponseData.success && Array.isArray(todayHabitsResponseData.data)) {
            habitsData = weekHabitsResponseData.data;
          } else if (Array.isArray(weekHabitsResponseData)) {
            habitsData = weekHabitsResponseData;
          } else if (weekHabitsResponseData.habits && Array.isArray(weekHabitsResponseData.habits)) {
            habitsData = weekHabitsResponseData.habits;
          } else if (weekHabitsResponseData.data && Array.isArray(weekHabitsResponseData.data)) {
            habitsData = weekHabitsResponseData.data;
          }
          
          // Only show week's habits (no fallback to GET_BY_STUDY)
          // If empty, it means no habits were created for week
          console.log(`useWeekHabit: GET_WEEK returned ${habitsData.length} habits for week`);
          
          // Transform habits data to match component format
          const transformedHabits = habitsData.map(habit => ({
            id: String(habit.habit_pk || habit.id || habit.habitId),
            name: habit.habit_name || habit.name || habit.habitName || ''
          }));
          
          setHabits(transformedHabits);
          console.log(`useWeekHabit: week's habits data loading completed: ${JSON.stringify(transformedHabits)}`);
        } catch (habitsError) {
          console.warn(`useWeekHabit: week's habits loading failed (non-critical): ${habitsError.message}`);
          setHabits([]);
          // Don't throw - this is optional data
        }

      } catch (error) {
        console.error(`useWeekHabit: habits data loading failed: ${error}`);
        console.error(`useWeekHabit: error details: ${error.response?.data || error.message}`);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekHabitsData();
  }, [studyId]);

  // Function to refresh habits data
  const refreshHabits = async () => {
    if (!studyId) return;
    
    try {
      console.log(`useWeekHabit: refreshing habits, API: ${API_ENDPOINTS.HABITS.GET_WEEK(studyId)}`);
      const weekHabitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_WEEK(studyId));
      console.log(`useWeekHabit: refresh response:`, weekHabitsResponse.data);
      const weekHabitsResponseData = weekHabitsResponse.data || {};
      
      let habitsData = [];
      if (weekHabitsResponseData.success && Array.isArray(weekHabitsResponseData.data)) {
        habitsData = weekHabitsResponseData.data;
      } else if (Array.isArray(weekHabitsResponseData)) {
        habitsData = weekHabitsResponseData;
      } else if (weekHabitsResponseData.habits && Array.isArray(weekHabitsResponseData.habits)) {
        habitsData = weekHabitsResponseData.habits;
      } else if (weekHabitsResponseData.data && Array.isArray(weekHabitsResponseData.data)) {
        habitsData = weekHabitsResponseData.data;
      }
      
      console.log(`useWeekHabit: parsed habitsData:`, habitsData);
      
      // 빈 배열이면 업데이트하지 않음 (이전 값 유지)
      if (habitsData.length === 0) {
        console.log(`useWeekHabit: refresh returned empty array, keeping existing habits`);
        return;
      }
      
      const transformedHabits = habitsData.map(habit => ({
        id: String(habit.habit_pk || habit.id || habit.habitId),
        name: habit.habit_name || habit.name || habit.habitName || ''
      }));
      
      console.log(`useWeekHabit: transformed habits:`, transformedHabits);
      setHabits(transformedHabits);
    } catch (error) {
      console.error(`useWeekHabit: refresh habits failed: ${error}`);
      console.error(`useWeekHabit: error details:`, error.response?.data || error.message);
    }
  };

  // Function to set habits directly from saved data
  // Can accept both raw API response format and already transformed format
  const setHabitsFromSaved = (savedHabits) => {
    if (!savedHabits || !Array.isArray(savedHabits)) return;
    
    // Check if habits are already in transformed format (have id and name properties)
    const isTransformed = savedHabits.length === 0 || (savedHabits[0].id !== undefined && savedHabits[0].name !== undefined);
    
    let transformedHabits;
    if (isTransformed) {
      // Already transformed, use as is
      transformedHabits = savedHabits;
    } else {
      // Need transformation from API format
      transformedHabits = savedHabits.map(habit => ({
        id: String(habit.habit_pk || habit.id || habit.habitId),
        name: habit.habit_name || habit.name || habit.habitName || ''
      }));
    }
    
    console.log(`useWeekHabit: setting habits from saved data:`, transformedHabits);
    setHabits(transformedHabits);
  };

  return {
    loading: loading || studyLoading,
    viewStudyDetailTitle,
    habits,
    refreshHabits,
    setHabitsFromSaved,
  };
};

export default useWeekHabit;

