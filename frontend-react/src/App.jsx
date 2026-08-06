import './App.css'
import { useState } from 'react'
import Modal from 'react-modal'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CatchesPage from './pages/CatchesPage';
import LogCatchPage from './pages/LogCatchPage';
import LoginPage from './pages/LoginPage';
import UpdateCatchPage from './pages/UpdateCatchPage';
import MapPage from './pages/MapPage';
import troutLogo from './assets/troutLogo_shrunk.png'


function App() {

  const [catchItemToEdit, setCatchItemToEdit] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(true)

  const flipModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <div className="app">

        <Modal isOpen={modalIsOpen}>
          <h2>Welcome To Trout Tales!</h2>
          <p>Begin by entering a username and password to register.</p>
          <p>Then login to your account.</p>
          <p>Once you are in start by telling your tales and logging your catches on the <b>Log A Catch</b> page</p>
          <p>Then, view your catches on the <b>Catches</b> page!</p>
          <p>May you have many &#128031; in your future... </p>
          <button onClick={flipModal}>Close Info</button>
        </Modal>

        <header>
          <img src={troutLogo} alt="Trout Logo" />
          <h1>Trout Tales</h1>
          <p>The completely free tool to keep track of all your fishing memories...</p>
        </header>

        <Router>
          <nav>
            <Link to="/catches">Catches</Link>
            <Link to="/log-catch">Log Catch</Link>
            <Link to='/map'>Map</Link>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<LoginPage/>}></Route>
              <Route path="/catches" element={<CatchesPage setCatchItemToEdit={setCatchItemToEdit}/>}></Route>
              <Route path="/log-catch" element={<LogCatchPage/>}></Route>
              <Route path="/update" element={<UpdateCatchPage catchItemToEdit={catchItemToEdit}/>}></Route>
              <Route path="/map" element={<MapPage/>}></Route>
            </Routes>
          </main>

          <button onClick={flipModal}>Need Help?</button>

          <footer>
            <p>&copy; 2026 Arthur Adjamoglian</p>
          </footer>

        </Router>

      </div>

    </>
  )
}

export default App
