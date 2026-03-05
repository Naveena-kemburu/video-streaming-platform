# High-Performance Video Streaming Platform

A feature-rich, high-performance video streaming web application with adaptive bitrate streaming, built with React, TypeScript, and Video.js.

## Features

- **Adaptive Bitrate Streaming**: Automatic quality switching based on network conditions using HLS protocol
- **Custom Video Controls**: Play/pause, volume, seek bar, fullscreen, quality selector, playback speed
- **Advanced Features**: Subtitles/captions, Picture-in-Picture mode, seek bar thumbnails
- **Video Library**: Browse, search, and filter videos
- **User Features**: Watch history, continue watching, favorites/watchlist
- **Fully Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## Tech Stack

- React 18 + TypeScript
- Video.js with HLS.js for adaptive streaming
- Tailwind CSS for styling
- Zustand for state management
- Vite for build tooling
- Vitest + React Testing Library for unit tests
- Playwright for E2E tests

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

Run unit and integration tests:
```bash
npm test
```

Run E2E tests:
```bash
npm run test:e2e
```

## Project Architecture

### Component Structure

```
src/
├── components/
│   ├── VideoPlayer/       # Video player with custom controls
│   ├── VideoLibrary/      # Video grid and search
│   ├── VideoDetail/       # Individual video page
│   └── common/            # Reusable UI components
├── store/                 # Zustand state management
├── hooks/                 # Custom React hooks
├── utils/                 # Helper functions
└── types/                 # TypeScript definitions
```

### Key Design Decisions

1. **Video.js + HLS.js**: Robust solution for adaptive bitrate streaming with extensive browser support
2. **Zustand**: Lightweight state management for watch history and favorites
3. **Component Composition**: Small, focused components for maintainability
4. **Accessibility First**: ARIA attributes and keyboard navigation built into all controls
5. **Local Storage**: Persistent user data without backend complexity

## Performance Optimizations

- Code splitting with React lazy loading
- Lazy loading for video thumbnails
- Optimized bundle size with tree shaking
- Lighthouse score target: 90+ for Performance, Accessibility, and Best Practices

## Accessibility Features

- Full keyboard navigation support
- ARIA labels and roles for all controls
- Screen reader compatible
- Visual focus indicators
- Semantic HTML structure

## Demo Video

A comprehensive demo video showcasing all features is available at: [Add your video URL here]

The demo includes:
- Video library browsing, search, and filtering
- Adaptive bitrate streaming with network throttling
- All player controls and advanced features
- Keyboard navigation and accessibility features
- Continue watching and favorites functionality

## Deployment

This application can be deployed to any static hosting service. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Live Demo: [Add your deployment URL here]

## Lighthouse Scores

Target scores (90+):
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## License

MIT
