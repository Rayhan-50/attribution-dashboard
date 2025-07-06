'use client';

import React from 'react';
import { DataTable } from '../ui/DataTable';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { api } from '../../lib/api';
import { Click } from '../../lib/types';

export function ClicksTable() {
  const [clicks, setClicks] = React.useState<Click[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchClicks = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getClicks();
      setClicks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clicks');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchClicks();
  }, [fetchClicks]);

  const columns = [
    { key: 'click_id', label: 'Click ID' },
    { key: 'campaign_id', label: 'Campaign ID' },
    { key: 'ad_network', label: 'Ad Network' },
    { key: 'device_id', label: 'Device ID' },
    { key: 'ip', label: 'IP Address' },
    { key: 'timestamp', label: 'Timestamp' },
  ];

  if (loading) {
    return <LoadingSpinner message="Loading clicks..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchClicks} />;
  }

  return (
    <DataTable
      data={clicks}
      columns={columns}
      title="Click Data"
      emptyMessage="No clicks recorded yet"
    />
  );
} 