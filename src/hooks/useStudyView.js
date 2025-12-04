import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import API_ENDPOINTS from '../utils/apiEndpoints';
import useHabit from './useHabit';

const useStudyView = (studyId) => {
  const navigate = useNavigate();
  const { habits } = useHabit(studyId);
  const [viewStudyDetailTitle, setViewStudyDetailTitle] = useState('');
  const [studyIntroduction, setStudyIntroduction] = useState('');
  const [points, setPoints] = useState(0);
  const [emojiMetrics, setEmojiMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldWrap, setShouldWrap] = useState(false);
  const [showDeleteStudyModal, setShowDeleteStudyModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showEditStudyModal, setShowEditStudyModal] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [studyPassword, setStudyPassword] = useState('');

  useEffect(() => {
    const fetchStudyData = async () => {
      if (!studyId) {
        return;
      }
      
      try {
        setLoading(true);
        
        const studyResponse = await axiosInstance.get(API_ENDPOINTS.STUDIES.GET_BY_ID(studyId));
        const responseData = studyResponse.data;
        const studyData = responseData.data || responseData;
        
        setViewStudyDetailTitle(studyData.study_name || '');
        setStudyIntroduction(studyData.study_introduction || '');
        setPoints(studyData.point_sum || 0);
        if (studyData.password) {
          setStudyPassword(studyData.password);
        }

        const emojisResponse = await axiosInstance.get(API_ENDPOINTS.EMOJIS.GET_BY_STUDY(studyId));
        const emojisResponseData = emojisResponse.data || {};
        
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
        
        const transformedEmojis = emojisData.map(emoji => ({
          emojiId: emoji.emoji_id,
          emoji: emoji.emoji_name || emoji.emoji || emoji.icon || '',
          count: emoji.emoji_hit || emoji.count || emoji.value || 0
        }));
        
        const sortedEmojis = [...transformedEmojis].sort((a, b) => b.count - a.count);
        setEmojiMetrics(sortedEmojis);

      } catch (error) {
        setViewStudyDetailTitle('Study name is not available');
        setStudyIntroduction('');
        setPoints(0);
        setEmojiMetrics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();
  }, [studyId]);

  useEffect(() => {
    setShouldWrap(emojiMetrics.length >= 4);
  }, [emojiMetrics]);

  const lastClickTimeRef = useRef({});

  const handleEmojiClick = async (emojiId) => {
    const now = Date.now();
    const lastClick = lastClickTimeRef.current[emojiId] || 0;
    
    if (now - lastClick < 1000) {
      return;
    }
    
    lastClickTimeRef.current[emojiId] = now;
    
    let previousMetrics = [];
    setEmojiMetrics(prevMetrics => {
      previousMetrics = [...prevMetrics];
      const updated = prevMetrics.map(item => {
        if (item.emojiId === emojiId) {
          return {
            ...item,
            count: item.count + 1
          };
        }
        return item;
      });
      
      return updated.sort((a, b) => b.count - a.count);
    });
    
    try {
      await axiosInstance.post(API_ENDPOINTS.EMOJIS.INCREMENT(emojiId));
    } catch (error) {
      setEmojiMetrics(previousMetrics);
      lastClickTimeRef.current[emojiId] = 0;
    }
  };

  const handleEmojiSelect = async (emoji) => {
    if (!studyId) {
      return;
    }

    try {
      const emojisResponse = await axiosInstance.get(API_ENDPOINTS.EMOJIS.GET_BY_STUDY(studyId));
      const emojisResponseData = emojisResponse.data || {};
      
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
      
      const existingEmoji = emojisData.find(item => 
        (item.emoji_name || item.emoji || item.icon || '') === emoji
      );
      
      if (existingEmoji) {
        await handleEmojiClick(existingEmoji.emoji_id);
        return;
      }

      const newEmoji = {
        emojiId: null,
        emoji: emoji,
        count: 1
      };
      
      let previousMetrics = [];
      setEmojiMetrics(prevMetrics => {
        previousMetrics = [...prevMetrics];
        const updated = [...prevMetrics, newEmoji];
        return updated.sort((a, b) => b.count - a.count);
      });

      const response = await axiosInstance.post(API_ENDPOINTS.EMOJIS.CREATE, {
        study_id: parseInt(studyId, 10),
        emoji_name: emoji,
        emoji_hit: 1
      });
      
      const updatedEmojisResponse = await axiosInstance.get(API_ENDPOINTS.EMOJIS.GET_BY_STUDY(studyId));
      const updatedEmojisResponseData = updatedEmojisResponse.data || {};
      
      let updatedEmojisData = [];
      if (updatedEmojisResponseData.success && Array.isArray(updatedEmojisResponseData.data)) {
        updatedEmojisData = updatedEmojisResponseData.data;
      } else if (Array.isArray(updatedEmojisResponseData)) {
        updatedEmojisData = updatedEmojisResponseData;
      } else if (updatedEmojisResponseData.emojis && Array.isArray(updatedEmojisResponseData.emojis)) {
        updatedEmojisData = updatedEmojisResponseData.emojis;
      } else if (updatedEmojisResponseData.data && Array.isArray(updatedEmojisResponseData.data)) {
        updatedEmojisData = updatedEmojisResponseData.data;
      }
      
      const transformedEmojis = updatedEmojisData.map(emojiItem => ({
        emojiId: emojiItem.emoji_id,
        emoji: emojiItem.emoji_name || emojiItem.emoji || emojiItem.icon || '',
        count: emojiItem.emoji_hit || emojiItem.count || emojiItem.value || 0
      }));
      
      const sortedEmojis = [...transformedEmojis].sort((a, b) => b.count - a.count);
      setEmojiMetrics(sortedEmojis);
      
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        try {
          const emojisResponse = await axiosInstance.get(API_ENDPOINTS.EMOJIS.GET_BY_STUDY(studyId));
          const emojisResponseData = emojisResponse.data || {};
          
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
          
          const existingEmoji = emojisData.find(item => 
            (item.emoji_name || item.emoji || item.icon || '') === emoji
          );
          
          if (existingEmoji) {
            await handleEmojiClick(existingEmoji.emoji_id);
            return;
          }
        } catch (fetchError) {
        }
      }
      
      setEmojiMetrics(previousMetrics);
    }
  };

  const handleDeleteStudy = async () => {
    if (!studyId) {
      alert('스터디 ID가 없습니다.');
      return;
    }

    if (!deletePassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (studyPassword && deletePassword !== studyPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      setDeletePassword('');
      return;
    }

    try {
      await axiosInstance.delete(
        API_ENDPOINTS.STUDIES.DELETE(studyId),
        {
          data: {
            password: deletePassword
          }
        }
      );
      
      alert('스터디가 삭제되었습니다.');
      setShowDeleteStudyModal(false);
      setDeletePassword('');
      navigate('/');
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('비밀번호가 일치하지 않습니다.');
        setDeletePassword('');
      } else {
        alert('스터디 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleEditStudy = () => {
    navigate(`/enrollment/${studyId}`);
  };

  return {
    viewStudyDetailTitle,
    studyIntroduction,
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
    handleEmojiClick,
    handleDeleteStudy,
    handleEditStudy,
  };
};

export default useStudyView;

