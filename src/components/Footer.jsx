import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1B3B]/80 backdrop-blur-md border-t border-white/10 py-12 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF3E8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">+91 XXXXXXXXXX</a>
              </p>
              <p className="text-gray-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF3E8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@pathfinders.com" className="hover:text-white transition-colors">contact@pathfinders.com</a>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Our Location</h3>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#FF3E8A] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Pathfinders Research Labs<br />
                  Indore, Madhya Pradesh<br />
                  India
                </span>
              </p>
            </div>
          </div>

          {/* GitHub Contribution */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contribute</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                This is an open-source project. We welcome contributions from the community!
              </p>
              <a 
                href="https://github.com/pathfinders/research-roadmap-generator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#FF3E8A]/20 hover:bg-[#FF3E8A]/30 text-white rounded-full transition-all hover:transform hover:-translate-y-0.5 border border-[#FF3E8A]/30 hover:border-[#FF3E8A]/50 shadow-[0_0_15px_rgba(255,62,138,0.2)] hover:shadow-[0_0_20px_rgba(255,62,138,0.3)]"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Contribute on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pathfinders Research Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 