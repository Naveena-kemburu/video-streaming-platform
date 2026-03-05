# Testing Guide

## Overview

This project includes comprehensive testing at multiple levels:
- Unit tests for utilities and state management
- Component tests for UI components
- E2E tests for user workflows
- Accessibility tests

## Running Tests

### All Unit Tests
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### E2E Tests
```bash
npm run test:e2e
```

### E2E with UI
```bash
npx playwright test --ui
```

## Test Structure

### Unit Tests (`src/**/__tests__/`)
- `formatTime.test.ts` - Time formatting utilities
- `userStore.test.ts` - State management logic
- `VideoCard.test.tsx` - Video card component
- `SearchBar.test.tsx` - Search input component

### E2E Tests (`e2e/`)
- `video-player.spec.ts` - Core player functionality
- `accessibility.spec.ts` - Accessibility compliance

## Writing New Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('should perform action', async ({ page }) => {
  await page.goto('/');
  // Test implementation
});
```

## Test Coverage

Current coverage includes:
- State management (watch history, favorites)
- Utility functions (time formatting)
- UI components (search, video cards)
- User workflows (search, filter, navigation)
- Accessibility (keyboard, ARIA, focus)

## Manual Testing Checklist

### Adaptive Bitrate Streaming
1. Open Chrome DevTools
2. Network tab → Throttling → Fast 3G
3. Play video
4. Verify quality adjusts automatically

### Keyboard Navigation
- [ ] Tab through all controls
- [ ] Space/K for play/pause
- [ ] M for mute
- [ ] F for fullscreen
- [ ] Arrow keys for seek/volume

### Accessibility
- [ ] All buttons have labels
- [ ] Focus indicators visible
- [ ] Screen reader announces controls
- [ ] Semantic HTML structure

### Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)
- [ ] Player controls adapt to screen size

## Lighthouse Audit

Run Lighthouse in Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"
5. Verify scores > 90

## CI/CD

GitHub Actions automatically runs tests on push:
- Linting
- Unit tests
- Build verification
- E2E tests

See `.github/workflows/ci.yml` for configuration.
