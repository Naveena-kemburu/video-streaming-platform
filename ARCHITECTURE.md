# Architecture Overview

## Technology Stack

### Core Technologies
- **React 18**: Modern UI library with concurrent features
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework

### Video Streaming
- **Video.js**: Robust HTML5 video player
- **HLS.js**: HTTP Live Streaming protocol support (built into Video.js)
- **Adaptive Bitrate**: Automatic quality switching based on bandwidth

### State Management
- **Zustand**: Lightweight state management
- **Local Storage**: Persistent user data (watch history, favorites)

### Testing
- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing

## Project Structure

```
src/
├── components/
│   ├── VideoPlayer/
│   │   ├── VideoPlayer.tsx          # Main video player component
│   │   └── videojs-custom.css       # Custom player styling
│   ├── VideoLibrary/
│   │   ├── VideoCard.tsx            # Video thumbnail card
│   │   └── FilterBar.tsx            # Category filter
│   └── common/
│       ├── Header.tsx               # App header
│       ├── SearchBar.tsx            # Search input
│       ├── LoadingSpinner.tsx       # Loading state
│       └── Button.tsx               # Reusable button
├── pages/
│   ├── VideoLibrary.tsx             # Main library page
│   └── VideoDetail.tsx              # Video detail/player page
├── store/
│   └── userStore.ts                 # Zustand store for user data
├── hooks/
│   └── useKeyboardControls.ts       # Keyboard navigation hook
├── utils/
│   └── formatTime.ts                # Time formatting utilities
├── types/
│   └── index.ts                     # TypeScript type definitions
└── data/
    └── videos.json                  # Video metadata
```

## Key Design Decisions

### 1. Video.js for Player Implementation
- Battle-tested library with extensive browser support
- Built-in HLS support via VHS (Video.js HTTP Streaming)
- Comprehensive plugin ecosystem
- Accessible by default with ARIA support

### 2. Component Composition
- Small, focused components for maintainability
- Props-based communication
- Separation of concerns (presentation vs. logic)

### 3. State Management Strategy
- **Local State**: Component-specific UI state (React useState)
- **Global State**: User data (Zustand with persistence)
- **URL State**: Current video (React Router params)

### 4. Performance Optimizations
- **Code Splitting**: React.lazy() for route-based splitting
- **Lazy Loading**: Images load only when visible
- **Memoization**: useMemo for expensive computations
- **Debouncing**: Search input debouncing (implicit via React)

### 5. Accessibility First
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Data Flow

### Watch History
1. User watches video → VideoPlayer component
2. Time updates every 5 seconds → onTimeUpdate callback
3. Progress saved to Zustand store → userStore.addToWatchHistory
4. Zustand persists to localStorage automatically
5. Continue Watching section reads from store

### Favorites
1. User clicks heart icon → VideoCard or VideoDetail
2. toggleFavorite called → userStore
3. State updated and persisted to localStorage
4. UI reflects new state immediately

## Adaptive Bitrate Streaming

Video.js with VHS (Video HTTP Streaming) handles ABR automatically:

1. Player loads HLS manifest (.m3u8)
2. Manifest contains multiple quality levels
3. VHS monitors bandwidth and buffer health
4. Automatically switches between qualities
5. User can manually override via quality selector

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (native HLS)
- Mobile browsers: Full support with touch controls

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 90
- Bundle size: < 500KB (gzipped)
