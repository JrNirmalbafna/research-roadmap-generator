import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightbulb, Workflow, BookmarkPlus, Search, LogOut, ArrowRight, History, ChevronDown } from 'lucide-react';
import SignIn from './components/SignIn';

// Cream Ghibli Theme Configuration
const CREAM_GHIBLI_THEME = {
  background: {
    start: '#F5F0E1',
    middle: '#EDE6D6',
    end: '#E8DBC5',
    overlay: 'rgba(124, 108, 99, 0.05)'
  },
  softColors: {
    lavender: 'rgba(124, 108, 99, 0.1)',
    mint: 'rgba(94, 140, 122, 0.1)',
    peach: 'rgba(212, 163, 115, 0.1)',
    sage: 'rgba(230, 183, 148, 0.1)'
  },
  primary: {
    base: '#7C6C63',
    gradient: {
      start: '#7C6C63',
      end: '#4A4037'
    }
  },
  secondary: {
    base: '#5E8C7A',
    light: '#7FA99B',
    dark: '#4A7063'
  },
  accent: {
    base: '#D4A373',
    light: '#E6B794',
    dark: '#B88A5F'
  },
  text: {
    primary: '#4A4037',
    secondary: '#7C6C63',
    light: 'rgba(74, 64, 55, 0.6)'
  }
};

const DashboardView = ({ onSignOut }) => {
  const interests = [
    { id: 1, icon: <Brain size={24} />, label: 'Computer Science', color: CREAM_GHIBLI_THEME.accent.base },
    { id: 2, icon: <Lightbulb size={24} />, label: 'Mathematics', color: CREAM_GHIBLI_THEME.secondary.base },
    { id: 3, icon: <Workflow size={24} />, label: 'Physics', color: CREAM_GHIBLI_THEME.primary.base },
    { id: 4, icon: <BookmarkPlus size={24} />, label: 'Chemistry', color: CREAM_GHIBLI_THEME.accent.dark },
  ];

  const pastResearches = [
    { id: 1, topic: 'Machine Learning Fundamentals', date: '2 days ago', interest: 'Computer Science' },
    { id: 2, topic: 'Quantum Mechanics', date: '1 week ago', interest: 'Physics' },
    { id: 3, topic: 'Linear Algebra', date: '2 weeks ago', interest: 'Mathematics' },
  ];

  const [searchTopic, setSearchTopic] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

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
          interests: selected.map(id => interests.find(i => i.id === id).label)
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        // Handle success
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen py-12 px-6"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${CREAM_GHIBLI_THEME.background.base}CC, ${CREAM_GHIBLI_THEME.background.overlay})`
      }}
    >
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSignOut}
          className="absolute right-8 top-8 p-2 rounded-full hover:bg-white/10"
          style={{ color: CREAM_GHIBLI_THEME.text.primary }}
        >
          <LogOut size={24} />
        </motion.button>
        <div className="text-center mb-16 relative">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${CREAM_GHIBLI_THEME.primary.base}33, transparent)`,
                filter: 'blur(20px)'
              }}
            />
          </motion.div>
          <motion.h2 
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent relative"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${CREAM_GHIBLI_THEME.primary.base}, ${CREAM_GHIBLI_THEME.accent.base})`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Research Topic Explorer
          </motion.h2>
          <motion.p 
            className="text-lg"
            style={{ color: CREAM_GHIBLI_THEME.text.secondary }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Enter your research topic and select relevant interests
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.form 
          onSubmit={handleSearch} 
          className="max-w-3xl mx-auto mb-12 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative group">
            <motion.div
              className="absolute inset-0 rounded-xl -z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: `linear-gradient(135deg, ${CREAM_GHIBLI_THEME.primary.base}22, ${CREAM_GHIBLI_THEME.accent.base}22)`,
                filter: 'blur(10px)',
              }}
              whileHover={{ scale: 1.02 }}
            />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Enter your research topic..."
              className="w-full px-6 py-4 rounded-xl text-lg backdrop-blur-sm transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: `2px solid transparent`,
                color: CREAM_GHIBLI_THEME.text.primary,
                outline: 'none',
              }}
            />
            <motion.button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-lg"
              style={{
                backgroundColor: CREAM_GHIBLI_THEME.primary.base,
                color: '#FFFFFF',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              <Search size={20} />
            </motion.button>
          </div>
        </motion.form>

        {/* Interests Dropdown */}
        <motion.div 
          className="max-w-3xl mx-auto mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative group">
            <motion.div
              className="absolute inset-0 rounded-xl -z-10"
              animate={{
                scale: isDropdownOpen ? 1.02 : 1,
                opacity: isDropdownOpen ? 1 : 0.5,
              }}
              style={{
                background: `linear-gradient(135deg, ${CREAM_GHIBLI_THEME.secondary.base}22, ${CREAM_GHIBLI_THEME.primary.base}22)`,
                filter: 'blur(10px)',
              }}
            />
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-6 py-4 rounded-xl text-left backdrop-blur-sm flex items-center justify-between transition-all duration-300"
              style={{
                backgroundColor: isDropdownOpen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                border: `2px solid ${isDropdownOpen ? CREAM_GHIBLI_THEME.secondary.base : 'transparent'}`,
                color: CREAM_GHIBLI_THEME.text.primary,
              }}
            >
              <span>
                {selected.length === 0 
                  ? 'Select interests...' 
                  : `${selected.length} interest${selected.length !== 1 ? 's' : ''} selected`}
              </span>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-xl z-10 backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                >
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {interests.map((interest, index) => (
                      <motion.button
                        key={interest.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          handleSelection(interest.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`p-3 rounded-lg flex items-center gap-3 transition-all relative overflow-hidden ${
                          selected.includes(interest.id) ? 'ring-2' : ''
                        }`}
                        style={{
                          backgroundColor: selected.includes(interest.id) 
                            ? interest.color
                            : 'transparent',
                          color: selected.includes(interest.id) 
                            ? '#FFFFFF'
                            : CREAM_GHIBLI_THEME.text.primary,
                          ringColor: interest.color,
                        }}
                        whileHover={{ scale: 1.02, backgroundColor: selected.includes(interest.id) ? interest.color : `${interest.color}22` }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          initial={false}
                          animate={{
                            scale: selected.includes(interest.id) ? 1.1 : 1,
                            rotate: selected.includes(interest.id) ? 360 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {interest.icon}
                        </motion.div>
                        <span className="font-medium">{interest.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Past Researches */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <History size={24} style={{ color: CREAM_GHIBLI_THEME.text.primary }} />
            </motion.div>
            <h3 className="text-xl font-semibold" style={{ color: CREAM_GHIBLI_THEME.text.primary }}>
              Past Researches
            </h3>
          </div>

          <div className="grid gap-4">
            {pastResearches.map((research, index) => (
              <motion.button
                key={research.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => {
                  setSearchTopic(research.topic);
                  setSelected([interests.find(i => i.label === research.interest)?.id].filter(Boolean));
                }}
                className="p-4 rounded-xl backdrop-blur-sm text-left flex items-center justify-between group relative overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${CREAM_GHIBLI_THEME.background.overlay}`,
                }}
                whileHover={{ 
                  y: -2,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  style={{
                    background: `linear-gradient(135deg, ${CREAM_GHIBLI_THEME.primary.base}11, ${CREAM_GHIBLI_THEME.accent.base}11)`,
                    filter: 'blur(8px)',
                  }}
                />
                <div>
                  <h4 className="font-medium mb-1" style={{ color: CREAM_GHIBLI_THEME.text.primary }}>
                    {research.topic}
                  </h4>
                  <p className="text-sm" style={{ color: CREAM_GHIBLI_THEME.text.secondary }}>
                    {research.interest} • {research.date}
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  style={{ color: CREAM_GHIBLI_THEME.primary.base }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            ))}
          </div>
        </motion.div>
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
