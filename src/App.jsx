import React from 'react'
import ViewStudyDetails from './pages/ViewStudyDetails'
import Header from './components/Layouts/Header/header.jsx'

function App() {
  return (
    <>
        <div className="app">
          <Header />
          <div className="main-content">
            <ViewStudyDetails />
          </div>
        </div>
    </>
  )
}

export default App;