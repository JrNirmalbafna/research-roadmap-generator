import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function NavigationDropdown({ title, items, isMobile, className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => !isMobile && setIsOpen(false)}>
      <button
        className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        style={{ color: title === "Research" ? "#10564F" : "#325158" }}
      >
        <span className="tracking-wide font-bold">{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`${
              isMobile ? 'mt-2 mx-2' : 'absolute left-0 mt-2 w-64'
            } bg-white 
            rounded-lg shadow-lg border border-gray-200 overflow-hidden`}
          >
            <div className="p-4 grid gap-6">
              {items.map((section, index) => (
                <div key={index}>
                  <h3 className="font-bold mb-2 tracking-wide text-[14px]" 
                      style={{ color: title === "Research" ? "#10564F" : "#325158" }}>
                    {section.title}
                  </h3>
                  <div className="grid gap-1">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.href}
                        className="block px-3 py-2 text-black hover:text-[#10564F]/80
                        rounded-md transition-all duration-300 text-[13px]"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavigationDropdown; 