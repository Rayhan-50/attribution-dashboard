'use client';

import React from 'react';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { ClicksTable } from '../components/dashboard/ClicksTable';
import { InstallsTable } from '../components/dashboard/InstallsTable';
import { RefreshButton } from '../components/dashboard/RefreshButton';

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Force re-render of all components by updating the key
    setRefreshKey(prev => prev + 1);
    // Add a small delay to show the refreshing state
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Attribution Dashboard</h1>
              <p className="text-gray-600 mt-1">Track and analyze your mobile app attribution data</p>
            </div>
            <RefreshButton onRefresh={handleRefresh} loading={refreshing} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div key={`stats-${refreshKey}`}>
          <StatsOverview />
        </div>

        {/* Data Tables */}
        <div className="space-y-8">
          {/* Clicks Table */}
          <div key={`clicks-${refreshKey}`}>
            <ClicksTable />
          </div>

          {/* Installs Table */}
          <div key={`installs-${refreshKey}`}>
            <InstallsTable />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            Attribution Platform Dashboard • Data from http://localhost:3000
          </p>
        </div>
      </footer>
    </div>
  );
}
