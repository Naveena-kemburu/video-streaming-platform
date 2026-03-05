import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../userStore';

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.setState({ watchHistory: [], favorites: [] });
  });

  it('adds video to watch history', () => {
    const { addToWatchHistory } = useUserStore.getState();
    addToWatchHistory('1', 100, 500);
    
    expect(useUserStore.getState().watchHistory).toHaveLength(1);
    expect(useUserStore.getState().watchHistory[0].videoId).toBe('1');
  });

  it('updates existing watch history', () => {
    const { addToWatchHistory } = useUserStore.getState();
    addToWatchHistory('1', 100, 500);
    addToWatchHistory('1', 200, 500);
    
    expect(useUserStore.getState().watchHistory).toHaveLength(1);
    expect(useUserStore.getState().watchHistory[0].currentTime).toBe(200);
  });

  it('toggles favorite', () => {
    const { toggleFavorite } = useUserStore.getState();
    toggleFavorite('1');
    
    expect(useUserStore.getState().favorites).toContain('1');
    
    toggleFavorite('1');
    expect(useUserStore.getState().favorites).not.toContain('1');
  });

  it('gets progress for video', () => {
    const { addToWatchHistory, getProgress } = useUserStore.getState();
    addToWatchHistory('1', 100, 500);
    
    const progress = getProgress('1');
    expect(progress?.currentTime).toBe(100);
  });
});
