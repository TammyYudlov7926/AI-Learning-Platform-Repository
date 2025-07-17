import { Link } from 'react-router-dom';
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-outer-wrapper">
      <div className="hero-container">
        <div className="hero-text">
          <h1>Welcome to our learning platform</h1>
          <p>Get knowledge, insights, and powerful tools with advanced AI</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn">Join</Link>
            <Link to="/login" className="btn-outline">Login</Link>
          </div>
        </div>
        <div className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;
