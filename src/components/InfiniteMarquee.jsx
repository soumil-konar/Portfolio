import React from 'react';

const InfiniteMarquee = ({ children, direction = 'left', speed = 25, className = '' }) => {
  const animationClass = direction === 'left' ? 'animate-left' : 'animate-right';

  return (
    <div className={`overflow-hidden flex w-full ${className}`}>
      <div 
        className={`flex w-max min-w-full shrink-0 items-center justify-around gap-8 ${animationClass}`} 
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {/* Duplicate children to create the seamless loop effect */}
        {children}
      </div>
    </div>
  );
};

export default InfiniteMarquee;