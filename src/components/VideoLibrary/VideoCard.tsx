import { Link } from 'react-router-dom';
import { IconHeart, IconHeartFilled, IconClock } from '@tabler/icons-react';
import { Video } from '@/types';
import { useUserStore } from '@/store/userStore';
import { formatDuration } from '@/utils/formatTime';
import { useState } from 'react';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { favorites, toggleFavorite, getProgress } = useUserStore();
  const isFavorite = favorites.includes(video.id);
  const progress = getProgress(video.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const progressPercentage = progress 
    ? (progress.currentTime / progress.duration) * 100 
    : 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(video.id);
  };

  return (
    <Link 
      to={`/video/${video.id}`}
      className="group block bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all focus-visible"
    >
      <div className="relative aspect-video bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-700" />
        )}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {progress && progressPercentage > 5 && progressPercentage < 95 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
            <div 
              className="h-full bg-primary-500" 
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Watch progress"
            />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-colors focus-visible"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <IconHeartFilled size={20} className="text-red-500" />
            ) : (
              <IconHeart size={20} className="text-white" />
            )}
          </button>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-gray-900/80 rounded text-xs">
          {formatDuration(video.duration)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-500 transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
        {progress && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <IconClock size={14} />
            <span>Continue watching</span>
          </div>
        )}
      </div>
    </Link>
  );
}
