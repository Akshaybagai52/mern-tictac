import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './components/Game'
import HomePage from './pages/HomePage'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
