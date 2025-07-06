export interface Click {
  click_id: string;
  fingerprint: string;
  campaign_id: string;
  ad_network: string;
  device_id: string;
  ip: string;
  user_agent: string;
  referrer: string;
  timestamp: string;
}

export interface Install {
  install_id: string;
  device_id: string;
  click_id: string | null;
  timestamp: string;
  campaign_id: string | null;
  ad_network: string | null;
  attribution_type: string | null;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  count?: number;
}

export interface Stats {
  clicks: number;
  installs: number;
  conversion_rate: string;
}

export interface StatsResponse {
  status: string;
  stats: Stats;
} 