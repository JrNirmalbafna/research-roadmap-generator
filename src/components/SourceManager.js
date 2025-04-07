import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SourceManager = ({ onSourceAdd, colors, gemStyles }) => {
  const [sources, setSources] = useState([]);
  const [isDropping, setIsDropping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // File type icons mapping
  const fileTypeIcons = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    txt: '📋',
    mp4: '🎥',
    mp3: '🎵',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    default: '📄'
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDropping(true);
  };

  const handleDragLeave = () => {
    setIsDropping(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropping(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach(file => {
      const source = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: getFileType(file),
        size: formatFileSize(file.size),
        file: file,
        progress: 0
      };

      setSources(prev => [...prev, source]);
      simulateUpload(source.id);
    });
  };

  const getFileType = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    return extension;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = (id) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(prev => ({ ...prev, [id]: progress }));
      
      if (progress >= 100) {
        clearInterval(interval);
        const source = sources.find(s => s.id === id);
        if (source) {
          onSourceAdd(source);
        }
      }
    }, 100);
  };

  const handleSourceDelete = (id) => {
    setSources(prev => prev.filter(source => source.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-3">
          <svg 
            className="w-5 h-5"
            viewBox="0 0 24 24"
            style={{ fill: colors.text }}
          >
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
          <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Sources</h2>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
          style={{
            ...gemStyles.indigoButton,
            background: colors.accent1
          }}
        >
          <svg 
            className="w-5 h-5"
            viewBox="0 0 24 24"
            style={{ fill: colors.text }}
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.mp4,.mp3,.jpg,.jpeg,.png,.gif"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Drop Zone - Always visible */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`m-4 p-6 rounded-xl border-2 border-dashed transition-all duration-300 text-center ${
            isDropping ? 'border-accent1 bg-accent1/10' : 'border-accent3'
          }`}
          style={{ 
            background: colors.surface,
            borderColor: isDropping ? colors.accent1 : colors.accent3
          }}
        >
          <p style={{ color: colors.text }}>
            Drop files here
          </p>
          <p className="text-sm mt-2" style={{ color: colors.textDim }}>
            or click + to upload from your device
          </p>
        </div>

        {/* Sources List */}
        <div className="space-y-2 p-4">
          <AnimatePresence>
            {sources.map(source => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 rounded-xl"
                style={gemStyles.purpleCard}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span role="img" aria-label="file type">
                      {fileTypeIcons[source.type] || fileTypeIcons.default}
                    </span>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[180px]" style={{ color: colors.text }}>
                        {source.name}
                      </p>
                      <p className="text-xs" style={{ color: colors.textDim }}>
                        {source.size}
                      </p>
                    </div>
                  </div>

                  {uploadProgress[source.id] !== undefined && uploadProgress[source.id] < 100 ? (
                    <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: colors.surface }}>
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${uploadProgress[source.id]}%`,
                          background: colors.accent1
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSourceDelete(source.id)}
                      className="p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
                      style={{ color: colors.text }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sources.length === 0 && (
            <div
              className="text-center p-8 rounded-xl"
              style={{ background: colors.surface }}
            >
              <p style={{ color: colors.textDim }}>
                No sources added yet
              </p>
              <p className="text-sm mt-2" style={{ color: colors.textDim }}>
                Click + to upload or drag and drop files here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceManager; 