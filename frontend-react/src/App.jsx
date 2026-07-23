import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CatchesPage from './pages/CatchesPage';
import LogCatchPage from './pages/LogCatchPage';
import UpdateCatchPage from './pages/UpdateCatchPage';
import troutLogo from './assets/troutLogo_shrunk.png'


function App() {

  const [catchItemToEdit, setCatchItemToEdit] = useState()

  return (
    <>
      <div className="app">

        <header>
          <img src={troutLogo} alt="Trout Logo" />
          <h1>Trout Tales</h1>
          <p>Saving all of your fishing memories, so you'll never forget them...</p>
        </header>

        <Router>
          <nav>
            <Link to="/">Catches</Link>
            <Link to="/log-catch">Log Catch</Link>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<CatchesPage setCatchItemToEdit={setCatchItemToEdit}/>}></Route>
              <Route path="/log-catch" element={<LogCatchPage/>}></Route>
              <Route path="/update" element={<UpdateCatchPage catchItemToEdit={catchItemToEdit}/>}></Route>
            </Routes>
          </main>

          <footer>
            <p>&copy; 2026 Arthur Adjamoglian</p>
          </footer>

        </Router>

      </div>

    </>
  )
}

export default App
