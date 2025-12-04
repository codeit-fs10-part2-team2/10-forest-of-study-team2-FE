import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';

const useHabit = (studyId) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!studyId) {
        console.log('useHabit: no studyId provided');
        setHabits([]);
        return;
      }

      console.log('useHabit: fetching habits data, studyId:', studyId);

      try {
        setLoading(true);
        
        // Fetch habits with week data
        console.log('useHabit: fetching habits data, API:', API_ENDPOINTS.HABITS.GET_WEEK(studyId));
        const habitsResponse = await axiosInstance.get(API_ENDPOINTS.HABITS.GET_WEEK(studyId));
        console.log('useHabit: habits data response:', habitsResponse.data);
        const habitsResponseData = habitsResponse.data || {};
        
        // Handle different API response formats
        // API response is in {success: true, data: [...]} format
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
        // Assuming API returns habits with fulfillments array
        const transformedHabits = habitsData.map(habit => {
          // Calculate completed days (0=월, 1=화, ..., 6=일)
          // Assuming fulfillments have date or dayOfWeek field
          const completed = [];
          if (habit.fulfillments) {
            habit.fulfillments.forEach(fulfillment => {
              // If fulfillment has dayOfWeek (0-6), add to completed
              // If fulfillment has date, calculate dayOfWeek
              if (fulfillment.dayOfWeek !== undefined) {
                if (!completed.includes(fulfillment.dayOfWeek)) {
                  completed.push(fulfillment.dayOfWeek);
                }
              }
            });
          }
          
          return {
            id: habit.id,
            name: habit.name || habit.habitName,
            completed: completed
          };
        });
        setHabits(transformedHabits);
        console.log('useHabit: transformed habits data:', transformedHabits);
      } catch (error) {
        console.error('useHabit: habits data loading failed:', error);
        console.error('useHabit: error details:', error.response?.data || error.message);
        console.error('useHabit: error status:', error.response?.status);
        console.error('useHabit: error config:', error.config);
        
        // Check if it's a network/CORS error
        if (error.code === 'ERR_NETWORK' || !error.response) {
          console.error('useHabit: Network or CORS error detected. Check backend CORS settings and network connectivity.');
        } else if (error.response?.status === 403) {
          console.error('useHabit: 403 Forbidden - This might be a CORS issue. Check backend CORS settings.');
        }
        
        setHabits([]);
      } finally {
        setLoading(false);
        console.log('useHabit: loading completed');
      }
    };

    fetchHabits();
  }, [studyId]);

  return {
    habits,
    loading,
  };
};

export default useHabit;

