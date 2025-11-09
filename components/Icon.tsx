
import React from 'react';

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return <i className={`fa-solid ${icon} ${className}`}></i>;
};

export default Icon;
