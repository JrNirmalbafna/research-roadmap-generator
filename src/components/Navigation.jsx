import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: '1rem 2.5rem',
      background: 'linear-gradient(to right, rgb(245, 248, 245) 0%, rgb(248, 250, 248) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(200, 210, 200, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 20px rgba(180, 190, 180, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.2)'
      }}>
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          color: 'rgb(90, 105, 90)'
        }}>Pathfinder</span>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3rem',
        marginRight: '2rem'
      }}>
        <Link to="/" style={{
          color: 'rgba(90, 105, 90, 0.9)',
          fontSize: '0.95rem',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease'
        }}>Research</Link>
        
        <Link to="/" style={{
          color: 'rgba(90, 105, 90, 0.9)',
          fontSize: '0.95rem',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease'
        }}>Collaborate</Link>
        
        <Link to="/signin" style={{
          background: 'rgba(90, 105, 90, 0.95)',
          color: 'rgb(245, 248, 245)',
          padding: '0.75rem 1.75rem',
          borderRadius: '9999px',
          fontSize: '0.95rem',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          border: 'none',
          boxShadow: '0 2px 4px rgba(90, 105, 90, 0.1), 0 0 0 1px rgba(90, 105, 90, 0.05)'
        }}>Sign In</Link>
      </div>
    </nav>
  );
};

export default Navigation; 