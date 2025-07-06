'use client';

import React from 'react';
import { Click, Install } from '../../lib/types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface TimeSeriesChartProps {
  clicks: Click[];
  installs: Install[];
}

export function TimeSeriesChart({ clicks, installs }: TimeSeriesChartProps) {
  // Group data by date
  const getDateKey = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Get last 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  // Prepare data for chart
  const data = dates.map((date) => {
    const clicksCount = clicks.filter((c) => getDateKey(c.timestamp) === date).length;
    const installsCount = installs.filter((i) => getDateKey(i.timestamp) === date).length;
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Clicks: clicksCount,
      Installs: installsCount,
    };
  });

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="Clicks" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Installs" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 