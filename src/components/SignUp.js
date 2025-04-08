import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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
    availability: [],
    domains: []
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
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/chat');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slideIn">
            <h2 className="text-2xl font-semibold text-center font-mono text-[#FF4B36]">Select Interest Domains</h2>
            <p className="text-center text-gray-600 font-mono">Choose the domains you are interested in.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Computer Vision", "Artificial Intelligence", "Machine Learning", "Deep Learning", "Web Development", "DSA"].map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => {
                    const currentDomains = formData.domains || [];
                    if (!currentDomains.includes(domain)) {
                      setFormData(prev => ({ ...prev, domains: [...currentDomains, domain] }));
                    }
                  }}
                  className="px-3 py-1.5 text-sm rounded-full border border-gray-200 text-gray-700 hover:border-[#FF4B36] hover:bg-[#FF4B36]/5 hover:text-[#FF4B36] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B36] font-mono"
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-slideIn">
            <h2 className="text-2xl font-semibold text-center font-mono text-[#FF4B36]">Weekly Learning Time</h2>
            <p className="text-center text-gray-600 font-mono">Enter the number of hours you can dedicate each week.</p>
            <input
              type="number"
              name="weeklyTime"
              value={formData.weeklyTime}
              onChange={(e) => {
                const value = Math.max(0, Math.min(100, Number(e.target.value)));
                setFormData(prev => ({ ...prev, weeklyTime: value }));
              }}
              placeholder="Enter hours"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all font-mono"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-slideIn">
            <h2 className="text-2xl font-semibold text-center font-mono text-[#FF4B36]">Preferred Learning Methods</h2>
            <p className="text-center text-gray-600 font-mono">Select your preferred learning methods.</p>
            <div className="space-y-3">
              {["Videos", "Articles", "Books", "Documentation"].map((preference) => (
                <label key={preference} className={`flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all font-mono ${formData.learningPreferences.includes(preference) ? 'bg-[#FF4B36] text-white' : ''}`}>
                  <input
                    type="checkbox"
                    name="learningPreferences"
                    value={preference}
                    checked={formData.learningPreferences.includes(preference)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-[#FF4B36] focus:ring-[#FF4B36]"
                  />
                  <span className="text-gray-700 font-mono">{preference}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-slideIn">
            <h2 className="text-2xl font-semibold text-center font-mono text-[#FF4B36]">Proficiency Level</h2>
            <p className="text-center text-gray-600 font-mono">Select your desired proficiency level.</p>
            <div className="space-y-3">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <label key={level} className={`flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all font-mono ${formData.proficiencyLevel === level ? 'bg-[#FF4B36] text-white' : ''}`}>
                  <input
                    type="radio"
                    name="proficiencyLevel"
                    value={level}
                    checked={formData.proficiencyLevel === level}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#FF4B36] focus:ring-[#FF4B36]"
                  />
                  <span className="text-gray-700 font-mono">{level}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-slideIn">
            <h2 className="text-2xl font-semibold text-center font-mono text-[#FF4B36]">Personalization</h2>
            <p className="text-center text-gray-600 font-mono">Customize your learning experience.</p>
            
            {/* Domains of Interest */}
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Select Domains of Interest</label>
              <div className="flex flex-wrap gap-2">
                {["Artificial Intelligence", "Climate Science", "Quantum Computing", "Biotechnology", "Neuroscience"].map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => {
                      const currentDomains = formData.domains || [];
                      if (!currentDomains.includes(domain)) {
                        setFormData(prev => ({ ...prev, domains: [...currentDomains, domain] }));
                      }
                    }}
                    className={`px-3 py-1.5 text-sm rounded-full border border-gray-200 text-gray-700 hover:border-[#FF4B36] hover:bg-[#FF4B36]/5 hover:text-[#FF4B36] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B36] font-mono ${formData.domains.includes(domain) ? 'bg-[#FF4B36] text-white' : ''}`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Learning Time */}
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Weekly Learning Time (hours)</label>
              <input
                type="number"
                name="weeklyTime"
                value={formData.weeklyTime}
                onChange={handleChange}
                placeholder="Enter hours"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 text-gray-900 placeholder-gray-400 font-light bg-white/50 backdrop-blur-sm shadow-sm transition-all"
              />
            </div>

            {/* Learning Preferences */}
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Preferred Learning Methods</label>
              <div className="space-y-3">
                {["Videos", "Articles", "Books", "Documentation"].map((preference) => (
                  <label key={preference} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="learningPreferences"
                      value={preference}
                      checked={formData.learningPreferences.includes(preference)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded text-[#FF4B36] focus:ring-[#FF4B36]"
                    />
                    <span className="text-gray-700">{preference}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Proficiency Level */}
            <div>
              <label className="block text-xs uppercase mb-2 text-gray-500 tracking-wider font-medium">Proficiency Level</label>
              <div className="space-y-3">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="proficiencyLevel"
                      value={level}
                      checked={formData.proficiencyLevel === level}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#FF4B36] focus:ring-[#FF4B36]"
                    />
                    <span className="text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save Preferences</button>
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
    "How do you learn best?"
  ];

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
                {currentStep < 5 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#FF4B36] text-white px-8 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#FF4B36]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ml-auto"
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                {currentStep === 5 && (
                  <button
                    type="submit"
                    className="bg-[#FF4B36] text-white px-8 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#FF4B36]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ml-auto"
                  >
                    Submit
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 