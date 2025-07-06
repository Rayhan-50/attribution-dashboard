'use client';

import React from 'react';
import { ChartContainer } from '../charts/ChartContainer';
import { TimeSeriesChart } from '../charts/TimeSeriesChart';
import { CampaignChart } from '../charts/CampaignChart';
import { AdNetworkChart } from '../charts/AdNetworkChart';
import { ConversionFunnel } from '../charts/ConversionFunnel';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { api } from '../../lib/api';
import { Click, Install } from '../../lib/types';

export function ChartsSection() {
  const [clicks, setClicks] = React.useState<Click[]>([]);
  const [installs, setInstalls] = React.useState<Install[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [clicksResponse, installsResponse] = await Promise.all([
        api.getClicks(),
        api.getInstalls()
      ]);
      
      setClicks(clicksResponse.data);
      setInstalls(installsResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chart data');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingSpinner message="Loading chart data..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchData} />;
  }

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Visualizations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Time Series Chart */}
        <ChartContainer clicks={clicks} installs={installs} title="Clicks & Installs Over Time">
          <TimeSeriesChart clicks={clicks} installs={installs} />
        </ChartContainer>

        {/* Conversion Funnel */}
        <ChartContainer clicks={clicks} installs={installs} title="Conversion Funnel">
          <ConversionFunnel clicks={clicks} installs={installs} />
        </ChartContainer>

        {/* Campaign Performance */}
        <ChartContainer clicks={clicks} installs={installs} title="Campaign Performance">
          <CampaignChart clicks={clicks} installs={installs} />
        </ChartContainer>

        {/* Ad Network Performance */}
        <ChartContainer clicks={clicks} installs={installs} title="Ad Network Performance">
          <AdNetworkChart clicks={clicks} installs={installs} />
        </ChartContainer>
      </div>
    </div>
  );
} 