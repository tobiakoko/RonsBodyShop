import React from 'react';

const Logo: React.FC = () => (
  <a
    href="https://tobiakoko.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 group transition-colors duration-200"
    aria-label="Visit Tobi Akoko's website"
  >
    {/* Logo Icon */}
    <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center group-hover:bg-gray-700 transition-colors">
      <span className="text-white font-bold text-xs">TA</span>
    </div>
    
    {/* Text */}
    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
      Tobi Akoko
    </span>
  </a>
);

export default Logo;