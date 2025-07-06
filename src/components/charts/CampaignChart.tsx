'use client';

import React from 'react';
import { Click, Install } from '../../lib/types';

interface CampaignChartProps {
  clicks: Click[];
  installs: Install[];
}

export function CampaignChart({ clicks, installs }: CampaignChartProps) {
  // Group clicks by campaign
  const clicksByCampaign = clicks.reduce((acc, click) => {
    acc[click.campaign_id] = (acc[click.campaign_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group installs by campaign
  const installsByCampaign = installs.reduce((acc, install) => {
    if (install.campaign_id) {
      acc[install.campaign_id] = (acc[install.campaign_id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get top 5 campaigns by clicks
  const topCampaigns = Object.keys(clicksByCampaign)
    .sort((a, b) => clicksByCampaign[b] - clicksByCampaign[a])
    .slice(0, 5);

  const maxClicks = Math.max(...Object.values(clicksByCampaign), 1);

  return (
    <div className="w-full h-full">
      <div className="space-y-3">
        {topCampaigns.map((campaignId) => {
          const clicksCount = clicksByCampaign[campaignId] || 0;
          const installsCount = installsByCampaign[campaignId] || 0;
          const conversionRate = clicksCount > 0 ? (installsCount / clicksCount * 100).toFixed(1) : '0';
          
          const clicksWidth = (clicksCount / maxClicks) * 100;
          
          return (
            <div key={campaignId} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 truncate">
                  {campaignId}
                </span>
                <span className="text-xs text-gray-500">
                  {conversionRate}% conv.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${clicksWidth}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 min-w-[60px] text-right">
                  {clicksCount} clicks
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(installsCount / maxClicks) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 min-w-[60px] text-right">
                  {installsCount} installs
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {topCampaigns.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          No campaign data available
        </div>
      )}
    </div>
  );
} 