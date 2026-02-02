'use client';
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

export const Badge = ({ children, color = 'blue', className = '' }: BadgeProps) => {
  // Define color variants for different statuses
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    red: "bg-red-100 text-red-700 border-red-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-all ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};