import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';
import useHabitByStudyId from './useHabitByStudyId';

const useTodayHabit = (studyId) => {
  const { loading: studyLoading, viewStudyDetailTitle } = useHabitByStudyId(studyId);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);

  // Fetch today's habits data from API
  useEffect(() => {
    const fetchTodayHabitsData = async () => {
      if (!studyId) {
        console.log(`useTodayHabit: no studyId provided: ${studyId}`);
        setLoading(false);
        return;
      }
      
      console.log(`useTodayHabit: fetching today's habits data, API endpoint: ${API_ENDPOINTS.HABITS.GET_TODAY(studyId)}`);
      
      try {
        setLoading(true);
        
        // Fetch today's habits
        try {
          console.log(`useTodayHabit: fetching today's habits, API endpoint: ${API_ENDPOINTS.HABITS.GET_TODAY(studyId)}`);
          const todayHabitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_TODAY(studyId));
          console.log(`useTodayHabit: today's habits response:`, todayHabitsResponse.data);
          const todayHabitsResponseData = todayHabitsResponse.data || {};
          
          // Handle different API response formats
          let habitsData = [];
          if (todayHabitsResponseData.success && Array.isArray(todayHabitsResponseData.data)) {
            habitsData = todayHabitsResponseData.data;
          } else if (Array.isArray(todayHabitsResponseData)) {
            habitsData = todayHabitsResponseData;
          } else if (todayHabitsResponseData.habits && Array.isArray(todayHabitsResponseData.habits)) {
            habitsData = todayHabitsResponseData.habits;
          } else if (todayHabitsResponseData.data && Array.isArray(todayHabitsResponseData.data)) {
            habitsData = todayHabitsResponseData.data;
          }
          
          // Only show today's habits (no fallback to GET_BY_STUDY)
          // If empty, it means no habits were created for today
          console.log(`useTodayHabit: GET_TODAY returned ${habitsData.length} habits for today`);
          
          // Transform habits data to match component format
          const transformedHabits = habitsData.map(habit => ({
            id: String(habit.habit_pk || habit.id || habit.habitId),
            name: habit.habit_name || habit.name || habit.habitName || ''
          }));
          
          setHabits(transformedHabits);
          console.log(`useTodayHabit: today's habits data loading completed: ${JSON.stringify(transformedHabits)}`);
        } catch (habitsError) {
          console.warn(`useTodayHabit: today's habits loading failed (non-critical): ${habitsError.message}`);
          setHabits([]);
          // Don't throw - this is optional data
        }

      } catch (error) {
        console.error(`useTodayHabit: habits data loading failed: ${error}`);
        console.error(`useTodayHabit: error details: ${error.response?.data || error.message}`);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayHabitsData();
  }, [studyId]);

  // Function to refresh habits data
  const refreshHabits = async () => {
    if (!studyId) return;
    
    try {
      console.log(`useTodayHabit: refreshing habits, API: ${API_ENDPOINTS.HABITS.GET_TODAY(studyId)}`);
      const todayHabitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_TODAY(studyId));
      console.log(`useTodayHabit: refresh response:`, todayHabitsResponse.data);
      const todayHabitsResponseData = todayHabitsResponse.data || {};
      
      let habitsData = [];
      if (todayHabitsResponseData.success && Array.isArray(todayHabitsResponseData.data)) {
        habitsData = todayHabitsResponseData.data;
      } else if (Array.isArray(todayHabitsResponseData)) {
        habitsData = todayHabitsResponseData;
      } else if (todayHabitsResponseData.habits && Array.isArray(todayHabitsResponseData.habits)) {
        habitsData = todayHabitsResponseData.habits;
      } else if (todayHabitsResponseData.data && Array.isArray(todayHabitsResponseData.data)) {
        habitsData = todayHabitsResponseData.data;
      }
      
      console.log(`useTodayHabit: parsed habitsData:`, habitsData);
      
      // 빈 배열이면 업데이트하지 않음 (이전 값 유지)
      if (habitsData.length === 0) {
        console.log(`useTodayHabit: refresh returned empty array, keeping existing habits`);
        return;
      }
      
      const transformedHabits = habitsData.map(habit => ({
        id: String(habit.habit_pk || habit.id || habit.habitId),
        name: habit.habit_name || habit.name || habit.habitName || ''
      }));
      
      console.log(`useTodayHabit: transformed habits:`, transformedHabits);
      setHabits(transformedHabits);
    } catch (error) {
      console.error(`useTodayHabit: refresh habits failed: ${error}`);
      console.error(`useTodayHabit: error details:`, error.response?.data || error.message);
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
    
    console.log(`useTodayHabit: setting habits from saved data:`, transformedHabits);
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

export default useTodayHabit;

