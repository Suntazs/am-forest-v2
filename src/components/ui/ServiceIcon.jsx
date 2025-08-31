import React from 'react';

const ServiceIcon = ({ iconPath }) => {
  if (!iconPath) return null;

  return (
    <svg 
      className="w-12 h-12 md:w-14 md:h-14" 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
    >
      {iconPath.map((element, index) => {
        const { type, ...props } = element;
        
        switch (type) {
          case 'circle':
            return <circle key={index} {...props} />;
          case 'rect':
            return <rect key={index} {...props} />;
          case 'path':
            return <path key={index} {...props} />;
          case 'line':
            return <line key={index} {...props} />;
          case 'ellipse':
            return <ellipse key={index} {...props} />;
          case 'polygon':
            return <polygon key={index} {...props} />;
          default:
            return null;
        }
      })}
    </svg>
  );
};

export default ServiceIcon;