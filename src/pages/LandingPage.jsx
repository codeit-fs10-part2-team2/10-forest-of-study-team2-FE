import LandingTemplate from '../template/LandingTemplate';
import users from '../users.json';
import useGetRequestHandler from '../utils/useGetRequestHandler';
import API_ENDPOINTS from '../utils/apiEndpoints';

const LandingPage = () => {
  const { data, loading, error } = useGetRequestHandler(API_ENDPOINTS.STUDIES.GET_ALL, {
    enabled: false, // API 호출 비활성화
    onSuccess: (data) => {
      console.log('Studies fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch studies:', error);
    },
  });

  if (loading) {
    console.log('Loading studies...');
  }

  if (error) {
    console.error('Error loading studies:', error);
  }

  if (data) {
    console.log('Studies data:', data);
  }

  return (
    <LandingTemplate users={users} />
  );
};

export default LandingPage;