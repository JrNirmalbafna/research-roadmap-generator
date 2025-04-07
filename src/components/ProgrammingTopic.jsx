import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProgrammingTopic = () => {
  const { topic } = useParams();
  
  // Convert URL parameter to a more readable format
  const formatTopic = (topic) => {
    if (topic === 'dsa') return 'Data Structures & Algorithms';
    if (topic === 'cpp') return 'C++';
    return topic.charAt(0).toUpperCase() + topic.slice(1);
  };

  return (
    <div className="min-h-screen bg-[#0B1221] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-[#FF3E8A] hover:text-white transition-colors mb-8"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 text-[#FF3E8A]">
          {formatTopic(topic)} Research
        </h1>
        
        <div className="bg-[#1A1B3B]/80 backdrop-blur-md p-6 rounded-lg border border-white/10 shadow-lg">
          <p className="text-lg mb-4">
            This is a placeholder page for {formatTopic(topic)} research content.
          </p>
          <p className="text-white/70">
            You can customize this page with specific content, resources, and research materials for {formatTopic(topic)}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingTopic; 