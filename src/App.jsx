import { useState } from 'react'
import './App.css'
import InsertionPage from './pages/InsertionPage';
import LandingPage from './pages/LandingPage';
import Header from './components/UI/Header';
import { Route, Routes } from 'react-router';
import TodayHabitPage from './pages/TodayHabitPage';


function App() {

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route key='/' path='/' element={<LandingPage />}>
        </Route>
        <Route key='/enrollment' path='/enrollment' element={<InsertionPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
