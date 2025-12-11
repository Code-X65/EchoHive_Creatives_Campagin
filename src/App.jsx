import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landingpage1 from './Pages/Landingpage1'
import Landingpage2 from './Pages/Landingpage2'
import LandingPage3 from './Pages/LandingPage3'
import Homepage from './Pages/Homepage'

const App = () => {
  return (
  <>
  <div>
    <Router basename='EchoHive_Creatives_Campagin'>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/page1' element={<Landingpage1 />} />
        <Route path='/page2' element={<Landingpage2 />} />
        <Route path='/page3' element={<LandingPage3 />} />
        
      </Routes>
    </Router>
  </div>
  </>
  )
}

export default App