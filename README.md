# Attribution Dashboard

A modern, responsive Next.js dashboard for tracking and analyzing mobile app attribution data.

## Features

- **Real-time Statistics**: View total clicks, installs, and conversion rates
- **Click Data Table**: Detailed view of all click events with campaign and device information
- **Install Data Table**: Complete install tracking data with attribution details
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Auto-refresh**: Manual refresh button to update data
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Smooth loading indicators for better UX

## API Endpoints

The dashboard connects to the following backend endpoints:

- `GET /track/stats` - Get summary statistics
- `GET /track/clicks` - Get all click data
- `GET /track/installs` - Get all install data

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3001](http://localhost:3001)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── StatsOverview.tsx
│   │   ├── ClicksTable.tsx
│   │   ├── InstallsTable.tsx
│   │   └── RefreshButton.tsx
│   └── ui/               # Reusable UI components
│       ├── StatCard.tsx
│       ├── DataTable.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
└── lib/
    ├── api.ts            # API utilities
    └── types.ts          # TypeScript type definitions
```

## Data Structure

### Click Data
- `click_id`: Unique identifier
- `campaign_id`: Campaign identifier
- `ad_network`: Ad network name
- `device_id`: Device identifier
- `ip`: IP address
- `timestamp`: Click timestamp

### Install Data
- `install_id`: Unique identifier
- `device_id`: Device identifier
- `campaign_id`: Campaign identifier (if available)
- `ad_network`: Ad network name (if available)
- `attribution_type`: Attribution method
- `timestamp`: Install timestamp

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`




$ curl -X POST http://localhost:3000/track/install \
-H "Content-Type: application/json" \
-d '{
  "device_id": "device789",
  "click_id": "a22c2367-7bee-4261-b591-5f558ed35d33",
  "os_version": "iOS 14.6",
  "device_model": "iPhone12,1",
  "bundle_id": "com.example.app"
}'
{"status":"success","data":{"install_id":"1c71d3ec-b6ea-4d1b-9091-4684e0977139","device_id":"device789","click_id":"a22c2367-7bee-4261-b591-5f558ed35d33","timestamp":"2025-07-06T20:45:37.053Z","campaign_id":null,"ad_network":null,"attribution_type":null}}
2024@DESKTOP-BUC7EA3 MINGW64 ~/Desktop/Mobile-app-Platform/attribution-platform/attribution-platform/backend/attribution-backend (main)
$ curl -X POST http://localhost:3000/track/install \
-H "Content-Type: application/json" \
-d '{
  "device_id": "device789",
  "click_id": "a22c2367-7bee-4261-b591-5f558ed35d33",
  "os_version": "iOS 14.6",
  "device_model": "iPhone12,1",
  "bundle_id": "com.example.app",
  "campaign_id": "camp456",
}'"attribution_type": "click"
{"status":"success","data":{"install_id":"b6c0a675-0269-447e-99f7-685adf64204d","device_id":"device789","click_id":"a22c2367-7bee-4261-b591-5f558ed35d33","timestamp":"2025-07-06T20:50:41.391Z","campaign_id":"camp456","ad_network":"network1","attribution_type":"click"}}
2024@DESKTOP-BUC7EA3 MINGW64 ~/Desktop/Mobile-app-Platform/attribution-platform/attribution-platform/backend/attribution-backend (main)
$ curl -X POST http://localhost:3000/track/install \
-H "Content-Type: application/json" \
-d '{
  "device_id": "device789",
  "click_id": "a22c2367-7bee-4261-b591-5f558ed35d33",
  "os_version": "iOS 14.6",
  "device_model": "iPhone12,1",
  "bundle_id": "com.example.app",
  "campaign_id": "camp456",
}'"attribution_type": "click"
{"status":"success","data":{"install_id":"4cdb4d3e-f52d-40c6-8ad5-eb9c02558a0d","device_id":"device789","click_id":"a22c2367-7bee-4261-b591-5f558ed35d33","timestamp":"2025-07-06T20:53:29.696Z","campaign_id":"camp456","ad_network":"network1","attribution_type":"click"}}
2024@DESKTOP-BUC7EA3 MINGW64 ~/Desktop/Mobile-app-Platform/attribution-platform/attribution-platform/backend/attribution-backend (main)
$ curl -X POST http://localhost:3000/track/click \
-H "Content-Type: application/json" \
-d '{
  "fingerprint": "abc123",
  "campaign_id": "camp456",
  "ad_network": "network1",
  "device_id": "device789",
  "ip": "192.168.1.1",
  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safa}'"referrer": "https://example.com"
{"status":"success","data":{"click_id":"c736411a-94f0-4420-9b06-16c14f75f5da","fingerprint":"abc123","campaign_id":"camp456","ad_network":"networkion/14.1.1 Mobile/15E148 Safari/604.1","referrer":"https://example.com","timestamp":"2025-07-06T20:55:43.289Z"}}
2024@DESKTOP-BUC7EA3 MINGW64 ~/Desktop/Mobile-app-Platform/attribution-platform/attribution-platform/backend/attribution-backend (main)
$


1. Who Generates Clicks and Installs?
Clicks: Generated by users interacting with ads on various platforms (e.g., websites, social media, or in-app ads). These users are typically:
Potential customers targeted by ad campaigns.
Reached through ad networks (e.g., Google Ads, Meta Ads, AppLovin, Unity Ads).
Identified by device_id, ip, or other identifiers like fingerprint or user_agent.
Installs: Generated when users download and open your mobile app after clicking an ad. These are:
Users who clicked an ad and were redirected to an app store (e.g., Google Play, Apple App Store).
Tracked via device_id and click_id to link the install back to the original click.

