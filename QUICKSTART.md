# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173 to see the application.

## First Time Setup

The application works out of the box with sample videos. No additional configuration needed.

## Testing the Application

### Run All Tests
```bash
npm test
npm run test:e2e
```

### Test Adaptive Bitrate Streaming

1. Open the application in Chrome
2. Open DevTools (F12)
3. Go to Network tab
4. Click the throttling dropdown
5. Select "Fast 3G" or "Slow 3G"
6. Play a video
7. Watch the quality automatically adjust

### Test Keyboard Controls

1. Navigate to a video
2. Use these shortcuts:
   - Space/K: Play/Pause
   - M: Mute
   - F: Fullscreen
   - ←/→: Seek backward/forward
   - ↑/↓: Volume up/down

## Deployment

### Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Upload the 'dist' folder to Netlify
```

## Troubleshooting

### Videos not playing?
- Check browser console for errors
- Ensure you have a stable internet connection
- Try a different browser

### Tests failing?
- Run `npm install` again
- Clear node_modules and reinstall
- Check Node.js version (18+ required)

## Next Steps

1. Customize the video data in `src/data/videos.json`
2. Add your own HLS streams
3. Customize the theme in `tailwind.config.js`
4. Deploy to production
