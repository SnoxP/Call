import React, { useEffect, useRef } from 'react';

interface VideoFeedProps {
  stream: MediaStream | null;
  isMuted?: boolean;
  name: string;
  isScreen?: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ stream, isMuted = false, name, isScreen = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const avatarColor = React.useMemo(() => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'];
    return colors[name.charCodeAt(0) % colors.length];
  }, [name]);


  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        className={`w-full h-full object-contain transition-opacity duration-300 ${!stream ? 'opacity-0' : 'opacity-100'}`}
      ></video>
      
      {!stream && (
        <div className={`absolute inset-0 flex items-center justify-center ${avatarColor}`}>
          <span className="text-4xl font-bold text-white">{name.charAt(0).toUpperCase()}</span>
        </div>
      )}

      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-3 py-1 rounded-md text-sm font-semibold">
        {isScreen ? `Tela de ${name}` : name}
      </div>
    </div>
  );
};

export default VideoFeed;
