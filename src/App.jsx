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