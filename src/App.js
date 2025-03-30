import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, Workflow, BookmarkPlus, LogOut, Search } from 'lucide-react';
import SignIn from './components/SignIn';
import Chat from './components/Chat';

// Import custom fonts and animations
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Source+Sans+Pro:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');
  
  .font-heading {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-style: italic;
    letter-spacing: -0.02em;
  }
  
  .font-body {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
    font-style: italic;
    letter-spacing: 0.01em;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Add font styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = fontStyles;
document.head.appendChild(styleSheet);

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
    },
    glow: {
      primary: '0 0 20px rgba(122, 162, 247, 0.44), 0 0 40px rgba(122, 162, 247, 0.44), 0 0 60px rgba(122, 162, 247, 0.33)',
      secondary: '0 0 20px rgba(184, 198, 255, 0.44), 0 0 40px rgba(184, 198, 255, 0.44), 0 0 60px rgba(184, 198, 255, 0.33)'
    }
  },
  typography: {
    heading: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 700,
      fontStyle: 'italic',
      letterSpacing: '-0.02em'
    },
    body: {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontWeight: 400,
      fontStyle: 'italic',
      letterSpacing: '0.01em'
    }
  }
};

const DashboardView = ({ onSignOut }) => {
  const [searchTopic, setSearchTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [pastSearches, setPastSearches] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const interests = [
    { id: 1, icon: <Brain size={24} />, label: 'Computer Science', color: DARK_GHIBLI_THEME.primary.base },
    { id: 2, icon: <Lightbulb size={24} />, label: 'Mathematics', color: DARK_GHIBLI_THEME.accent.dark },
    { id: 3, icon: <Workflow size={24} />, label: 'Physics', color: DARK_GHIBLI_THEME.accent.base },
    { id: 4, icon: <BookmarkPlus size={24} />, label: 'Engineering', color: DARK_GHIBLI_THEME.secondary.light },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTopic.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5002/api/curate-resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: searchTopic,
          interests: selectedInterests.map(id => interests.find(i => i.id === id).label)
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        // Add to past searches
        setPastSearches(prev => {
          const newSearches = [{
            topic: searchTopic,
            interests: selectedInterests.map(id => interests.find(i => i.id === id).label),
            timestamp: new Date()
          }, ...prev].slice(0, 4); // Keep only latest 4
          return newSearches;
        });
        setIsChatOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = (id) => {
    setSelectedInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen py-8 px-4 relative"
      style={{
        background: `
          radial-gradient(circle at 10% 0%, ${DARK_GHIBLI_THEME.background.glow}, transparent 35%),
          radial-gradient(circle at 90% 90%, ${DARK_GHIBLI_THEME.background.glow}, transparent 35%),
          linear-gradient(135deg, 
            ${DARK_GHIBLI_THEME.background.start} 0%,
            ${DARK_GHIBLI_THEME.background.middle} 50%,
            ${DARK_GHIBLI_THEME.background.end} 100%
          )
        `,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
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

      {/* Floating Elements */}
      <motion.div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: i % 3 === 0 
                ? `radial-gradient(circle at center, ${DARK_GHIBLI_THEME.primary.base}66, transparent)`
                : i % 3 === 1
                ? `radial-gradient(circle at center, ${DARK_GHIBLI_THEME.accent.base}66, transparent)`
                : `radial-gradient(circle at center, ${DARK_GHIBLI_THEME.secondary.base}66, transparent)`,
              filter: 'blur(1px)',
            }}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
              times: [0, 0.5, 1]
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Sign Out Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSignOut}
          className="fixed right-4 top-4 p-1.5 rounded-full hover:bg-white/10 z-50"
          style={{ color: DARK_GHIBLI_THEME.text.primary }}
        >
          <LogOut size={20} />
        </motion.button>

        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <motion.h2 
            className="text-6xl font-heading mb-4 bg-clip-text text-transparent relative"
            style={{ 
              backgroundImage: DARK_GHIBLI_THEME.text.gradient.primary,
              textShadow: DARK_GHIBLI_THEME.text.glow.primary,
              WebkitBackgroundClip: 'text',
              animation: 'gradientFlow 8s ease infinite'
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Research Assistant
            <motion.div
              className="absolute left-0 w-full"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%,
                  ${DARK_GHIBLI_THEME.text.primary} 10%,
                  ${DARK_GHIBLI_THEME.primary.base} 30%,
                  ${DARK_GHIBLI_THEME.accent.base} 50%,
                  ${DARK_GHIBLI_THEME.primary.base} 70%,
                  ${DARK_GHIBLI_THEME.text.primary} 90%,
                  transparent 100%
                )`,
                height: '2px',
                bottom: '-8px',
                filter: 'blur(1px)',
                opacity: 0.8
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-lg font-body"
            style={{ 
              backgroundImage: DARK_GHIBLI_THEME.text.gradient.secondary,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: DARK_GHIBLI_THEME.text.glow.secondary
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Your AI-powered research companion
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Search Section */}
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl -z-10"
              style={{
                background: `linear-gradient(135deg, 
                  ${DARK_GHIBLI_THEME.primary.base}22,
                  ${DARK_GHIBLI_THEME.accent.base}22
                )`,
                filter: 'blur(20px)'
              }}
            />
            <div className="relative p-6 rounded-2xl backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(26, 27, 38, 0.8)',
                border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
              }}
            >
              <h2 className="text-xl font-heading mb-4" style={{ color: DARK_GHIBLI_THEME.text.primary }}>
                What would you like to research?
              </h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchTopic}
                    onChange={(e) => setSearchTopic(e.target.value)}
                    placeholder="Enter your research topic..."
                    className="flex-1 px-4 py-2.5 rounded-lg bg-black/20 text-base"
                    style={{
                      color: DARK_GHIBLI_THEME.text.primary,
                      border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
                    }}
                  />
                  <motion.button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg flex items-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${DARK_GHIBLI_THEME.primary.base},
                        ${DARK_GHIBLI_THEME.accent.base}
                      )`
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    <Search size={16} />
                    <span className="font-medium">Search</span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl -z-10"
              style={{
                background: `linear-gradient(135deg, 
                  ${DARK_GHIBLI_THEME.secondary.base}22,
                  ${DARK_GHIBLI_THEME.primary.base}22
                )`,
                filter: 'blur(20px)'
              }}
            />
            <div className="relative p-6 rounded-2xl backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(26, 27, 38, 0.8)',
                border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
              }}
            >
              <h2 className="text-xl font-heading mb-3" style={{ color: DARK_GHIBLI_THEME.text.primary }}>
                Select Your Interests
              </h2>
              <div className="relative">
                <motion.button
                  onClick={() => setIsInterestsOpen(!isInterestsOpen)}
                  className="w-full px-4 py-2.5 rounded-lg flex items-center justify-between"
                  style={{
                    backgroundColor: 'rgba(26, 27, 38, 0.6)',
                    border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`,
                    color: DARK_GHIBLI_THEME.text.primary
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="flex items-center gap-2">
                    {selectedInterests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedInterests.map(id => {
                          const interest = interests.find(i => i.id === id);
                          return (
                            <span
                              key={id}
                              className="px-2 py-1 rounded-full text-xs flex items-center gap-1"
                              style={{
                                backgroundColor: interest.color,
                                color: '#FFFFFF'
                              }}
                            >
                              {interest.icon}
                              {interest.label}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      'Select Interests'
                    )}
                  </span>
                  <motion.div
                    animate={{ rotate: isInterestsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.div>
                </motion.button>

                {isInterestsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 p-3 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(26, 27, 38, 0.95)',
                      border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {interests.map((interest) => (
                        <motion.button
                          key={interest.id}
                          onClick={() => handleSelection(interest.id)}
                          className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg"
                          style={{
                            backgroundColor: selectedInterests.includes(interest.id) 
                              ? interest.color
                              : 'rgba(26, 27, 38, 0.6)',
                            color: selectedInterests.includes(interest.id) 
                              ? '#FFFFFF'
                              : DARK_GHIBLI_THEME.text.primary,
                            border: `1px solid ${selectedInterests.includes(interest.id) 
                              ? interest.color 
                              : DARK_GHIBLI_THEME.background.overlay}`,
                            minHeight: '60px'
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: selectedInterests.includes(interest.id) 
                              ? interest.color 
                              : 'rgba(255, 255, 255, 0.1)'
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div 
                            className="p-1.5 rounded-full"
                            style={{
                              backgroundColor: selectedInterests.includes(interest.id)
                                ? 'rgba(255, 255, 255, 0.2)'
                                : `${interest.color}22`,
                              color: selectedInterests.includes(interest.id)
                                ? '#FFFFFF'
                                : interest.color
                            }}
                          >
                            {interest.icon}
                          </div>
                          <span className="font-medium text-xs text-center">
                            {interest.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Past Searches Section */}
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl -z-10"
              style={{
                background: `linear-gradient(135deg, 
                  ${DARK_GHIBLI_THEME.accent.base}22,
                  ${DARK_GHIBLI_THEME.primary.base}22
                )`,
                filter: 'blur(20px)'
              }}
            />
            <div className="relative p-6 rounded-2xl backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(26, 27, 38, 0.8)',
                border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
              }}
            >
              <h2 className="text-xl font-heading mb-4" style={{ color: DARK_GHIBLI_THEME.text.primary }}>
                Recent Searches
              </h2>
              <div className="space-y-3">
                {pastSearches.length > 0 ? (
                  pastSearches.map((search, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg flex items-center justify-between"
                      style={{
                        backgroundColor: 'rgba(26, 27, 38, 0.6)',
                        border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`,
                        cursor: 'pointer'
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      onClick={() => {
                        setSearchTopic(search.topic);
                        setSelectedInterests(search.interests.map(label => {
                          const interest = interests.find(i => i.label === label);
                          return interest ? interest.id : null;
                        }).filter(id => id !== null));
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-full"
                          style={{
                            backgroundColor: `${DARK_GHIBLI_THEME.primary.base}22`,
                            color: DARK_GHIBLI_THEME.primary.base
                          }}
                        >
                          <Search size={16} />
                        </div>
                        <div>
                          <div style={{ color: DARK_GHIBLI_THEME.text.primary }}>
                            {search.topic}
                          </div>
                          <div className="text-sm" style={{ color: DARK_GHIBLI_THEME.text.secondary }}>
                            {search.interests.length > 0 
                              ? `Interests: ${search.interests.join(', ')}`
                              : 'No interests selected'}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm" style={{ color: DARK_GHIBLI_THEME.text.light }}>
                        {new Date(search.timestamp).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-4" style={{ color: DARK_GHIBLI_THEME.text.secondary }}>
                    No recent searches yet
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chat Interface */}
        {isChatOpen && (
          <motion.div 
            className="fixed bottom-4 right-4 w-96"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Chat onClose={() => setIsChatOpen(false)} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (!isSignedIn) {
    return <SignIn onSignIn={() => setIsSignedIn(true)} />;
  }

  return <DashboardView onSignOut={() => setIsSignedIn(false)} />;
};

export default App;
