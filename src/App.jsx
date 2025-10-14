import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInterface from './components/userInterface/UserInterface';
import CollectorInterface from './components/CollectorInterface/CollectorInterface';
import BuySale from './components/Buy&Sale/Buy&Sale';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Home />} />
          <Route path="/user" element={<UserInterface />} />
          <Route path="/collector" element={<CollectorInterface />} />
          <Route path="/BuySale" element={<BuySale />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App