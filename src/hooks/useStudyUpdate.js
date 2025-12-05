import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import API_ENDPOINTS from '../utils/apiEndpoints';


const DEFAULT_INTRODUCTION = '새로운 스터디에 오신 것을 환영합니다!';

const useStudyUpdate = ( studyId ) => {
  const navigate = useNavigate();

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
  const [touched, setTouched] = useState({});

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
      const { passwordConfirm, ...submitData } = formData;
      
      const response = await axiosInstance.put(
        API_ENDPOINTS.STUDIES.UPDATE(studyId),
        submitData
      );
      
      console.log('useStudyUpdate: study update successful:', response.data);
      navigate(`/detail/${studyId}`);
      
    } catch (error) {
      console.error('useStudyUpdate: study update failed:', error);
      console.error('useStudyUpdate: error details:', error.response?.data || error.message);
      alert('useStudyUpdate: study update failed. Please try again.');
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
export default useStudyUpdate;

