import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'forest' | 'fresh' | 'amber' | 'soil' | 'gray';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'forest',
  className = '',
  size = 'md'
}) => {
  const variantStyles = {
    forest: 'bg-forest-100 text-forest-800 border-forest-200',
    fresh: 'bg-green-100 text-green-800 border-green-200',
    amber: 'bg-amber-100 text-amber-900 border-amber-200',
    soil: 'bg-amber-50 text-soil-700 border-amber-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-xs md:text-sm font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
