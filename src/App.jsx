import React from 'react'
import TaskManager from './TaskManager'
import Auth from './auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/tasks' element={<TaskManager />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
