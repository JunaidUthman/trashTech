import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import { Trash2, Recycle, Brain, Cpu, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import './Home.css';

function Home() {
  const typedElement = useRef(null);
  const typedInstance = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      strings: [
        'Make money by giving us your waste.',
        'Make your city cleaner and earn rewards.',
        'Track all trash can locations in real-time on our map.',
        'Turn recycling into profit - get paid for every collection.',
        'Join thousands earning while keeping cities clean.'
        ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    typedInstance.current = new Typed(typedElement.current, options);

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 15,
  }));

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="animated-background">
        {/* Glowing Orbs */}
        <div className="glowing-orb orb-1"></div>
        <div className="glowing-orb orb-2"></div>

        {/* Floating Icons */}
        <div className="floating-icon icon-1">
          <Trash2 size={80} strokeWidth={1.5} />
        </div>
        <div className="floating-icon icon-2">
          <Brain size={100} strokeWidth={1.5} />
        </div>
        <div className="floating-icon icon-3">
          <Recycle size={90} strokeWidth={1.5} />
        </div>
        <div className="floating-icon icon-4">
          <Cpu size={70} strokeWidth={1.5} />
        </div>
        <div className="floating-icon icon-5">
          <Sparkles size={85} strokeWidth={1.5} />
        </div>
        <div className="floating-icon icon-6">
          <TrendingUp size={75} strokeWidth={1.5} />
        </div>
        <div className="floating-icon icon-7">
          <MapPin size={65} strokeWidth={1.5} />
        </div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="home-content">
        <h1 className="home-title">
          Welcome to <span className="home-title-highlight">TrashTech</span>
        </h1>
        
        <div className="typing-container">
          <span className="typing-text" ref={typedElement}></span>
        </div>

        <div className="cta-buttons">
          <button
            type="button"
            className="cta-button cta-button-primary"
            onClick={() => navigate('/user')}
          >
            Get Started
          </button>
          <button className="cta-button cta-button-secondary">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;