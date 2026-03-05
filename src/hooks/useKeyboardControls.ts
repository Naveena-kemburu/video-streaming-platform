import { useEffect } from 'react';
import type Player from 'video.js/dist/types/player';

export function useKeyboardControls(player: Player | null, containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!player) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          if (player.paused()) {
            player.play();
          } else {
            player.pause();
          }
          break;
        case 'm':
          e.preventDefault();
          player.muted(!player.muted());
          break;
        case 'f':
          e.preventDefault();
          if (player.isFullscreen()) {
            player.exitFullscreen();
          } else {
            player.requestFullscreen();
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          player.currentTime(Math.max(0, (player.currentTime() || 0) - 5));
          break;
        case 'arrowright':
          e.preventDefault();
          player.currentTime(Math.min(player.duration() || 0, (player.currentTime() || 0) + 5));
          break;
        case 'arrowup':
          e.preventDefault();
          player.volume(Math.min(1, (player.volume() || 0) + 0.1));
          break;
        case 'arrowdown':
          e.preventDefault();
          player.volume(Math.max(0, (player.volume() || 0) - 0.1));
          break;
      }
    };

    // Add listener to document instead of container for global keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [player]);
}
