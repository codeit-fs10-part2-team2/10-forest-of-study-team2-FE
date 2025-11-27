import React from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/UI/Header';
import { Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import StudyInsertionPage from './pages/StudyInsertionPage';
import StudyDetailTemplate from './template/StudyDetailTemplate';
import StudyInsertionTemplate from './template/StudyInsertionTemplate';
import TodayHabitPage from './pages/TodayHabitPage';

function App() {
  return (
    <>
      <div className="app container">
        <Header />
        <Routes>
          <Route key='/' path='/' element={<LandingPage />}></Route>
          <Route key='/enrollment' path='/enrollment' element={<StudyInsertionPage />}></Route>
          <Route key='/enrollment/:studyId' path='/enrollment/:studyId' element={<StudyInsertionTemplate />}></Route>
          <Route key='/detail' path='/detail/:studyId' element={<StudyDetailTemplate />}></Route>
          <Route key='/todayHabit' path='/todayHabit' element={<TodayHabitPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;