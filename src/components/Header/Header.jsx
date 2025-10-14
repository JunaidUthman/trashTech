import { Trash2 } from 'lucide-react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">
              <Trash2 />
            </div>
            <span className="logo-text">
              Trash<span className="logo-highlight">Tech</span>
            </span>
          </div>

          {/* Navigation Buttons */}
          <nav className="nav">
            <button className="nav-button" onClick={() => navigate('/user')}>Get Started</button>
            <button className="nav-button" onClick={() => navigate('/collector')} >Collection Routes</button>
            <button className="nav-button" onClick={() => navigate('/BuySale')} >Sale/Buy Your Waste</button>
            <button className="nav-button-primary">About Us</button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;