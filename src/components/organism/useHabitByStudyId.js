import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';

const useHabitByStudyId = (studyId) => {
  const [loading, setLoading] = useState(true);
  const [viewStudyDetailTitle, setViewStudyDetailTitle] = useState('');
  const [habits, setHabits] = useState([]);

  // Fetch study information and habits by studyId
  useEffect(() => {
    const fetchStudyData = async () => {
      if (!studyId) {
        console.log(`useHabitByStudyId: no studyId provided: ${studyId}`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch study information to get title
        console.log(`useHabitByStudyId: fetching study information, API: ${API_ENDPOINTS.STUDIES.GET_BY_ID(studyId)}`);
        const studyResponse = await axiosInstance.get(API_ENDPOINTS.STUDIES.GET_BY_ID(studyId));
        console.log(`useHabitByStudyId: study information response:`, studyResponse.data);
        const responseData = studyResponse.data;
        
        // Handle different API response formats
        const studyData = responseData.data || responseData;
        
        // Set study title
        setViewStudyDetailTitle(studyData.study_name || '');
        
        // Fetch habits by studyId
        try {
          console.log(`useHabitByStudyId: fetching habits, API: ${API_ENDPOINTS.HABITS.GET_BY_STUDY(studyId)}`);
          const habitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_BY_STUDY(studyId));
          console.log(`useHabitByStudyId: habits response:`, habitsResponse.data);
          const habitsResponseData = habitsResponse.data || {};
          
          // Handle different API response formats
          let habitsData = [];
          if (habitsResponseData.success && Array.isArray(habitsResponseData.data)) {
            habitsData = habitsResponseData.data;
          } else if (Array.isArray(habitsResponseData)) {
            habitsData = habitsResponseData;
          } else if (habitsResponseData.habits && Array.isArray(habitsResponseData.habits)) {
            habitsData = habitsResponseData.habits;
          } else if (habitsResponseData.data && Array.isArray(habitsResponseData.data)) {
            habitsData = habitsResponseData.data;
          }
          
          // Transform habits data to match component format
          const transformedHabits = habitsData.map(habit => ({
            id: String(habit.habit_pk || habit.id || habit.habitId),
            name: habit.habit_name || habit.name || habit.habitName || ''
          }));
          
          setHabits(transformedHabits);
          console.log(`useHabitByStudyId: habits data loading completed: ${JSON.stringify(transformedHabits)}`);
        } catch (habitsError) {
          console.warn(`useHabitByStudyId: habits loading failed (non-critical): ${habitsError.message}`);
          setHabits([]);
        }
      } catch (error) {
        console.error(`useHabitByStudyId: study data loading failed: ${error}`);
        console.error(`useHabitByStudyId: error details: ${error.response?.data || error.message}`);
        // Set default values on error
        setViewStudyDetailTitle('스터디 정보를 불러올 수 없습니다');
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();
  }, [studyId]);

  return {
    loading,
    viewStudyDetailTitle,
    habits,
  };
};

export default useHabitByStudyId;

