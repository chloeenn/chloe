import { useState } from 'react'
import Home from './components/Home'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* Main Intro */}
        <Home/>
        {/* <InteractiveMoonBackground/> */}
      </div>
    </>
  )
}

export default App
