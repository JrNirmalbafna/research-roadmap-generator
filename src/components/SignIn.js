import React, { useState } from 'react';
import { Lock, LogIn, Mail } from 'lucide-react';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // This is a mock authentication - replace with your actual auth logic
      if (email && password) {
        onSignIn({ email });
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #F5F0E1, #EDE6D6, #E8DBC5)',
        backgroundBlendMode: 'soft-light',
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-2" style={{ color: '#4A4037' }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-base" style={{ color: '#6E5F4F' }}>
            {isSignUp
              ? 'Start your research journey'
              : 'Sign in to access your research roadmaps'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#7C6C63' }} size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="pl-10 w-full p-3 rounded-lg border-2 transition-all duration-300"
              style={{
                borderColor: '#7C6C63',
                backgroundColor: '#FFFFFF',
                color: '#4A4037'
              }}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#7C6C63' }} size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-10 w-full p-3 rounded-lg border-2 transition-all duration-300"
              style={{
                borderColor: '#7C6C63',
                backgroundColor: '#FFFFFF',
                color: '#4A4037'
              }}
            />
          </div>

          {error && (
            <p
              className="text-red-600 text-sm text-center font-medium"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full p-3 rounded-lg text-white flex items-center justify-center space-x-2"
            style={{
              background: 'linear-gradient(135deg, #7C6C63, #4A4037)',
            }}
          >
            <LogIn size={20} />
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm hover:underline"
            style={{ color: '#7C6C63' }}
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
