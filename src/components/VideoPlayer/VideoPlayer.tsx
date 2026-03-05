import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type Player from 'video.js/dist/types/player';
import { Video } from '@/types';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import './videojs-custom.css';

interface VideoPlayerProps {
  video: Video;
  onTimeUpdate?: (currentTime: number) => void;
  startTime?: number;
}

export default function VideoPlayer({ video, onTimeUpdate, startTime = 0 }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const initializedRef = useRef(false);

  useKeyboardControls(playerRef.current, containerRef);

  useEffect(() => {
    if (!videoRef.current || initializedRef.current) return;

    initializedRef.current = true;
    const videoElement = videoRef.current;

    const player = videojs(videoElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      sources: video.sources,
    });

    playerRef.current = player;

    player.ready(() => {
      console.log('Video.js player ready');
      
      if (startTime > 0) {
        player.currentTime(startTime);
      }

      if (video.subtitles && video.subtitles.length > 0) {
        video.subtitles.forEach((subtitle) => {
          player.addRemoteTextTrack({
            kind: 'subtitles',
            src: subtitle.src,
            srclang: subtitle.srclang,
            label: subtitle.label,
          }, false);
        });
      }
    });

    if (onTimeUpdate) {
      player.on('timeupdate', () => {
        onTimeUpdate(player.currentTime() || 0);
      });
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="video-player-wrapper" tabIndex={-1}>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
        />
      </div>
      <div className="mt-4 p-4 bg-gray-800 rounded-lg text-sm text-gray-300">
        <p className="font-semibold mb-2">Keyboard Shortcuts:</p>
        <div className="grid grid-cols-2 gap-2">
          <span>Space/K: Play/Pause</span>
          <span>M: Mute/Unmute</span>
          <span>F: Fullscreen</span>
          <span>←/→: Seek ±5s</span>
          <span>↑/↓: Volume</span>
        </div>
      </div>
    </div>
  );
}
