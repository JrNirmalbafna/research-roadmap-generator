import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResearchFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Topic",
      subtitle: "Enter your research topic",
      icon: "📚",
    },
    {
      id: 2,
      title: "Level",
      subtitle: "Select your expertise",
      icon: "🎯",
    },
    {
      id: 3,
      title: "Format",
      subtitle: "Choose resource type",
      icon: "📋",
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="h-1 w-full bg-gray-800 rounded-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between items-center relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={`flex flex-col items-center ${
              currentStep >= step.id ? 'opacity-100' : 'opacity-60'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className={`w-32 h-32 rounded-full backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer
                ${currentStep === step.id ? 'ring-4 ring-primary ring-opacity-50' : ''}
                ${currentStep > step.id ? 'bg-primary/20' : 'bg-white/5'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(step.id)}
            >
              <span className="text-3xl mb-2">{step.icon}</span>
              <span className="text-sm font-medium">{step.title}</span>
            </motion.div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-300">{step.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12">
        <motion.button
          className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Back
        </motion.button>

        <motion.button
          className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          disabled={currentStep === 3}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default ResearchFlow; 