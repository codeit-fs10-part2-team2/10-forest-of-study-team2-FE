import React from 'react'
import ViewStudyDetails from './pages/ViewStudyDetails'
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