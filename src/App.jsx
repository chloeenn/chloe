import { useState } from 'react'
import Home from './components/Home'
import StarField from './components/StarField'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StarField />
      <div className="app-root">
        <Home />
      </div>
    </>
  );
}

export default App
