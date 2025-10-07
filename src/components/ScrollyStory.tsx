import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Panel1 from './panels/Panel1';
import Panel2 from './panels/Panel2';
import Panel3 from './panels/Panel3';
import Panel4 from './panels/Panel4';
import Panel5 from './panels/Panel5';
import Panel6 from './panels/Panel6';
import Panel7 from './panels/Panel7';
import AudioPlayer from './AudioPlayer';
import { useAmbientSound } from '../hooks/useAmbientSound';

export default function ScrollyStory() {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const sriYantraOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0.3, 0.3, 0]);
  const sriYantraScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  useAmbientSound();

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 bg-opacity-10">

      <motion.div
        style={{ opacity: sriYantraOpacity, scale: sriYantraScale }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <img
          src="/Sri_Yantra_white.png"
          alt="Sri Yantra"
          className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] object-contain"
        />
      </motion.div>

      <Panel1 />
      <Panel2 />
      <Panel3 />
      <Panel4 />
      <Panel5 />
      <Panel6 />
      <Panel7 onListenClick={() => setShowAudioPlayer(true)} />

      {showAudioPlayer && (
        <AudioPlayer onClose={() => setShowAudioPlayer(false)} />
      )}
    </div>
  );
}
