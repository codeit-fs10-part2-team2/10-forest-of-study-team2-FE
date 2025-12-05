import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import API_ENDPOINTS from '../utils/apiEndpoints';

const useHabitByStudyId = (studyId) => {
  const [loading, setLoading] = useState(true);
  const [viewStudyDetailTitle, setViewStudyDetailTitle] = useState('');
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchStudyData = async () => {
      if (!studyId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const studyResponse = await axiosInstance.get(API_ENDPOINTS.STUDIES.GET_BY_ID(studyId));
        const responseData = studyResponse.data;
        const studyData = responseData.data || responseData;
        
        setViewStudyDetailTitle(studyData.study_name || '');
        
        try {
          const habitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_BY_STUDY(studyId));
          const habitsResponseData = habitsResponse.data || {};
          
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
          
          const transformedHabits = habitsData.map(habit => ({
            habit_pk: habit.habit_pk || habit.id || habit.habitId,
            id: String(habit.habit_pk || habit.id || habit.habitId),
            name: habit.habit_name || habit.name || habit.habitName || ''
          }));
          
          setHabits(transformedHabits);
        } catch (habitsError) {
          setHabits([]);
        }
      } catch (error) {
        setViewStudyDetailTitle('스터디 정보를 불러올 수 없습니다');
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();
  }, [studyId]);

  const refreshHabits = async () => {
    if (!studyId) return [];
    
    try {
      setLoading(true);
      const habitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_BY_STUDY(studyId));
      const habitsResponseData = habitsResponse.data || {};
      
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
      
      const transformedHabits = habitsData.map(habit => ({
        habit_pk: habit.habit_pk || habit.id || habit.habitId,
        id: String(habit.habit_pk || habit.id || habit.habitId),
        name: habit.habit_name || habit.name || habit.habitName || ''
      }));
      
      setHabits(transformedHabits);
      return transformedHabits;
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    viewStudyDetailTitle,
    habits,
    refreshHabits,
  };
};

export default useHabitByStudyId;

