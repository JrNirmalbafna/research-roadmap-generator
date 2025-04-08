import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import '../styles/PersonalizationForm.css';

const PersonalizationForm = ({ onSubmit, onGenerateClick }) => {
  const [formData, setFormData] = useState({
    // Learning Background & Goals
    skills: [],
    proficiencyLevel: '',
    learningMotivation: '',
    timeline: '',
    relatedExperience: '',

    // Learning Preferences
    preferredLearningMethods: [],
    dailyTimeCommitment: '',
    learningStyle: '',
    theoreticalVsPractical: '',
    interestedInCertifications: false,

    // Technical Context
    existingTools: [],
    technicalLimitations: '',

    // Learning History
    previousAttempts: '',
    effectiveResources: '',
    learningChallenges: '',

    // Project Context
    specificProject: '',
    problemToSolve: '',
    industryContext: '',

    // Additional Preferences
    resourcePreference: '',
    learningEnvironment: '',
    assessmentFrequency: '',
    desiredDepth: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
    onGenerateClick?.(formData);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    {
      title: "Learning Background & Goals",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">What specific skill(s) are you looking to learn?</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter skills (comma separated)"
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] placeholder-[#4A5568] focus:outline-none focus:border-[#2A4365]
                focus:ring-2 focus:ring-[#2A4365]
                focus:ring-2 focus:ring-[#2A4365]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">What is your current proficiency level?</label>
            <select
              name="proficiencyLevel"
              value={formData.proficiencyLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] focus:outline-none focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20"
            >
              <option value="">Select proficiency level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">Why are you interested in learning this skill?</label>
            <select
              name="learningMotivation"
              value={formData.learningMotivation}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] focus:outline-none focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20"
            >
              <option value="">Select motivation</option>
              <option value="career">Career advancement</option>
              <option value="project">Personal project</option>
              <option value="academic">Academic requirement</option>
              <option value="curiosity">Curiosity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">What is your timeline for learning?</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] focus:outline-none focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20"
            >
              <option value="">Select timeline</option>
              <option value="1week">1 week</option>
              <option value="1month">1 month</option>
              <option value="3months">3 months</option>
              <option value="6months">6+ months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">Related experience or prerequisites?</label>
            <textarea
              name="relatedExperience"
              value={formData.relatedExperience}
              onChange={handleChange}
              placeholder="List any related skills or experience"
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] placeholder-[#4A5568] focus:outline-none focus:border-[#2A4365]
                focus:ring-2 focus:ring-[#2A4365]/20 min-h-[100px]"
            />
          </div>
        </div>
      )
    },
    {
      title: "Learning Preferences",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">How do you prefer to learn?</label>
            <div className="grid grid-cols-2 gap-3">
              {['Videos', 'Articles', 'Interactive exercises', 'Books', 'Project-based learning'].map(method => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="preferredLearningMethods"
                    value={method.toLowerCase()}
                    checked={formData.preferredLearningMethods.includes(method.toLowerCase())}
                    onChange={handleMultiSelect}
                    className={`rounded border-[#2A4365] text-[#2A4365] focus:ring-[#2A4365] ${formData.preferredLearningMethods.includes(method.toLowerCase()) ? 'text-[#FF4B36]' : ''}`}
                  />
                  <span className={`text-sm ${formData.preferredLearningMethods.includes(method.toLowerCase()) ? 'text-[#FF4B36]' : 'text-[#2A4365]'}`}>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">Daily time commitment?</label>
            <select
              name="dailyTimeCommitment"
              value={formData.dailyTimeCommitment}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] focus:outline-none focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20"
            >
              <option value="">Select time commitment</option>
              <option value="0-1">0-1 hour</option>
              <option value="1-2">1-2 hours</option>
              <option value="2+">2+ hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">Learning style preference?</label>
            <select
              name="learningStyle"
              value={formData.learningStyle}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] focus:outline-none focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20"
            >
              <option value="">Select learning style</option>
              <option value="structured">Structured curriculum</option>
              <option value="self-directed">Self-directed exploration</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">Theoretical vs Practical preference?</label>
            <select
              name="theoreticalVsPractical"
              value={formData.theoreticalVsPractical}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] focus:outline-none focus:border-[#2A4365] focus:ring-2 focus:ring-[#2A4365]/20"
            >
              <option value="">Select preference</option>
              <option value="theoretical">Theoretical foundations first</option>
              <option value="practical">Learning through practical application</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="interestedInCertifications"
              checked={formData.interestedInCertifications}
              onChange={handleChange}
              className="rounded border-[#2A4365] text-[#2A4365] focus:ring-[#2A4365]"
            />
            <label className="ml-2 text-sm text-[#2A4365]">Interested in earning certifications?</label>
          </div>
        </div>
      )
    },
    {
      title: "Technical Context",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">What sources do you prefer?</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Research Papers',
                'Conference Proceedings',
                'Technical Documentation',
                'Industry Reports'
              ].map(source => (
                <label key={source} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="existingTools"
                    value={source.toLowerCase()}
                    checked={formData.existingTools.includes(source.toLowerCase())}
                    onChange={handleMultiSelect}
                    className="rounded border-[#2A4365] text-[#2A4365] focus:ring-[#2A4365]"
                  />
                  <span className="text-sm text-[#2A4365]">{source}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A4365] mb-2">Technical limitations?</label>
            <textarea
              name="technicalLimitations"
              value={formData.technicalLimitations}
              onChange={handleChange}
              placeholder="List any technical limitations (internet access, computing power, etc.)"
              className="w-full px-4 py-2 rounded-xl bg-white/80 border border-[#2A4365]/20
                text-[#2A4365] placeholder-[#4A5568] focus:outline-none focus:border-[#2A4365]
                focus:ring-2 focus:ring-[#2A4365]/20 min-h-[100px]"
            />
          </div>
        </div>
      )
    }
  ];

  const calculateProgress = () => {
    const totalSteps = steps.length;
    return ((currentStep + 1) / totalSteps) * 100;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            backgroundImage: 'url(/images/ocean%20background..png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Softer overlay to let more of the background show through */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff80] to-[#ffffff60] backdrop-blur-[2px]"></div>
          
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="w-full max-w-2xl relative z-10"
          >
            {/* Progress Bar */}
            <div className="mb-6 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#2A4365] text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  Level {currentStep + 1}
                </span>
                <span className="text-[#2A4365] text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  {calculateProgress()}% Complete
                </span>
              </div>
              <div className="h-3 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/50
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_2px_10px_rgba(59,130,246,0.1)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#4A5568] to-[#2D3748]
                    shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                />
              </div>
            </div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gradient-to-b from-white/95 via-white/90 to-white/85
                rounded-2xl p-6 border border-white/40 backdrop-blur-md
                hover:border-white/60 transition-all duration-300
                shadow-[0_10px_50px_-12px_rgba(59,130,246,0.25),0_0_0_1px_rgba(255,255,255,0.3),0_0_40px_rgba(59,130,246,0.15)]
                hover:shadow-[0_20px_70px_-12px_rgba(59,130,246,0.35),0_0_0_1px_rgba(255,255,255,0.5),0_0_60px_rgba(59,130,246,0.25)]
                max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-medium text-[#2A4365] tracking-wide mb-1 
                    drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-[#4A5568] text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                    Quest {currentStep + 1} of {steps.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <motion.div
                      key={index}
                      initial={false}
                      animate={{
                        scale: index === currentStep ? 1.2 : 1,
                        backgroundColor: index === currentStep ? '#2D3748' : '#E2E8F0'
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                        ${index <= currentStep ? 'bg-[#2D3748]' : 'bg-[#E2E8F0]'}
                        ${index === currentStep ? 'ring-4 ring-[#2D3748]/20 shadow-[0_0_15px_rgba(45,55,72,0.3)]' : ''}
                        border border-white`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="form-content"
              >
                <div className="space-y-4">
                  {steps[currentStep].content}
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t border-[#2A4365]/20">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-[#2A4365]/10 text-[#2A4365] 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-[#2A4365]/20 transition-all duration-300
                    flex items-center gap-2 backdrop-blur-sm border border-[#2A4365]/20
                    shadow-[0_2px_10px_rgba(42,67,101,0.1)]
                    hover:shadow-[0_4px_15px_rgba(42,67,101,0.2)]
                    text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Quest
                </motion.button>
                {currentStep < steps.length - 1 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A4365] to-[#4A5568] text-white
                      font-medium flex items-center gap-2 shadow-lg hover:shadow-xl 
                      shadow-[0_4px_15px_rgba(42,67,101,0.2)]
                      hover:shadow-[0_8px_25px_rgba(42,67,101,0.3)]
                      border border-[#2A4365]/20
                      text-sm"
                  >
                    Next Quest
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2A4365] to-[#4A5568] text-white
                      font-medium flex items-center gap-2 shadow-lg hover:shadow-xl
                      shadow-[0_4px_15px_rgba(42,67,101,0.2)]
                      hover:shadow-[0_8px_25px_rgba(42,67,101,0.3)]
                      border border-[#2A4365]/20
                      text-sm"
                  >
                    Generate
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

PersonalizationForm.propTypes = {
  onSubmit: PropTypes.func,
  onGenerateClick: PropTypes.func
};

PersonalizationForm.defaultProps = {
  onSubmit: () => {},
  onGenerateClick: () => {}
};

export default PersonalizationForm; 