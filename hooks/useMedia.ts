import { useState, useCallback, useRef } from 'react';

export const useMedia = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const startMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      setLocalStream(stream);
      setIsCameraOn(true);
      setIsMicOn(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }, []);

  const stopMedia = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }, []);
  
  // FIX: Moved stopScreenShare before startScreenShare to avoid it being used before declaration
  const stopScreenShare = useCallback(() => {
    if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
        screenStreamRef.current = null;
        setScreenStream(null);
        setIsSharingScreen(false);
    }
  }, []);

  const startScreenShare = useCallback(async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        screenStreamRef.current = stream;
        setScreenStream(stream);
        setIsSharingScreen(true);
        // Stop sharing when the browser button is clicked
        stream.getVideoTracks()[0].onended = () => {
            stopScreenShare();
        };
    } catch (error) {
        console.error("Error sharing screen.", error);
    }
  }, []);

  const toggleMic = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    }
  }, [isMicOn]);

  const toggleCamera = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
    }
  }, [isCameraOn]);
  
  const toggleScreenShare = useCallback(() => {
    if(isSharingScreen) {
        stopScreenShare();
    } else {
        startScreenShare();
    }
  }, [isSharingScreen, startScreenShare, stopScreenShare]);


  return {
    localStream,
    screenStream,
    isMicOn,
    isCameraOn,
    isSharingScreen,
    startMedia,
    stopMedia,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    // FIX: Export stopScreenShare to be available in other components
    stopScreenShare,
  };
};