import React from 'react';
import SourceManager from './SourceManager';

const SourcePanel = ({ showSourceManager, setShowSourceManager, onSourceAdd, colors, gemStyles }) => {
  return (
    <div 
      className={`${showSourceManager ? 'w-96' : 'w-16'} transition-all duration-500 ease-in-out relative border-r`}
      style={{ 
        borderColor: colors.border,
        background: colors.surface
      }}
    >
      <button
        onClick={() => setShowSourceManager(!showSourceManager)}
        className="absolute top-4 right-4 p-2 rounded-full transition-all duration-300"
        style={gemStyles.indigoButton}
      >
        <svg 
          className="w-4 h-4 transition-transform duration-300"
          style={{ 
            transform: showSourceManager ? 'rotate(180deg)' : 'rotate(0deg)',
            fill: colors.text,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <div className={`${showSourceManager ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <SourceManager onSourceAdd={onSourceAdd} colors={colors} gemStyles={gemStyles} />
      </div>
    </div>
  );
};

export default SourcePanel; 