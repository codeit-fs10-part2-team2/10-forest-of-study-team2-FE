import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import API_ENDPOINTS from '../../utils/apiEndpoints';


const DEFAULT_INTRODUCTION = '새로운 스터디에 오신 것을 환영합니다!';

const useStudyCreation = () => {
  const navigate = useNavigate();

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    nickName: '',
    studyName: '',
    introduction: DEFAULT_INTRODUCTION,
    thumbNail: 'thumbnail0',
    password: '',
    passwordConfirm: ''
  });

  //비밀번호 표시 여부
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm: false
  });

  //공통. 에러 및 input 터치 상태
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // input 값 변경
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // input blur 시 검증
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    const value = formData[field].trim();

    // 빈 값 체크
    if (!value) {
      setErrors(prev => ({ ...prev, [field]: true }));
      return;
    }

    // 비밀번호 확인 체크
    if (field === 'passwordConfirm' && value !== formData.password) {
      setErrors(prev => ({ ...prev, passwordConfirm: true }));
      return;
    }

    // 에러 해제
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  // 비밀번호 보기/숨기기
  const togglePassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  //폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 목록
    const requiredFields = ['nickName', 'studyName', 'password', 'passwordConfirm'];

    // 모든 필드 체크
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

    // 비밀번호 일치 체크
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
      
      const response = await axiosInstance.post(
        API_ENDPOINTS.STUDIES.CREATE,
        submitData
      );
      
      console.log('스터디 생성 성공:', response.data);
      navigate('/');  // 홈으로 이동
      
    } catch (error) {
      console.error('스터디 생성 실패:', error);
      alert('스터디 생성에 실패했습니다. 다시 시도해주세요.');
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