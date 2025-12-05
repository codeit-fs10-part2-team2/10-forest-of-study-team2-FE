import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import API_ENDPOINTS from '../utils/apiEndpoints';
import useToast from './useToast';


const DEFAULT_INTRODUCTION = '입력된 소개 멘트가 없습니다.';

const useStudyModification = (studyId) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    nickName: '',
    studyName: '',
    introduction: DEFAULT_INTRODUCTION,
    thumbNail: 'thumbnail0',
    password: '',
    passwordConfirm: ''
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm: false
  });

  const [errors, setErrors] = useState({});
  const [touched,     setTouched] = useState({});

  useEffect(() => {
    if (studyId) {
      const fetchStudyData = async () => {
        try {
          const response = await axiosInstance.get(API_ENDPOINTS.STUDIES.GET_BY_ID(studyId));
          const responseData = response.data;
          const studyData = responseData.data || responseData;
          setFormData({
            nickName: studyData.nickname || '',
            studyName: studyData.study_name || '',
            introduction: studyData.study_introduction || DEFAULT_INTRODUCTION,
            thumbNail: studyData.background !== undefined ? `thumbnail${studyData.background}` : 'thumbnail0',
            password: '',
            passwordConfirm: ''
          });
        } catch (error) {
        }
      };
      fetchStudyData();
    }
  }, [studyId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    const value = formData[field].trim();

    if (!value) {
      setErrors(prev => ({ ...prev, [field]: true }));
      return;
    }

    if (field === 'passwordConfirm' && value !== formData.password) {
      setErrors(prev => ({ ...prev, passwordConfirm: true }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const togglePassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['nickName', 'studyName', 'password', 'passwordConfirm'];

    let hasError = false;
    const newErrors = {};
    const newTouched = {};

    requiredFields.forEach(field => {
      newTouched[field] = true;

      if (!formData[field].trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = true;
      hasError = true;
    }

    setTouched(newTouched);
    setErrors(newErrors);

    if (hasError) {
      return;
    }

    try {
      const backgroundNumber = formData.thumbNail.replace('thumbnail', '');
      const background = parseInt(backgroundNumber, 10);
      
      const submitData = {
        nickname: formData.nickName,
        study_name: formData.studyName,
        study_introduction: formData.introduction || '',
        password: formData.password,
        background: background
      };
      
      await axiosInstance.put(
        API_ENDPOINTS.STUDIES.UPDATE(studyId),
        submitData
      );
      
      showSuccess('스터디가 성공적으로 수정되었습니다.');
      navigate(`/detail/${studyId}`);
      
    } catch (error) {
      showError('에러가 발생해 실패했습니다.');
    }
  };

  return {
    formData,
    showPassword,
    errors,
    touched,
    handleChange,
    handleBlur,
    togglePassword,
    handleSubmit
  };
};

export default useStudyModification;

