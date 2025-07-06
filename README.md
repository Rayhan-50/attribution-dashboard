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
