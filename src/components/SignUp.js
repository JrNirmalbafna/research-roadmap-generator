import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chat from './Chat';

const SignUp = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const textAreaRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    skills: '',
    proficiencyLevel: '',
    learningPreferences: [],
    weeklyTime: '',
    marketingEmailsOpted: false,
    researchGoals: '',
    preferredResearchMethods: [],
    timeZone: '',
    availability: []
  });

  useEffect(() => {
    // If we're on the /personalize route, start at step 5
    if (location.pathname === '/personalize') {
      setCurrentStep(5);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && (name === 'learningPreferences' || name === 'preferredResearchMethods' || name === 'availability')) {
      const updatedArray = [...(formData[name] || [])];
      if (checked) {
        updatedArray.push(value);
      } else {
        const index = updatedArray.indexOf(value);
        if (index > -1) {
          updatedArray.splice(index, 1);
        }
      }
      setFormData(prev => ({
        ...prev,
        [name]: updatedArray
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowChat(true);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slideIn">
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">First Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="First name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-slideIn">
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">What specific skill(s) are you interested in learning?</label>
              
              {/* Popular categories */}
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Popular Research Domains:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Artificial Intelligence',
                    'Climate Science',
                    'Quantum Computing',
                    'Biotechnology',
                    'Neuroscience',
                    'Renewable Energy',
                    'Data Analytics',
                    'Robotics',
                    'Genomics',
                    'Materials Science',
                    'Computer Vision',
                    'Natural Language Processing',
                    'Sustainable Development',
                    'Machine Learning',
                    'Bioinformatics',
                    { name: 'Others', isSpecial: true }
                  ].map((item) => {
                    const skill = typeof item === 'string' ? item : item.name;
                    const isSpecial = typeof item === 'object' && item.isSpecial;
                    
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => {
                          if (isSpecial) {
                            textAreaRef.current?.focus();
                          } else {
                            const currentSkills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
                            if (!currentSkills.includes(skill)) {
                              const newSkills = [...currentSkills, skill].filter(Boolean).join(', ');
                              setFormData(prev => ({ ...prev, skills: newSkills }));
                            }
                          }
                        }}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all
                          ${isSpecial ? 
                            'border-[#1a4731] text-[#1a4731] hover:bg-[#1a4731] hover:text-white' : 
                            'border-gray-200 text-gray-700 hover:border-[#1a4731] hover:bg-[#1a4731]/5 hover:text-[#1a4731]'
                          }
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a4731]`}
                      >
                        {isSpecial ? skill : `+ ${skill}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skills input */}
              <div className="relative">
                <textarea
                  ref={textAreaRef}
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Enter your research interests (e.g., Deep Learning, Climate Modeling, Quantum Algorithms)..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                    focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 
                    text-gray-900 placeholder-gray-400 font-light bg-white/50 
                    backdrop-blur-sm shadow-sm transition-all min-h-[100px]"
                />
                <div className="mt-2 text-xs text-gray-500">
                  Separate multiple research areas with commas. You can also click on the domains above to add them.
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-slideIn">
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">What is your current proficiency level?</label>
              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label key={level} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="proficiencyLevel"
                      value={level}
                      checked={formData.proficiencyLevel === level}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#1a4731] focus:ring-[#1a4731]"
                    />
                    <span className="text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-slideIn">
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">How do you prefer to learn?</label>
              <div className="space-y-3">
                {['Videos', 'Articles', 'Books', 'Project-based'].map((preference) => (
                  <label key={preference} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="learningPreferences"
                      value={preference}
                      checked={formData.learningPreferences.includes(preference)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded text-[#1a4731] focus:ring-[#1a4731]"
                    />
                    <span className="text-gray-700">{preference}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-slideIn">
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">What are your research goals?</label>
              <textarea
                name="researchGoals"
                value={formData.researchGoals}
                onChange={handleChange}
                placeholder="Describe your research objectives and what you hope to achieve..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Preferred Research Methods</label>
              <div className="space-y-3">
                {['Experimental', 'Theoretical', 'Computational', 'Field Research', 'Literature Review'].map((method) => (
                  <label key={method} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="preferredResearchMethods"
                      value={method}
                      checked={formData.preferredResearchMethods.includes(method)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded text-[#1a4731] focus:ring-[#1a4731]"
                    />
                    <span className="text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Time Zone</label>
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all"
              >
                <option value="">Select your time zone</option>
                <option value="UTC-12">UTC-12</option>
                <option value="UTC-8">UTC-8</option>
                <option value="UTC-5">UTC-5</option>
                <option value="UTC+0">UTC+0</option>
                <option value="UTC+1">UTC+1</option>
                <option value="UTC+5:30">UTC+5:30</option>
                <option value="UTC+8">UTC+8</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Preferred Research Times</label>
              <div className="space-y-3">
                {['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)'].map((time) => (
                  <label key={time} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="availability"
                      value={time}
                      checked={formData.availability.includes(time)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded text-[#1a4731] focus:ring-[#1a4731]"
                    />
                    <span className="text-gray-700">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    "Let's get to know you better",
    "What would you like to learn?",
    "What's your experience level?",
    "How do you learn best?",
    "Planning your journey"
  ];

  if (showChat) {
    return <Chat userProfile={formData} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image layer with blur and gradient overlay */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat z-0"
        style={{
          backgroundImage: 'url("/images/dessert%20background.jpg")',
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
        <div className="w-full max-w-[600px] mx-6">
          {/* Multiple layered shadows for depth */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 
            shadow-[0_8px_32px_rgb(0,0,0,0.15)] 
            border border-white/50
            relative
            before:absolute before:inset-0 before:-z-10 before:blur-xl before:bg-gradient-to-b before:from-white/20 before:to-white/40
            after:absolute after:inset-0 after:-z-20 after:blur-2xl after:bg-gradient-to-t after:from-white/20 after:to-transparent">
            
            {/* Step indicators */}
            <div className="flex justify-center gap-4 mb-12">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    currentStep === step
                      ? 'bg-[#ffe8e8] text-black shadow-sm scale-110'
                      : step < currentStep
                      ? 'text-[#1a4731] scale-100'
                      : 'text-gray-400 scale-95'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Social Sign In Buttons - Only shown in step 1 */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 mb-8 items-center">
                <button 
                  onClick={() => window.location.href = '/auth/google'}
                  className="flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      className="fill-[#4285F4]"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      className="fill-[#34A853]"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      className="fill-[#FBBC05]"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      className="fill-[#EA4335]"
                    />
                  </svg>
                  <span className="text-white text-lg group-hover:text-white/90">Continue with Google</span>
                </button>

                <button 
                  onClick={() => window.location.href = '/auth/github'}
                  className="flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                  <span className="text-white text-lg group-hover:text-white/90">Continue with GitHub</span>
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <h1 className="text-[32px] text-center font-light mb-12 tracking-tight">
                {stepTitles[currentStep - 1]}
              </h1>

              {renderStep()}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-600 px-8 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#1a4731] text-white px-8 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#153a28] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ml-auto"
                >
                  {currentStep === 5 ? 'Submit' : 'Continue'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 