import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700',
        className
      )}
    >
      {children}
    </div>
  );
};