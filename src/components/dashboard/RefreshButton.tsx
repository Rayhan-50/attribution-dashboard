'use client';

import React from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
  loading?: boolean;
}

export function RefreshButton({ onRefresh, loading = false }: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg
        className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {loading ? 'Refreshing...' : 'Refresh Data'}
    </button>
  );
} 