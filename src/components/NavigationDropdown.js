import React from 'react';
import { Link } from 'react-router-dom';

const NavigationDropdown = ({ title, items, isMobile = false }) => {
  return (
    <div className={`${isMobile ? 'w-full' : 'relative group'}`}>
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform group-hover:rotate-180 ${isMobile ? 'rotate-0' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {/* Dropdown menu */}
      <div className={`
        ${isMobile ? 'mt-2 w-full' : 'absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible'}
        bg-black/95 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-200 ease-in-out
      `}>
        <div className="py-2">
          {items.map((section, index) => (
            <div key={index} className="px-4 py-2">
              {section.title && (
                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.href}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationDropdown; 