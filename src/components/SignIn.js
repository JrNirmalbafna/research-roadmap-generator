import React, { useState } from 'react';
import { Lock, LogIn, Mail, Loader2 } from 'lucide-react';

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 10% 0%, rgba(158, 206, 171, 0.2), transparent 35%),
          radial-gradient(circle at 90% 90%, rgba(255, 121, 198, 0.15), transparent 35%),
          linear-gradient(135deg, 
            #F5F7FA 0%,
            #E8EDF5 50%,
            #DEE4F0 100%
          )
        `,
      }}
    >
      {/* Background Animation */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(158, 206, 171, 0.2) 0%, transparent 35%),
            radial-gradient(circle at 80% 20%, rgba(255, 121, 198, 0.15) 0%, transparent 45%),
            radial-gradient(circle at 20% 80%, rgba(122, 162, 247, 0.15) 0%, transparent 45%)
          `,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="bg-white/80 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm relative"
        style={{
          border: '1px solid rgba(158, 206, 171, 0.2)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-heading mb-2"
            style={{ 
              color: '#2E3554',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p 
            className="text-base"
            style={{ 
              color: '#394B70',
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.01em',
            }}
          >
            {isSignUp
              ? 'Start your research journey'
              : 'Sign in to access your research roadmaps'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#394B70' }} size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className={`pl-10 w-full p-3 rounded-lg transition-all duration-300 ${
                validationErrors.email ? 'border-red-400' : ''
              }`}
              style={{
                border: `1px solid ${validationErrors.email ? 'rgba(255, 121, 198, 0.5)' : 'rgba(158, 206, 171, 0.3)'}`,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: '#2E3554',
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: '0.95rem',
              }}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#394B70' }} size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className={`pl-10 w-full p-3 rounded-lg transition-all duration-300 ${
                validationErrors.password ? 'border-red-400' : ''
              }`}
              style={{
                border: `1px solid ${validationErrors.password ? 'rgba(255, 121, 198, 0.5)' : 'rgba(158, 206, 171, 0.3)'}`,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: '#2E3554',
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: '0.95rem',
              }}
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>

          {error && (
            <p
              className="text-red-500 text-sm text-center font-medium"
              style={{
                textShadow: '0 0 10px rgba(255, 121, 198, 0.2)',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg text-white flex items-center justify-center space-x-2 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #9ECE6A, #7AA2F7)',
              boxShadow: '0 2px 12px rgba(158, 206, 171, 0.3)',
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.02em',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
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
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleToggleMode}
            disabled={loading}
            className="text-sm hover:underline transition-all duration-300"
            style={{ 
              color: '#394B70',
              fontFamily: "'Source Sans Pro', sans-serif",
              fontWeight: 400,
              fontStyle: 'italic',
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : 'Need an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
