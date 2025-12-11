import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Images/fullLogo.png';

const Homepage = () => {
  const navigate = useNavigate();

  const pages = [
    { id: 1, title: 'Landing Page 1', path: '/page1', description: 'Explore our first landing experience' },
    { id: 2, title: 'Landing Page 2', path: '/page2', description: 'Discover our second showcase' },
    { id: 3, title: 'Landing Page 3', path: '/page3', description: 'Visit our third destination' }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${Logo})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 "></div>

      {/* Space-themed background dots */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-24 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-64 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-yellow-400 mb-4">Welcome</h1>
          <p className="text-xl text-blue-100">Choose your destination</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              onClick={() => navigate(page.path)}
              className="bg-blue-800 bg-opacity-90 border-2 border-yellow-400 rounded-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-blue-900">{page.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-3">{page.title}</h2>
                <p className="text-blue-100 mb-6">{page.description}</p>
                <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300">
                  Visit Page
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-blue-200">Select a page to begin your journey</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;