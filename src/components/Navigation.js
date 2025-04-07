import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import NavigationDropdown from './NavigationDropdown';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const StepNumber = styled.div`
  position: absolute;
  left: -2.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 5rem;
  height: 5rem;
  background: rgba(26, 27, 59, 0.8);
  border: 2px solid rgba(255, 62, 138, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Audiowide', cursive;
  font-size: 1.5rem;
  color: #FF3E8A;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  box-shadow: 0 0 20px rgba(255, 62, 138, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #FF3E8A, #6B2FD9);
    z-index: -1;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    opacity: 0.5;
  }
`;

const TimelineStep = styled.div`
  position: relative;
  padding: 2.5rem;
  background: rgba(26, 27, 59, 0.3);
  border-left: 4px solid #FF3E8A;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:hover {
    transform: translateX(10px) rotateY(-2deg);
    background: rgba(26, 27, 59, 0.5);
    border-left: 4px solid #FF3E8A;
    box-shadow: 
      -10px 10px 30px rgba(255, 62, 138, 0.1),
      0 0 30px rgba(255, 62, 138, 0.1);

    ${StepNumber} {
      transform: translateX(-20px) scale(1.1);
      box-shadow: 
        0 0 30px rgba(255, 62, 138, 0.4),
        inset 0 0 20px rgba(255, 62, 138, 0.4);
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 62, 138, 0.1),
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const GlowingText = styled.span`
  display: block;
  color: white;
  font-family: ${props => props.font};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: ${props => props.tracking || 'normal'};
  font-size: ${props => props.size || 'inherit'};
  margin-top: ${props => props.mt || '0'};
  opacity: 0.9;
  transition: all 0.3s ease;
  position: relative;
  font-weight: ${props => props.weight || 'normal'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    
    &::after {
      transform: scaleX(1);
    }
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(11, 18, 33, 0.7), rgba(11, 18, 33, 0.3));
  backdrop-filter: blur(2px);
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255, 62, 138, 0.1), rgba(107, 47, 217, 0.1));
    opacity: 0.5;
    animation: ${pulse} 4s infinite;
  }
`;

const CyberButton = styled.button`
  position: relative;
  overflow: hidden;
  background: ${props => props.primary ? 
    'linear-gradient(45deg, rgba(255, 62, 138, 0.1), rgba(107, 47, 217, 0.1))' : 
    'rgba(255, 255, 255, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.primary ? 
      'linear-gradient(45deg, rgba(255, 62, 138, 0.2), rgba(107, 47, 217, 0.2))' : 
      'rgba(255, 255, 255, 0.1)'};
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? 
      '0 0 25px rgba(255, 62, 138, 0.3)' : 
      '0 0 25px rgba(107, 47, 217, 0.3)'};
    
    &::before {
      transform: translateX(0);
    }
  }
`;

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = {
    research: {
      title: "Research",
      items: [
        {
          title: "Research Tools",
          items: [
            { name: "Roadmap Generator", href: "/roadmap" },
            { name: "Literature Review", href: "/literature" },
            { name: "Citation Manager", href: "/citations" }
          ]
        },
        {
          title: "Resources",
          items: [
            { name: "Research Guides", href: "/guides" },
            { name: "Templates", href: "/templates" },
            { name: "Best Practices", href: "/practices" }
          ]
        }
      ]
    },
    collaborate: {
      title: "Collaborate",
      items: [
        {
          title: "Team Features",
          items: [
            { name: "Project Spaces", href: "/projects" },
            { name: "Shared Libraries", href: "/libraries" },
            { name: "Discussion Forums", href: "/forums" }
          ]
        },
        {
          title: "Community",
          items: [
            { name: "Research Groups", href: "/groups" },
            { name: "Expert Network", href: "/experts" },
            { name: "Events", href: "/events" }
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1221]">
      {/* Header */}
      <nav className="bg-[#1A1B3B]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <svg 
                className="h-10 w-10 text-[#FF3E8A] drop-shadow-[0_0_10px_rgba(255,62,138,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(255,62,138,0.7)] transition-all" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer square with rounded corners */}
                <rect 
                  x="4" 
                  y="4" 
                  width="32" 
                  height="32" 
                  rx="8"
                  className="stroke-current opacity-40"
                  strokeWidth="2"
                />
                
                {/* Inner rotating square */}
                <rect 
                  x="20" 
                  y="10.86" 
                  width="13" 
                  height="13" 
                  className="stroke-current opacity-60"
                  strokeWidth="2"
                  transform="rotate(45 20 20)"
                />

                {/* Center circle */}
                <circle 
                  cx="20" 
                  cy="20" 
                  r="6" 
                  className="stroke-current fill-current opacity-90"
                  strokeWidth="1"
                />

                {/* Decorative corner circles */}
                <circle cx="8" cy="8" r="2" className="fill-current animate-pulse"/>
                <circle cx="32" cy="8" r="2" className="fill-current animate-pulse"/>
                <circle cx="8" cy="32" r="2" className="fill-current animate-pulse"/>
                <circle cx="32" cy="32" r="2" className="fill-current animate-pulse"/>

                {/* Center dot */}
                <circle cx="20" cy="20" r="1.5" className="fill-white"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all tracking-wider">PATHFINDERS</span>
                <span className="text-[0.65rem] text-[#FF3E8A] tracking-[0.3em] font-light">RESEARCH LABS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(navigationItems).map(([key, item]) => (
                <NavigationDropdown
                  key={key}
                  title={item.title}
                  items={item.items}
                />
              ))}
              <Link 
                to="/signin" 
                className="bg-[#FF3E8A]/20 hover:bg-[#FF3E8A]/30 text-white px-6 py-2 rounded-full transition-all hover:transform hover:-translate-y-0.5 border border-[#FF3E8A]/30 hover:border-[#FF3E8A]/50 shadow-[0_0_15px_rgba(255,62,138,0.2)] hover:shadow-[0_0_20px_rgba(255,62,138,0.3)]"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#FF3E8A] hover:text-[#FF3E8A]/80 focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1A1B3B]/95 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.entries(navigationItems).map(([key, item]) => (
                <NavigationDropdown
                  key={key}
                  title={item.title}
                  items={item.items}
                  isMobile={true}
                />
              ))}
              <Link 
                to="/signin"
                className="block px-4 py-2 text-white bg-[#FF3E8A]/20 hover:bg-[#FF3E8A]/30 rounded-lg transition-all mt-4 border border-[#FF3E8A]/30 hover:border-[#FF3E8A]/50"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main content section */}
      <div className="flex-1 relative">
        {/* Hero section with image */}
        <div className="h-screen relative">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[1300px] h-full relative">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 hover:scale-105 hover:brightness-125" 
                style={{ 
                  backgroundImage: `url(${process.env.PUBLIC_URL}/images/flower-background.jpg)`,
                  filter: 'brightness(1.2)'
                }} 
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <BackgroundGlow />
                
                <div className="relative max-w-4xl text-center space-y-8 px-4">
                  {/* Shadow layer for depth */}
                  <h1 className="absolute inset-0 text-7xl font-light text-white/10 leading-tight blur-2xl select-none transform translate-y-1">
                    Research Roadmap
                    <span className="block mt-2">Generator</span>
                  </h1>
                  
                  {/* Main text with enhanced visibility */}
                  <h1 className="relative text-7xl font-semibold leading-tight">
                    <GlowingText
                      font="'Space Mono', monospace"
                      tracking="0.05em"
                      size="4.5rem"
                      weight="700"
                    >
                      Research Roadmap
                    </GlowingText>
                    <GlowingText
                      font="'Space Mono', monospace"
                      tracking="0.1em"
                      size="3.5rem"
                      mt="0.5rem"
                      weight="400"
                    >
                      Generator
                    </GlowingText>
                  </h1>

                  {/* Subtitle with better visibility */}
                  <p className="relative text-2xl font-normal tracking-wide max-w-2xl mx-auto">
                    <GlowingText
                      font="'Space Mono', monospace"
                      size="1.5rem"
                      weight="400"
                    >
                      Navigate your research journey through enchanted pathways
                    </GlowingText>
                  </p>

                  {/* Enhanced buttons with cyberpunk elements */}
                  <div className="relative flex gap-6 mt-12 justify-center">
                    <Link to="/signin">
                      <CyberButton 
                        primary
                        className="group px-10 py-4 text-white text-lg font-normal tracking-wider rounded-full"
                      >
                        <span className="block relative z-10 group-hover:scale-105 transition-transform font-['Titillium Web']">
                          Begin your Journey
                        </span>
                      </CyberButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="w-full min-h-screen bg-[#0B1221] py-24">
          <div className="max-w-5xl mx-auto px-16">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold relative inline-block mb-4">
                <GlowingText
                  font="'Audiowide', cursive"
                  size="2.5rem"
                  weight="400"
                  tracking="0.1em"
                >
                  Research Odyssey
                </GlowingText>
              </h2>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#FF3E8A] to-transparent"></div>
            </div>
            
            <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Topic Definition",
                  description: "Define your research area and specific focus using AI-powered topic analysis",
                  icon: "🎯"
                },
                {
                  step: "02",
                  title: "Literature Review",
                  description: "Discover and analyze relevant papers and publications in your field",
                  icon: "📚"
                },
                {
                  step: "03",
                  title: "Methodology Planning",
                  description: "Design your research approach with expert guidance and best practices",
                  icon: "🔍"
                },
                {
                  step: "04",
                  title: "Resource Allocation",
                  description: "Plan and organize your research resources, timeline, and milestones",
                  icon: "⚡"
                },
                {
                  step: "05",
                  title: "Execution & Analysis",
                  description: "Conduct your research with real-time progress tracking and analysis tools",
                  icon: "📊"
                }
              ].map((item) => (
                <TimelineStep key={item.step}>
                  <StepNumber>{item.step}</StepNumber>
                  <div className="ml-8">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="text-xl">
                        <GlowingText
                          font="'Audiowide', cursive"
                          size="1.25rem"
                          weight="600"
                          tracking="0.05em"
                        >
                          {item.title}
                        </GlowingText>
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base pl-12 border-l-2 border-[#FF3E8A]/20">
                      {item.description}
                    </p>
                  </div>
                </TimelineStep>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation; 