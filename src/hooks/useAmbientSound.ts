import { useEffect, useRef } from 'react';

export function useAmbientSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const initAudio = () => {
      audioContextRef.current = new AudioContext();
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(110, audioContextRef.current.currentTime);

      gainNode.gain.setValueAtTime(0.02, audioContextRef.current.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;

      const modulate = () => {
        if (!audioContextRef.current || !oscillatorRef.current) return;

        oscillatorRef.current.frequency.setValueAtTime(
          110 + Math.sin(Date.now() / 2000) * 20,
          audioContextRef.current.currentTime
        );

        requestAnimationFrame(modulate);
      };

      modulate();
    };

    const handleInteraction = () => {
      if (!audioContextRef.current) {
        initAudio();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);

      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null;
}
