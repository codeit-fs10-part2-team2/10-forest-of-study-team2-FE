import { useState } from 'react'
import './App.css'
import InsertionPage from './pages/InsertionPage';
import LandingPage from './pages/LandingPage';
import Header from './components/UI/Header';
import { Route, Routes } from 'react-router';
import TodayHabitPage from './pages/TodayHabitPage';
import React from 'react'
import ViewStudyDetails from './pages/ViewStudyDetails/ViewStudyDetails.jsx'
import Header from './components/Layouts/Header/Header.jsx'

function App() {
  return (
    <>
        <div className="app">
          <Header />
          <ViewStudyDetails />
        </div>
    </>
  )
}

export default App;