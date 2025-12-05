import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import API_ENDPOINTS from '../utils/apiEndpoints';
<<<<<<< HEAD
=======
import useToast from './useToast';
>>>>>>> taetae


const useStudyCreation = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const { showSuccess, showError } = useToast();
>>>>>>> taetae

  const [formData, setFormData] = useState({
    nickName: '',
    studyName: '',
    introduction: '',
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

  const validatePassword = (password) => {
    if (!password) return false;
    if (password.length < 8) return false;
    if (!/\d/.test(password)) return false;
    return true;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    const value = formData[field].trim();

    if (!value) {
      setErrors(prev => ({ ...prev, [field]: true }));
      return;
    }

    if (field === 'password' || field === 'passwordConfirm') {
      if (!validatePassword(value)) {
        setErrors(prev => ({ ...prev, [field]: true }));
        return;
      }
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

    if (!validatePassword(formData.password)) {
      newErrors.password = true;
      hasError = true;
    }

    if (!validatePassword(formData.passwordConfirm)) {
      newErrors.passwordConfirm = true;
      hasError = true;
    }

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
        study_introduction: formData.introduction,
        password: formData.password,
        background: background
      };
      
      await axiosInstance.post(
        API_ENDPOINTS.STUDIES.CREATE,
        submitData
      );
      
<<<<<<< HEAD
      navigate('/');
      
    } catch (error) {
      alert('스터디 생성에 실패했습니다. 다시 시도해주세요.');
=======
      showSuccess('스터디가 성공적으로 만들어졌습니다.');
      navigate('/');
      
    } catch (error) {
      showError('에러가 발생해 실패했습니다.');
>>>>>>> taetae
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

export default useStudyCreation;

