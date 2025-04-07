import React, { useState } from 'react';
import { Lock, LogIn, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Dark Ghibli Theme Configuration
  const DARK_GHIBLI_THEME = {
    background: {
      start: '#0A0D16',
      middle: '#131726',
      end: '#1A1F2F',
      overlay: 'rgba(122, 162, 247, 0.05)',
      glow: 'rgba(122, 162, 247, 0.15)'
    },
    primary: {
      base: '#7AA2F7',
      light: '#89B4FF',
      dark: '#6A8EDB'
    },
    accent: {
      base: '#FF79C6',
      light: '#FF92D0',
      dark: '#DB4B4B'
    },
    secondary: {
      base: '#9ECE6A',
      light: '#BAE6B6',
      dark: '#76946A'
    },
    text: {
      primary: '#E6EEFF',
      secondary: '#B8C6FF',
      light: 'rgba(184, 198, 255, 0.85)',
      gradient: {
        primary: 'linear-gradient(135deg, #E6EEFF 0%, #7AA2F7 50%, #FF79C6 100%)',
        secondary: 'linear-gradient(135deg, #B8C6FF 0%, #7AA2F7 50%, #394B70 100%)'
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      if (formData.email && formData.password) {
        onSignIn({ email: formData.email });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setValidationErrors({});
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: `
          radial-gradient(circle at 10% 0%, ${DARK_GHIBLI_THEME.background.glow}, transparent 35%),
          radial-gradient(circle at 90% 90%, ${DARK_GHIBLI_THEME.background.glow}, transparent 35%),
          linear-gradient(135deg, 
            ${DARK_GHIBLI_THEME.background.start} 0%,
            ${DARK_GHIBLI_THEME.background.middle} 50%,
            ${DARK_GHIBLI_THEME.background.end} 100%
          )
        `
      }}
    >
      {/* Background Animation */}
      <motion.div
        className="fixed inset-0 opacity-40"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
          transition: {
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${DARK_GHIBLI_THEME.background.glow} 0%, transparent 35%),
            radial-gradient(circle at 80% 20%, ${DARK_GHIBLI_THEME.accent.base}22 0%, transparent 45%),
            radial-gradient(circle at 20% 80%, ${DARK_GHIBLI_THEME.primary.base}22 0%, transparent 45%),
            radial-gradient(circle at 65% 35%, ${DARK_GHIBLI_THEME.secondary.base}22 0%, transparent 40%)
          `,
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        className="relative p-8 rounded-2xl w-full max-w-md backdrop-blur-sm"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={{
          backgroundColor: 'rgba(26, 27, 38, 0.8)',
          border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-heading mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ 
              backgroundImage: DARK_GHIBLI_THEME.text.gradient.primary,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </motion.h2>
          <motion.p 
            className="text-base"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ color: DARK_GHIBLI_THEME.text.secondary }}
          >
            {isSignUp
              ? 'Start your research journey'
              : 'Sign in to access your research roadmaps'}
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail 
              className="absolute left-3 top-1/2 transform -translate-y-1/2" 
              style={{ color: DARK_GHIBLI_THEME.text.secondary }} 
              size={20} 
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full pl-10 p-3 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${validationErrors.email ? DARK_GHIBLI_THEME.accent.base : DARK_GHIBLI_THEME.background.overlay}`,
                color: DARK_GHIBLI_THEME.text.primary
              }}
            />
            {validationErrors.email && (
              <p className="text-sm mt-1" style={{ color: DARK_GHIBLI_THEME.accent.base }}>
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <Lock 
              className="absolute left-3 top-1/2 transform -translate-y-1/2" 
              style={{ color: DARK_GHIBLI_THEME.text.secondary }} 
              size={20} 
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${validationErrors.password ? DARK_GHIBLI_THEME.accent.base : DARK_GHIBLI_THEME.background.overlay}`,
                color: DARK_GHIBLI_THEME.text.primary
              }}
            />
            {validationErrors.password && (
              <p className="text-sm mt-1" style={{ color: DARK_GHIBLI_THEME.accent.base }}>
                {validationErrors.password}
              </p>
            )}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-center"
              style={{ color: DARK_GHIBLI_THEME.accent.base }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: `linear-gradient(135deg, 
                ${DARK_GHIBLI_THEME.primary.base},
                ${DARK_GHIBLI_THEME.accent.base}
              )`,
              opacity: loading ? 0.7 : 1,
              color: '#FFFFFF'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <motion.button
            onClick={handleToggleMode}
            disabled={loading}
            className="text-sm hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            style={{ 
              color: DARK_GHIBLI_THEME.text.secondary,
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : 'Need an account? Sign up'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
