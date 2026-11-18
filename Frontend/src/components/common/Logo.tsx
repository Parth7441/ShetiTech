import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'footer' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  size = 'md',
  className = ''
}) => {
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl'
  };

  const isFooter = variant === 'footer';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Agriculture Emblem Icon (Strictly stable: no scaling on hover) */}
      <div
        className={`${emblemSizes[size]} shrink-0 rounded-2xl overflow-hidden shadow-xs ${
          isFooter ? 'ring-1 ring-forest-700' : 'ring-1 ring-forest-200/90'
        }`}
      >
        <img
          src="/logo.svg"
          alt="ShetiTech Logo"
          width="40"
          height="40"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Clean Horizontal Brand Typography */}
      {variant !== 'mark' && (
        <span
          className={`font-black tracking-tight leading-none ${textSizes[size]} ${
            isFooter ? 'text-white' : 'text-forest-950'
          }`}
        >
          Sheti<span className="text-fresh">Tech</span>
        </span>
      )}
    </div>
  );
};
