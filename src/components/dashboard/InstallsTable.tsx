'use client';

import React from 'react';
import { DataTable } from '../ui/DataTable';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { api } from '../../lib/api';
import { Install } from '../../lib/types';

export function InstallsTable() {
  const [installs, setInstalls] = React.useState<Install[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchInstalls = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getInstalls();
      setInstalls(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load installs');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchInstalls();
  }, [fetchInstalls]);

  const columns = [
    { key: 'install_id', label: 'Install ID' },
    { key: 'device_id', label: 'Device ID' },
    { key: 'campaign_id', label: 'Campaign ID' },
    { key: 'ad_network', label: 'Ad Network' },
    { key: 'attribution_type', label: 'Attribution Type' },
    { key: 'timestamp', label: 'Timestamp' },
  ];

  if (loading) {
    return <LoadingSpinner message="Loading installs..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchInstalls} />;
  }

  return (
    <DataTable
      data={installs}
      columns={columns}
      title="Install Data"
      emptyMessage="No installs recorded yet"
    />
  );
} 