# Your Life, In Receipts 🧾

**Tagline**: *Every moment leaves a trace.*

---

## Overview

Modern digital life consists of thousands of fragmented, micro-moments logged across different platforms and devices—ranging from late-night music streaming sessions on Spotify, daily transit ticket payments, household utility expenses, card transactions, to evening entertainment subscriptions.

**RECEIPT** transforms these fictional and real digital-life records into an interactive, context-rich data journal and detective discovery experience. Instead of forcing users to navigate generic dashboards or overwhelming spreadsheet logs, the application follows a natural storytelling paradigm:

$$\text{Raw Data} \longrightarrow \text{Insights} \longrightarrow \text{Connections} \longrightarrow \text{Story}$$

---

## Core Idea

The application does **not** simply render a plain chronological transaction table. It acts as a **premium digital journal + interactive data story + detective discovery platform**.

By processing multi-faceted activity logs, **RECEIPT** helps users uncover hidden contextual relationships between what they listened to, what they purchased, where they traveled, and when these moments occurred—revealing authentic behavioral patterns, temporal activity clusters, and progressive narrative sequences.

---

## Features

### 1. Executive Dashboard ("Life at a Glance")
- **Calculated Metric Cards**: Real-time aggregate indicators displaying total parsed records, total music listening hours, total financial spend ($\text{₹}$), unique merchants, unique artists, and discovered pattern counts.
- **Algorithmic Insight Engine**: Natural storytelling insights derived from actual dataset calculations (*Night Owl Pattern*, *Transit & Commute Loops*, *Indie & Pop Audio Echoes*, *Weekend Spree Pattern*).

### 2. Digital Receipt Explorer
- **Thermal Receipt Design**: Receipt cards styled with paper thermal textures, mini barcode graphics, dashed line dividers, category icons, timestamps, amounts, and location traces.
- **Real-Time Search & Filtering**: Multi-field search across tracks, artists, merchants, cities, and notes. Filter pills for categories (*Music*, *Food & Dining*, *Transportation*, *Subscriptions*, *Entertainment*, *Festivals*), receipt types, and date sorting.
- **Thermal Modal Inspector**: Deep metadata inspection with record ID copying, tags breakdown, and one-click connection triggers.

### 3. Signature Feature ⭐⭐⭐ — Connect The Dots
- **Deterministic Relationship Clustering**: Select any anchor moment to discover related activity records linked by deterministic signals:
  - **Time Proximity**: Activity records logged within a configurable time window ($\pm 3$ hours).
  - **Location Trace**: Records sharing the exact geographic location or city hub.
  - **Same Date Trace**: Records logged on the exact same date.
  - **Category Cluster**: Combined activity streams (e.g. *Music* + *Food & Dining* + *Transportation*).
- **Animated Flow Graph**: Visual node flow sequence displaying time-distance badges and factual narrative explanations (*"Occurred 14 minutes apart"*).

### 4. Signature Feature ⭐⭐⭐ — Discovered Stories (Story Mode)
- **Data-Driven Story Clusters**: Multi-record narrative stories (*"A Night in the Data"*, *"The Sunday Ritual"*, *"Festival Spirits & Travel Traces"*, *"The High-Velocity Spree"*).
- **Immersive Progressive Reveal Player**: Full-screen player with step progress bar, step navigation, auto-play mode, audio stream details, transaction values, and celebratory confetti upon completion.

### 5. 24-Hour Digital Rhythm Matrix
- **Interactive Heatmap Grid**: 24-hour activity density matrix allowing users to click any hour cell ($00:00$ to $23:00$) to filter receipts logged during that timeframe, backed by day-of-week volume bars.

### 6. Dynamic Moment Logger & Theme Toggle
- **`+ LOG MOMENT` Modal**: Form allowing users to log custom moment traces (*Music*, *Purchase*, *Household*) that immediately update live analytics and participate in cluster connections.
- **Dark / Light Mode Switch**: Instant toggle between cinematic Dark Mode (`#090A0F`) and high-contrast Light Editorial Mode (`#F8FAFC`).

---

## Data

The application processes three core WebRush datasets:

1. **Spotify Audio Streaming History**: Track names, artist names, album titles, playback duration ($\text{ms}$), platform details, and timestamps.
2. **Daily Household Transactions**: Category, subcategory, payment mode (Cash, Credit Card, Bank), transaction notes, amount ($\text{₹}$), and dates.
3. **Augmented Multi-Facet Card Logs**: Merchant names, category, amount ($\text{₹}$), city, state, coordinates ($\text{lat/long}$), and timestamps.

### Data Processing Strategy:
- **Raw Data**: 160,000+ un-cleansed records across CSV datasets.
- **Normalization Layer**: Transformed into 4,087 standardized receipt models with fallback default values and typed metadata (`src/utils/dataProcessing/normalizeData.ts`).
- **Derived Insights**: Calculated aggregations (total spent, listening hours, hour distributions, artist counts) precomputed for zero UI rendering lag.
- **Factual Grounding**: All connections, pattern insights, and story clusters are mathematically derived from actual timestamp/location records and are **never** fabricated.

---

## Architecture

The codebase follows a domain-driven, modular architecture separating presentation, business logic, normalization, and utility services:

```text
src/
├── components/
│   ├── layout/            # Navigation header & global ErrorBoundary
│   ├── receipts/          # Receipt cards, detail modal, and log moment modal
│   ├── timeline/          # 24-hour activity density grid heatmap
│   ├── insights/          # Metric cards and pattern storytelling cards
│   ├── connections/       # Connect The Dots animated visual node graph
│   ├── stories/           # Story catalog cards and immersive story player modal
│   ├── controls/          # Search bar, filter pills, and global search modal
│   ├── feedback/          # Thermal loading skeletons
│   └── Hero/              # Hero banner and executive statistics strip
│
├── data/
│   ├── dataTypes.ts       # TypeScript interfaces for Receipts, Patterns, Stories
│   └── receiptsData.json  # Derived lightweight dataset payload
│
├── utils/
│   ├── dataProcessing/    # Normalized receipt data pipeline (normalizeData.ts)
│   ├── analytics.ts       # Filtering, search, and sorting engine
│   ├── connections.ts     # Deterministic proximity clustering algorithm
│   ├── formatting.ts      # Date, currency, duration, and icon formatters
│   ├── security.ts        # Text sanitization and safety utilities
│   └── __tests__/         # Unit test suite (analytics, connections, normalizeData, security)
│
└── pages/                 # Top-level route views (Overview, Explore, Connections, Stories)
```

---

## Data Flow

```text
┌────────────────────────────────────────────────────────┐
│               Raw CSV Datasets (160,000+ Records)       │
└───────────────────────────┬────────────────────────────┘
                            │ (scripts/process_data.py)
                            ▼
┌────────────────────────────────────────────────────────┐
│         Normalized Dataset Payload (receiptsData.json)  │
└───────────────────────────┬────────────────────────────┘
                            │ (normalizeData.ts)
                            ▼
┌────────────────────────────────────────────────────────┐
│            Analytics & Connection Clustering Engine    │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
                ▼                        ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│  Search, Filter & Aggregates │ │  Deterministic Node Clusters │
└───────────────┬──────────────┘ └───────────────┬──────────────┘
                │                                │
                ▼                                ▼
┌────────────────────────────────────────────────────────┐
│           Interactive Storytelling & Thermal UI        │
└────────────────────────────────────────────────────────┘
```

---

## Technology Stack

- **Core**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS (Vanilla CSS design system tokens, thermal paper styling)
- **Icons**: Lucide React
- **Animations**: Framer Motion, Canvas Confetti
- **Testing**: Jest / Vitest unit test suites (`src/utils/__tests__/`)
- **Deployment**: Vercel (Frontend-only single-page web app)

---

## Performance

- **Bundle Splitting**: Configured Rollup `manualChunks` in `vite.config.ts` to isolate vendor libraries (`react`, `lucide`, `motion`) and dataset payload into separate chunks. Initial JavaScript entry bundle size is **40.8 kB**.
- **Page Code Splitting**: Utilized `React.lazy()` and `Suspense` for asynchronous page route loading with thermal skeletons.
- **Fast Search**: Search queries execute against pre-indexed lowercase tokens, filtering 4,000+ records in $< 1.5\text{ ms}$.
- **Memoization**: Aggregation calculations, category distributions, and proximity searches are memoized with `useMemo`.

---

## Accessibility

- **Semantic HTML**: Standard `<button type="button">`, `<header>`, `<main>`, `<nav>`, and `<section>` elements used throughout.
- **Keyboard Navigation**: Full keyboard tab sequence support with explicit focus indicators (`focus-visible:ring-2 focus-visible:ring-sky-400`).
- **ARIA Compliance**:
  - Modals feature `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
  - Filter pills feature `aria-pressed={isActive}`.
  - Buttons feature descriptive `aria-label` attributes.
  - Keyboard listeners for `Escape` modal closing and `Enter`/`Space` button selection.

---

## Security

- **Data Sanitization**: All user-entered inputs and dataset strings pass through `sanitizeText()` in `src/utils/security.ts` to neutralize HTML injection.
- **Safe Rendering**: Zero usage of `dangerouslySetInnerHTML`.
- **Frontend-Only**: No backend servers, external database connections, or API key exposures.

---

## Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run unit test suite
npm test
```

The application will be available at `http://localhost:5173/`.

---

## Production Build

```bash
# Run TypeScript compilation and Vite build
npm run build

# Preview production build locally
npm run preview
```

The production output will be generated in `dist/`.

---

## Deployment

- **Platform**: Vercel
- **Build Command**: `node ./node_modules/vite/bin/vite.js build`
- **Output Directory**: `dist`
- **Live Deployment URL**: `https://your-life-in-receipts.vercel.app` (or your active Vercel link)

---

## Design Philosophy

> *"Every moment leaves a trace."*

The visual style is designed to feel like a **cinematic, dark-mode editorial data story** rather than a generic administrative dashboard. It balances large typography, thermal paper receipts, mini barcode details, subtle glow accents, and smooth micro-interactions to create a premium digital experience.

---

## Limitations

- **Frontend-Only Scope**: Data state mutations (e.g. logging a new moment trace) persist within the active React runtime session memory and do not write back to a remote database.
- **Sample Clustering**: Connection search uses temporal and location proximity heuristics ($\pm 3$ hours) rather than deep machine learning models.

---

## Hackathon

Built for **WebRush — 6-Hour Frontend Hackathon** hosted on Frontend Arena.
