import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Clock, X, Menu, LogOut } from 'lucide-react';

const RoadmapInterface = ({ onClose }) => {
  const [promptPanelOpen, setPromptPanelOpen] = useState(false);
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);
  
  // DARK_GHIBLI_THEME from App.js for consistency
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
      light: 'rgba(184, 198, 255, 0.85)'
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
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
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-10"
        style={{
          backgroundColor: 'rgba(10, 13, 22, 0.95)',
          borderBottom: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`,
          height: '48px'
        }}
      >
        <div className="flex justify-between items-center h-full px-6">
          {/* Left Header - History Title */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setHistoryPanelOpen(!historyPanelOpen)}
              className="p-1.5 rounded-full sm:hidden"
              whileHover={{ scale: 1.05 }}
              style={{ color: DARK_GHIBLI_THEME.text.primary }}
            >
              <Menu size={18} />
            </motion.button>
            <motion.div 
              onClick={() => setHistoryPanelOpen(!historyPanelOpen)}
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Clock size={18} style={{ color: DARK_GHIBLI_THEME.text.primary }} />
              <h3 
                className="text-lg font-heading"
                style={{ 
                  color: DARK_GHIBLI_THEME.text.primary,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em'
                }}
              >
                History
              </h3>
            </motion.div>
          </div>
          
          {/* Center Header - Title */}
          <h2 className="text-lg font-heading"
            style={{ 
              color: DARK_GHIBLI_THEME.text.primary,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.02em'
            }}
          >
            Research Roadmap
          </h2>
          
          {/* Right Header - Prompt Button */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setPromptPanelOpen(!promptPanelOpen)}
              className="p-1.5 rounded-full flex items-center gap-2"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
              style={{ color: DARK_GHIBLI_THEME.text.primary }}
            >
              <MessageSquare size={13} />
              <span className="hidden sm:inline">Prompt</span>
            </motion.button>
            
            <motion.button
              onClick={onClose}
              className="p-1.5 rounded-full"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
              style={{ color: DARK_GHIBLI_THEME.text.primary }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Main Content - Roadmap Image */}
      <div className={`pt-16 flex items-center justify-center min-h-screen transition-all duration-300 ${(promptPanelOpen || historyPanelOpen) ? 'filter blur-sm' : ''}`}>
        <div className="max-w-5xl w-full p-6">
          <img 
            src="/Screenshot 2025-04-06 104955.png" 
            alt="Research Roadmap"
            className="w-full h-auto rounded-lg shadow-2xl"
            style={{
              border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
            }}
          />
        </div>
      </div>
      
      {/* History Panel - Left Side */}
      <AnimatePresence>
        {historyPanelOpen && (
          <motion.div 
            className="fixed top-0 left-0 bottom-0 z-20 overflow-y-auto pt-16"
            style={{
              width: '300px',
              backgroundColor: 'rgba(10, 13, 22, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRight: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
            }}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
              <h3 className="text-lg font-heading" style={{ color: DARK_GHIBLI_THEME.text.primary }}>History</h3>
              <motion.button
                onClick={() => setHistoryPanelOpen(false)}
                whileHover={{ scale: 1.1 }}
                style={{ color: DARK_GHIBLI_THEME.text.secondary }}
              >
                <X size={18} />
              </motion.button>
            </div>
            <div className="p-4 space-y-3">
              {/* Sample history items */}
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
                  }}
                >
                  <div style={{ color: DARK_GHIBLI_THEME.text.primary }}>Research Session {item}</div>
                  <div className="text-sm" style={{ color: DARK_GHIBLI_THEME.text.secondary }}>
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
              <motion.button
                onClick={onClose}
                className="w-full py-2 rounded-lg flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, 
                    ${DARK_GHIBLI_THEME.accent.dark},
                    ${DARK_GHIBLI_THEME.accent.base}
                  )`,
                  color: '#FFFFFF'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Prompt Panel - Right Side */}
      <AnimatePresence>
        {promptPanelOpen && (
          <motion.div 
            className="fixed top-0 right-0 bottom-0 z-20 overflow-y-auto pt-16"
            style={{
              width: '350px',
              backgroundColor: 'rgba(10, 13, 22, 0.9)',
              backdropFilter: 'blur(10px)',
              borderLeft: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`
            }}
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
              <h3 className="text-lg font-heading" style={{ color: DARK_GHIBLI_THEME.text.primary }}>Prompt</h3>
              <motion.button
                onClick={() => setPromptPanelOpen(false)}
                whileHover={{ scale: 1.1 }}
                style={{ color: DARK_GHIBLI_THEME.text.secondary }}
              >
                <X size={18} />
              </motion.button>
            </div>
            <div className="p-4">
              <textarea
                placeholder="Enter your prompt here..."
                className="w-full h-40 p-3 rounded-lg resize-none"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${DARK_GHIBLI_THEME.background.overlay}`,
                  color: DARK_GHIBLI_THEME.text.primary
                }}
              />
              <motion.button
                className="w-full mt-3 py-2 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, 
                    ${DARK_GHIBLI_THEME.primary.base},
                    ${DARK_GHIBLI_THEME.accent.base}
                  )`,
                  color: '#FFFFFF'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoadmapInterface; 