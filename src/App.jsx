import { useState } from 'react'
import Home from './components/Home'
import StarField from './components/StarField'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Global background canvas (fixed, behind everything) */}
      <StarField />
      <div className="app-root">
        {/* Main Intro */}
        <Home />
      </div>
    </>
  );
}

export default App
