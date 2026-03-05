import { useState, useMemo } from 'react';
import VideoCard from '@/components/VideoLibrary/VideoCard';
import SearchBar from '@/components/common/SearchBar';
import FilterBar from '@/components/VideoLibrary/FilterBar';
import { useUserStore } from '@/store/userStore';
import videosData from '@/data/videos.json';
import { Video } from '@/types';

const videos = videosData as Video[];

export default function VideoLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { watchHistory } = useUserStore();

  const categories = useMemo(() => {
    return Array.from(new Set(videos.map(v => v.category)));
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const continueWatching = useMemo(() => {
    return watchHistory
      .filter(w => w.currentTime > 5 && w.currentTime < w.duration - 10)
      .slice(0, 4)
      .map(w => videos.find(v => v.id === w.videoId))
      .filter(Boolean) as Video[];
  }, [watchHistory]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Video Library</h1>
        <div className="space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {continueWatching.length > 0 && searchQuery === '' && selectedCategory === 'All' && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Continue Watching</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {continueWatching.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {searchQuery ? 'Search Results' : selectedCategory === 'All' ? 'All Videos' : selectedCategory}
        </h2>
        {filteredVideos.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No videos found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
