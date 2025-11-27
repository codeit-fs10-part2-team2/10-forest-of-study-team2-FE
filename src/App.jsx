/* 
    App.jsx updated by Taeyoung Seon, 11/26/2025
    This file is the main component of the application.
    It includes the StudyDetailTemplate and StudyInsertionTemplate components.
    The StudyDetailTemplate component is used to display the study detail page.
    The StudyInsertionTemplate component is used to display the study insertion page.
    If studyId is not null, the EditForm component is displayed.
*/

import { useState } from 'react'
import './App.css'
import InsertionPage from './pages/InsertionPage';
import LandingPage from './pages/LandingPage';
import Header from './components/UI/Header';
import { Route, Routes } from 'react-router';
import TodayHabitPage from './pages/TodayHabitPage';
import React from 'react'
import StudyDetailTemplate from './template/StudyDetailTemplate';
import StudyInsertionTemplate from './template/StudyInsertionTemplate';


function App() {
  return (
    <>
      <div className="app container">
        <Header />
        <Routes>
          <Route key='/' path='/' element={<LandingPage />}></Route>
          <Route key='/enrollment' path='/enrollment' element={<InsertionPage />}></Route>
          <Route key='/enrollment/:studyId' path='/enrollment/:studyId' element={<StudyInsertionTemplate />}></Route>
          <Route key='/detail' path='/detail/:studyId' element={<StudyDetailTemplate />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;