import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';

import Header from './components/Layouts/Header/Header.jsx'
import Timer from './pages/Timer'
import ViewStudyDetails from './pages/ViewStudyDetails/ViewStudyDetails.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <div className="app">
        <Header/>
          <Routes>
            <Route path="/timer" element={<Timer/>}/>
            <Route path="/detail" element={<ViewStudyDetails/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)

