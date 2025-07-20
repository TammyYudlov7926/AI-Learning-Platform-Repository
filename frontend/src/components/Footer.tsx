import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        <div className="footer-section">
          <h3>About Platform</h3>
          <p>🎓 A smart AI-powered learning platform for students and educators.</p>
          <p>Ask questions, explore categories, and improve your knowledge!</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/ask">Ask AI</Link>
            <Link to="/history">History</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 Email: support@ailearning.com</p>
          <p>📍 Location: Tel Aviv, Israel</p>
        </div>

      </div>

      <div className="footer-bottom">
        🤖 "Learn smarter. Grow faster." <br />
        &copy; {new Date().getFullYear()} AI Learning Platform
      </div>
    </footer>
  );
}
