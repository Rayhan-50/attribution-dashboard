'use client';

import React from 'react';
import { StatCard } from '../ui/StatCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { api } from '../../lib/api';
import { Stats } from '../../lib/types';

export function StatsOverview() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchStats = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getStats();
      setStats(response.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <LoadingSpinner message="Loading statistics..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchStats} />;
  }

  if (!stats) {
    return <ErrorMessage error="No statistics available" onRetry={fetchStats} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Clicks"
        value={stats.clicks.toLocaleString()}
        color="blue"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.122 2.122" />
          </svg>
        }
      />
      <StatCard
        title="Total Installs"
        value={stats.installs.toLocaleString()}
        color="green"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />
      <StatCard
        title="Conversion Rate"
        value={stats.conversion_rate}
        color="purple"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
    </div>
  );
} 