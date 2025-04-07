import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalizationForm from './PersonalizationForm';
import Chat from './Chat';

const LearningInterface = ({ onSubmit, initialData }) => {
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState(initialData || null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    onSubmit?.(data);
  };

  const handleGenerateClick = (data) => {
    setFormData(data);
    setShowChat(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!showChat ? (
        <PersonalizationForm 
          onSubmit={handleFormSubmit}
          onGenerateClick={handleGenerateClick}
          initialData={initialData}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Chat userPreferences={formData} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LearningInterface; 