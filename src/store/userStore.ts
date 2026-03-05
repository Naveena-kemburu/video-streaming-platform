import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserState, WatchProgress } from '@/types';

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      watchHistory: [],
      favorites: [],
      
      addToWatchHistory: (videoId: string, currentTime: number, duration: number) => {
        set((state) => {
          const existing = state.watchHistory.findIndex(w => w.videoId === videoId);
          const newProgress: WatchProgress = {
            videoId,
            currentTime,
            duration,
            lastWatched: Date.now(),
          };
          
          if (existing >= 0) {
            const updated = [...state.watchHistory];
            updated[existing] = newProgress;
            return { watchHistory: updated };
          }
          
          return { watchHistory: [newProgress, ...state.watchHistory] };
        });
      },
      
      toggleFavorite: (videoId: string) => {
        set((state) => ({
          favorites: state.favorites.includes(videoId)
            ? state.favorites.filter(id => id !== videoId)
            : [...state.favorites, videoId],
        }));
      },
      
      getProgress: (videoId: string) => {
        return get().watchHistory.find(w => w.videoId === videoId);
      },
    }),
    {
      name: 'video-streaming-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
