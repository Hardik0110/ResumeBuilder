import React from 'react'
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import GeneratedResume from './pages/GeneratedResume'
import HomePage from './pages/HomePage'
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/resume' element={<GeneratedResume />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
