'use client';

import React from 'react';
import { Click, Install } from '../../lib/types';

interface ChartContainerProps {
  clicks: Click[];
  installs: Install[];
  title: string;
  children: React.ReactNode;
}

export function ChartContainer({ clicks, installs, title, children }: ChartContainerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 min-h-[320px] overflow-x-auto flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex-1 flex items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
} 