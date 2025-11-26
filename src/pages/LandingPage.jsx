import React from 'react';
import LandingTemplate from '../template/LandingTemplate';
import users from '../users.json';

//홈페이지
const LandingPage = () => {
  return (
    <LandingTemplate users={users} />
  );
};

export default LandingPage;