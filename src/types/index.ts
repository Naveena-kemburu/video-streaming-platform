export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  category: string;
  sources: VideoSource[];
  subtitles?: SubtitleTrack[];
  thumbnailsVtt?: string;
}

export interface VideoSource {
  src: string;
  type: string;
  quality?: string;
}

export interface SubtitleTrack {
  src: string;
  srclang: string;
  label: string;
}

export interface WatchProgress {
  videoId: string;
  currentTime: number;
  duration: number;
  lastWatched: number;
}

export interface UserState {
  watchHistory: WatchProgress[];
  favorites: string[];
  addToWatchHistory: (videoId: string, currentTime: number, duration: number) => void;
  toggleFavorite: (videoId: string) => void;
  getProgress: (videoId: string) => WatchProgress | undefined;
}
