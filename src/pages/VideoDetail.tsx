import { useParams, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { useUserStore } from '@/store/userStore';
import videosData from '@/data/videos.json';
import { Video } from '@/types';
import { useEffect, useRef } from 'react';

const videos = videosData as Video[];

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToWatchHistory, getProgress } = useUserStore();
  const saveIntervalRef = useRef<number>();

  const video = videos.find(v => v.id === id);
  const progress = video ? getProgress(video.id) : undefined;

  useEffect(() => {
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, []);

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-400">Video not found</p>
      </div>
    );
  }

  const isFavorite = favorites.includes(video.id);

  const handleTimeUpdate = (currentTime: number) => {
    if (saveIntervalRef.current) {
      clearInterval(saveIntervalRef.current);
    }
    
    saveIntervalRef.current = window.setInterval(() => {
      addToWatchHistory(video.id, currentTime, video.duration);
    }, 5000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 focus-visible"
        aria-label="Back to library"
      >
        <IconArrowLeft size={20} />
        <span>Back to Library</span>
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <VideoPlayer 
            video={video} 
            onTimeUpdate={handleTimeUpdate}
            startTime={progress?.currentTime}
          />
        </div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{video.category}</span>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(video.id)}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors focus-visible"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <IconHeartFilled size={24} className="text-red-500" />
            ) : (
              <IconHeart size={24} />
            )}
          </button>
        </div>

        <p className="text-gray-300 leading-relaxed">{video.description}</p>
      </div>
    </main>
  );
}
