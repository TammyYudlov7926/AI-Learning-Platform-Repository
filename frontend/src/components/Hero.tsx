import { Link } from 'react-router-dom';
import "../styles/Hero.css"; 
const Hero = () => {
return (
<section className="hero">
<h1>Welcome to our learning platform</h1>
<p>Get knowledge, insights, and powerful tools with advanced AI</p>
<div className="buttons">
<Link to="/register" className="btn">Join</Link>
<Link to="/login" className="btn-outline">Login</Link>
</div>
</section>
);
};

export default Hero;