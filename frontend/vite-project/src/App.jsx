import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoApp from './ToDoApp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<ToDoApp />} />
    </Routes>
    </Router>
    </>
  )
}

export default App
