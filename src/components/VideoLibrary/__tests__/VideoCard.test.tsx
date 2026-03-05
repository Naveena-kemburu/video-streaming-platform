import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { Video } from '@/types';

const mockVideo: Video = {
  id: '1',
  title: 'Test Video',
  description: 'Test description',
  thumbnail: 'https://example.com/thumb.jpg',
  duration: 600,
  category: 'Test',
  sources: [],
};

describe('VideoCard', () => {
  it('renders video information', () => {
    render(
      <BrowserRouter>
        <VideoCard video={mockVideo} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('displays thumbnail with alt text', () => {
    render(
      <BrowserRouter>
        <VideoCard video={mockVideo} />
      </BrowserRouter>
    );

    const img = screen.getByAltText('Test Video');
    expect(img).toBeInTheDocument();
  });
});
