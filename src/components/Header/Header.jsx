import { Trash2 } from 'lucide-react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Optional logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // refresh the page to update buttons
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section" onClick={() => navigate('/')}>
            <div className="logo-icon" >
              <a href=""></a>
              <Trash2 />
            </div>
            <span className="logo-text">
              Trash<span className="logo-highlight">Tech</span>
            </span>
          </div>

          {/* Navigation Buttons */}
          <nav className="nav">
            <button className="nav-button" onClick={() => navigate('/home')}>Home</button>
            {/* 👇 show only if NOT logged in */}
        {!token && (
          <>
            <button className="nav-button" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="nav-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        )}

        {/* 👇 show only if logged in */}
        {token && (
          <button
            className="nav-button"
            onClick={() => navigate("/collector")}
          >
            Collection Routes
          </button>
          
        )}
        {token && (
          <button
            className="nav-button"
            onClick={handleLogout}
          >
            Logout
          </button>
          
        )}
            <button className="nav-button" onClick={() => navigate('/BuySale')} >Sale/Buy Your Waste</button>
            <button className="nav-button-primary">About Us</button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;