import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Users from './components/Users'
import Workouts from './components/Workouts'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'

function App() {
  return (
    <div className="app-root">
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          <Link to="/users">Users</Link> | <Link to="/activities">Activities</Link> | <Link to="/workouts">Workouts</Link> | <Link to="/teams">Teams</Link> | <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer>
        <small>API base: {import.meta.env.VITE_CODESPACE_NAME ? `${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev` : 'localhost:8000'}</small>
      </footer>
    </div>
  )
}

export default App
