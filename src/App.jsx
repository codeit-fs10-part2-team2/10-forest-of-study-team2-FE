import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/UI/Header';
import { Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import StudyInsertionPage from './pages/StudyInsertionPage';
import StudyDetailTemplate from './template/StudyDetailTemplate';
import StudyInsertionTemplate from './template/StudyInsertionTemplate';
import TodayHabitPage from './pages/TodayHabitPage';
import TimerPage from './pages/TimerPage';

function App() {

  return (
    <>

    
    <TimerPage />
    
    
    </>  
  /*  
    <>
      <div className="app container">
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/enrollment' element={<StudyInsertionPage />}/>
          <Route path='/enrollment/:studyId' element={<StudyInsertionTemplate />}/>
          <Route path='/detail/:studyId' element={<StudyDetailTemplate />}/>
          <Route path='/todayHabit' element={<TodayHabitPage />}/>
          <Route path='/timer' element={<Timer />}/>
        </Routes>
      </div>
    </>
    */  
  )
}

export default App;
