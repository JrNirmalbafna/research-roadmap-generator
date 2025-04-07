import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      if (formData.email && formData.password) {
        // Handle successful sign in
        console.log('Sign in successful');
        navigate('/personalize');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const GOOGLE_CLIENT_ID = '10802967581-t7flodf5jf0gh7gg5k1s9fvjqi814htl.apps.googleusercontent.com';
    const REDIRECT_URI = 'http://localhost:3005/auth/google/callback';
    const SCOPE = 'email profile';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
    window.location.href = googleAuthUrl;
  };

  const handleGithubSignIn = () => {
    const GITHUB_CLIENT_ID = 'Ov23liKobjaQsOxHAMYv';
    const REDIRECT_URI = 'http://localhost:3005/auth/github/callback';
    const SCOPE = 'user:email read:user';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image layer with blur and gradient overlay */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("/images/dessert background.jpg")',
          backgroundSize: '110% auto',
          backgroundPosition: 'bottom center',
          filter: 'brightness(1.05) contrast(0.98)',
        }}
      />
      {/* Gradient overlay to create pathway effect */}
      <div className="fixed inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 z-0" />
      
      {/* Radial gradient for focus */}
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-white/5 to-white/20 z-0" 
        style={{
          background: 'radial-gradient(circle at center bottom, transparent 20%, rgba(255,255,255,0.2) 70%)'
        }}
      />

      {/* Content layer */}
      <div className="relative min-h-screen flex items-center justify-center z-10 pt-10">
        <motion.div
          className="w-full max-w-md mx-6 p-8 rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_8px_32px_rgb(0,0,0,0.15)] border border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your research journey</p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            <button
              onClick={handleGithubSignIn}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#24292e] text-white py-2 rounded-lg hover:bg-[#1b1f23] transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </button>
          </div>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a4731] text-white py-3 rounded-lg hover:bg-[#153a28] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[#1a4731] hover:text-[#153a28] font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
