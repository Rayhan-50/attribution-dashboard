'use client';

import React from 'react';
import { Click, Install } from '../../lib/types';

interface ConversionFunnelProps {
  clicks: Click[];
  installs: Install[];
}

export function ConversionFunnel({ clicks, installs }: ConversionFunnelProps) {
  const totalClicks = clicks.length;
  const totalInstalls = installs.length;
  const conversionRate = totalClicks > 0 ? (totalInstalls / totalClicks * 100).toFixed(1) : '0';

  // Calculate unique devices
  const uniqueClickDevices = new Set(clicks.map(click => click.device_id)).size;
  const uniqueInstallDevices = new Set(installs.map(install => install.device_id)).size;

  const funnelSteps = [
    {
      label: 'Total Clicks',
      value: totalClicks,
      color: 'bg-blue-500',
      percentage: 100
    },
    {
      label: 'Unique Click Devices',
      value: uniqueClickDevices,
      color: 'bg-blue-400',
      percentage: totalClicks > 0 ? (uniqueClickDevices / totalClicks * 100) : 0
    },
    {
      label: 'Total Installs',
      value: totalInstalls,
      color: 'bg-green-500',
      percentage: totalClicks > 0 ? (totalInstalls / totalClicks * 100) : 0
    },
    {
      label: 'Unique Install Devices',
      value: uniqueInstallDevices,
      color: 'bg-green-400',
      percentage: totalClicks > 0 ? (uniqueInstallDevices / totalClicks * 100) : 0
    }
  ];

  return (
    <div className="w-full h-full">
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-gray-900">{conversionRate}%</div>
        <div className="text-sm text-gray-600">Overall Conversion Rate</div>
      </div>
      
      <div className="space-y-4">
        {funnelSteps.map((step, index) => (
          <div key={step.label} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{step.label}</span>
              <span className="text-sm text-gray-600">{step.value}</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-lg h-8">
                <div
                  className={`${step.color} h-8 rounded-lg transition-all duration-500`}
                  style={{ width: `${step.percentage}%` }}
                ></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white drop-shadow">
                  {step.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            
            {index < funnelSteps.length - 1 && (
              <div className="flex justify-center mt-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 