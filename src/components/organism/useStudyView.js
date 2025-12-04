import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';
import useHabit from './useHabit';

const useStudyView = (studyId) => {
  const navigate = useNavigate();

  // Use habit hook
  const { habits } = useHabit(studyId);

  // State for study data
  const [viewStudyDetailTitle, setViewStudyDetailTitle] = useState('');
  const [studyDescription, setStudyDescription] = useState('');
  const [points, setPoints] = useState(0);
  const [emojiMetrics, setEmojiMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldWrap, setShouldWrap] = useState(false);
  const [showDeleteStudyModal, setShowDeleteStudyModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showEditStudyModal, setShowEditStudyModal] = useState(false);
  const [editPassword, setEditPassword] = useState('');

  // Fetch study data from API
  useEffect(() => {
    const fetchStudyData = async () => {
      if (!studyId) {
        console.log('useStudyView: no studyId provided');
        return;
      }
      
      console.log('useStudyView: fetching data, studyId:', studyId);
      
      try {
        setLoading(true);
        
        // Fetch study information
        console.log('useStudyView: fetching study information, API:', API_ENDPOINTS.STUDIES.GET_BY_ID(studyId));
        const studyResponse = await axiosInstance.get(API_ENDPOINTS.STUDIES.GET_BY_ID(studyId));
        console.log('useStudyView: study information response:', studyResponse.data);
        const responseData = studyResponse.data;
        
        // Handle different API response formats
        // API response is in {success: true, data: {...}} format
        const studyData = responseData.data || responseData;
        
        // Set study data
        setViewStudyDetailTitle(studyData.study_name || '');
        setStudyDescription(studyData.study_introduction || '');
        setPoints(studyData.point_sum || 0);

        // Fetch emoji metrics
        console.log('useStudyView: fetching emoji metrics, API:', API_ENDPOINTS.EMOJIS.GET_BY_STUDY(studyId));
        const emojisResponse = await axiosInstance.get(API_ENDPOINTS.EMOJIS.GET_BY_STUDY(studyId));
        console.log('useStudyView: emoji metrics response:', emojisResponse.data);
        const emojisResponseData = emojisResponse.data || {};
        
        // Handle different API response formats
        // API response is in {success: true, data: [...]} format
        let emojisData = [];
        if (emojisResponseData.success && Array.isArray(emojisResponseData.data)) {
          emojisData = emojisResponseData.data;
        } else if (Array.isArray(emojisResponseData)) {
          emojisData = emojisResponseData;
        } else if (emojisResponseData.emojis && Array.isArray(emojisResponseData.emojis)) {
          emojisData = emojisResponseData.emojis;
        } else if (emojisResponseData.data && Array.isArray(emojisResponseData.data)) {
          emojisData = emojisResponseData.data;
        }
        
        // Transform emojis data to match component format
        const transformedEmojis = emojisData.map(emoji => ({
          emoji: emoji.emoji || emoji.icon,
          count: emoji.count || emoji.value || 0
        }));
        setEmojiMetrics(transformedEmojis);

        console.log('useStudyView: all data loading completed');

      } catch (error) {
        console.error('useStudyView: study data loading failed:', error);
        console.error('useStudyView: error details:', error.response?.data || error.message);
        console.error('useStudyView: error status:', error.response?.status);
        console.error('useStudyView: error config:', error.config);
        
        // Check if it's a network/CORS error
        if (error.code === 'ERR_NETWORK' || !error.response) {
          console.error('useStudyView: Network or CORS error detected. Check backend CORS settings and network connectivity.');
        }
        
        // Set default values on error
        setViewStudyDetailTitle('Study name is not available');
        setStudyDescription('');
        setPoints(0);
        setEmojiMetrics([]);
      } finally {
        setLoading(false);
        console.log('useStudyView: loading completed');
      }
    };

    fetchStudyData();
  }, [studyId]);

  // Enable wrap when button count is 4 or more
  useEffect(() => {
    setShouldWrap(emojiMetrics.length >= 4);
  }, [emojiMetrics]);

  const handleEmojiSelect = (emoji) => {
    setEmojiMetrics(prevMetrics => {
      const existingIndex = prevMetrics.findIndex(item => item.emoji === emoji);
      if (existingIndex > -1) {
        const updated = [...prevMetrics];   
        updated[existingIndex] = {       
          ...updated[existingIndex],
          count: updated[existingIndex].count + 1,
        };
        return updated;
      }
      return [...prevMetrics, { emoji, count: 1 }];
    });
  };

  const handleDeleteStudy = () => {
    navigate('/');
  };

  const handleEditStudy = () => {
    navigate(`/enrollment/${studyId}`);
  };

  return {
    viewStudyDetailTitle,
    studyDescription,
    habits,
    points,
    emojiMetrics,
    loading,
    shouldWrap,
    showDeleteStudyModal,
    setShowDeleteStudyModal,
    deletePassword,
    setDeletePassword,
    showEditStudyModal,
    setShowEditStudyModal,
    editPassword,
    setEditPassword,
    handleEmojiSelect,
    handleDeleteStudy,
    handleEditStudy,
  };
};

export default useStudyView;

