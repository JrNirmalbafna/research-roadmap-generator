import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navigation from './components/Navigation';

// Add modern theme styles
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

  .dark-theme {
    background-color: #0A0A0A;
    color: #ffffff;
    font-family: 'Space Mono', monospace;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .map-background {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background-image: url('/images/map-background.png');
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    pointer-events: none;
    filter: brightness(0.8) contrast(1.2);
  }

  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    padding: 2rem 4rem;
    background: linear-gradient(to bottom, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0));
  }

  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: opacity 0.2s ease;
  }

  .logo-container:hover {
    opacity: 0.9;
  }

  .logo-icon {
    width: 2rem;
    height: 2rem;
    position: relative;
  }

  .logo-text {
    font-size: 1.375rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.8));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .nav-link {
    color: #ffffff;
    font-size: 0.9375rem;
    text-decoration: none;
    transition: opacity 0.2s ease;
    opacity: 0.8;
    }

  .nav-link:hover {
    opacity: 1;
  }

  .sign-in-button {
    background: rgba(255, 255, 255, 0.95);
    border: none;
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    color: #000000;
    font-size: 0.9375rem;
    font-family: 'Space Mono', monospace;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 5rem;
    font-weight: 500;
  }

  .sign-in-button:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

  .hero-container {
    display: flex;
    min-height: 100vh;
    padding: 0 4rem;
  }

  .hero-content {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    align-items: center;
    padding-top: 3rem;
  }

  .hero-text-container {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    max-width: 640px;
  }

  .hero-title {
    font-size: clamp(3rem, 5vw, 4rem);
    line-height: 1.1;
    font-weight: 400;
    letter-spacing: -0.02em;
    }

  .hero-description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.125rem;
    line-height: 1.6;
    letter-spacing: -0.01em;
    max-width: 540px;
  }

  .button-container {
    display: flex;
    gap: 1.25rem;
    margin-top: 1rem;
  }

  .primary-button {
    background: #FF4B36;
    color: white;
    padding: 0.875rem 2rem;
    border-radius: 100px;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.2s ease;
    font-family: 'Space Mono', monospace;
    font-weight: 500;
  }

  .primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 75, 54, 0.25);
  }

  .secondary-button {
    background: white;
    color: black;
    padding: 0.875rem 2rem;
    border-radius: 100px;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.2s ease;
    font-family: 'Space Mono', monospace;
    font-weight: 500;
  }

  .secondary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
  }

  .laptop-container {
    position: relative;
    transform: perspective(1000px) rotateY(-12deg) rotateX(5deg);
    margin-right: -6rem;
  }

  .laptop-screen {
    border-radius: 8px;
    overflow: hidden;
    background: #000;
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.7);
  }

  .laptop-screen img {
    width: 100%;
    height: auto;
    display: block;
  }

  .laptop-shadow {
    position: absolute;
    bottom: -40px;
    left: 15%;
    right: 15%;
    height: 40px;
    background: rgba(0, 0, 0, 0.4);
    filter: blur(25px);
    transform-origin: center;
    transform: rotateX(80deg);
  }

  @media (max-width: 1280px) {
    .hero-content {
      gap: 6rem;
    }
    .laptop-container {
      margin-right: -4rem;
    }
  }

  @media (max-width: 1024px) {
    .nav-container {
      padding: 1.5rem 2rem;
    }
    .hero-container {
      padding: 0 2rem;
    }
    .hero-content {
      gap: 4rem;
    }
    .laptop-container {
      margin-right: -2rem;
    }
  }
`;
document.head.appendChild(style);

function App() {
  return (
    <Router>
      <div className="dark-theme">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/personalize" element={<SignUp initialStep={5} />} />
          <Route path="/" element={<Navigation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
