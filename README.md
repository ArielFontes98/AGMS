# Analytics Job Family – KPI Dashboard (Prototype)

A React + TypeScript prototype dashboard for visualizing and exploring KPIs for the Analytics Job Family (BA, DS, AE).

## Features

- **Filter KPIs** by Pillar, Function, Business Unit, and Month
- **Summary Cards** showing latest values vs targets with status badges
- **Interactive Charts** (Line/Bar) comparing Actual vs Target over time
- **KPI Table** with detailed information and deltas
- **Add KPI** functionality for in-memory prototype data

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── types.ts              # TypeScript interfaces and types
├── mockData.ts           # Fake data for prototype
├── App.tsx               # Main app component with state management
├── components/
│   ├── Filters.tsx       # Filter controls (Pillar, Function, BU, Month)
│   ├── KpiSummaryCards.tsx  # Summary card tiles
│   ├── KpiChart.tsx      # Chart visualization (Recharts)
│   ├── KpiTable.tsx      # Detailed KPI table
│   └── AddKpiModal.tsx   # Modal for adding new KPIs
└── ...
```

## Design

- **Primary Color**: #820AD1 (Nubank purple)
- **Style**: Clean cards with soft shadows and rounded corners
- **Typography**: System sans-serif fonts

## Data Model

### KPI
- `id`: Unique identifier (e.g., "TF_P1")
- `name`: Display name
- `pillar`: One of the 5 pillars
- `type`: Primary or Secondary
- `function`: BA, DS, AE, or Cross
- `unit`: percent, index, count, or days

### KPI Value
- `kpiId`: Reference to KPI
- `month`: Format "2026-01"
- `bu`: Business Unit name
- `function`: BA, DS, or AE
- `value`: Actual value
- `target`: Target value

## Extending the Prototype

See the comments at the top of `src/App.tsx` for guidance on:
- Connecting to real data sources
- Adding authentication
- Implementing backend persistence
- Adding new features
- Performance optimizations

## Notes

- This is a front-end prototype only (no auth, no backend persistence)
- All data is stored in component state
- Refresh the page to reset to initial mock data
