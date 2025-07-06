'use client';

import React from 'react';
import { Click, Install } from '../../lib/types';

interface AdNetworkChartProps {
  clicks: Click[];
  installs: Install[];
}

export function AdNetworkChart({ clicks, installs }: AdNetworkChartProps) {
  // Group clicks by ad network
  const clicksByNetwork = clicks.reduce((acc, click) => {
    acc[click.ad_network] = (acc[click.ad_network] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group installs by ad network
  const installsByNetwork = installs.reduce((acc, install) => {
    if (install.ad_network) {
      acc[install.ad_network] = (acc[install.ad_network] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get all networks
  const allNetworks = Array.from(new Set([
    ...Object.keys(clicksByNetwork),
    ...Object.keys(installsByNetwork)
  ]));

  const totalClicks = Object.values(clicksByNetwork).reduce((sum, count) => sum + count, 0);
  const totalInstalls = Object.values(installsByNetwork).reduce((sum, count) => sum + count, 0);

  return (
    <div className="w-full h-full">
      <div className="space-y-3">
        {allNetworks.map((network) => {
          const clicksCount = clicksByNetwork[network] || 0;
          const installsCount = installsByNetwork[network] || 0;
          
          const clicksPercentage = totalClicks > 0 ? (clicksCount / totalClicks * 100).toFixed(1) : '0';
          const installsPercentage = totalInstalls > 0 ? (installsCount / totalInstalls * 100).toFixed(1) : '0';
          
          return (
            <div key={network} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 truncate">
                  {network}
                </span>
                <div className="text-xs text-gray-500">
                  {clicksCount} clicks, {installsCount} installs
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-12">Clicks:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${clicksPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{clicksPercentage}%</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 w-12">Installs:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${installsPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">{installsPercentage}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {allNetworks.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          No ad network data available
        </div>
      )}
    </div>
  );
} 