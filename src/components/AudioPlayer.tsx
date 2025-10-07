import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  onClose: () => void;
}

const verseLines = [
  {
    mandala: 1,
    sanskrit: 'अग्निमीळे पुरोहितं यज्ञस्य देवम् ऋत्विजम् । होतारं रत्नधातमम् ॥',
    transliteration: 'agním īḷe purohitaṁ yajñasya devaṁ ṛtvijam, hotāraṁ ratnadhātamam',
    translation: 'I praise Agni, the priest set in front of the sacrifice, the divine officiant of the ritual, the invoker, and best bestower of treasures.',
    reference: 'Rigveda 1.1.1',
    note: 'The very first verse of the Rigveda — invoking Agni (Fire) as the link between humans and gods.',
    audioFile: '/audio/mandala-1.mp3'
  },
  {
    mandala: 2,
    sanskrit: 'इन्द्रं वो वीराः हवते कवीनां पुरुहूतं शक्रमीळते धियानः ॥',
    transliteration: 'indraṁ vo vīrāḥ havate kavīnāṁ puruhūtaṁ śakram īḷate dhiyānaḥ',
    translation: 'O heroes, invoke Indra, who is much-invoked among the wise, the mighty one (Śakra) whom seers praise in thought.',
    reference: 'Rigveda 2 — Hymn to Indra',
    note: 'Indra — the thunder-wielding deity — embodies courage, leadership, and victory over chaos.',
    audioFile: '/audio/mandala-2.mp3'
  },
  {
    mandala: 3,
    sanskrit: 'तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥',
    transliteration: 'tát savitúr vareṇyaṁ bhárgo devásya dhīmahi, dhíyo yó naḥ pracodáyāt',
    translation: 'We meditate upon the excellent radiance of the divine Savitṛ; may he stimulate and direct our intellects.',
    reference: 'Rigveda 3 — Gāyatrī Mantra',
    note: 'The Gāyatrī Mantra, the spiritual heart of the Vedas — a prayer for illumination and awakening.',
    audioFile: '/audio/mandala-3.mp3'
  },
  {
    mandala: 4,
    sanskrit: 'अग्ने शुक्रम् त्वं रयेः चित्रं रायः समिद्धः कवि भरा ॥',
    transliteration: 'agne śukraṁ tvaṁ rayeś citraṁ rāyaḥ samiddhaḥ kave bhara',
    translation: 'O Agni, when kindled, bring bright and splendid wealth; O wise one, bestow riches upon us.',
    reference: 'Rigveda 4 — Agni the Bestower',
    note: 'Agni here symbolizes illumination and prosperity — both material and spiritual.',
    audioFile: '/audio/mandala-4.mp3'
  },
  {
    mandala: 5,
    sanskrit: 'मरुतो याथा पथिभिः शुभा अशुभिर्मानुषाः शुभः पथः ॥',
    transliteration: 'maruto yāthā pathibhir yāthā gāḥ śubhāśubhir mānuṣāḥ śubhas pāthaḥ',
    translation: 'O Maruts, move by your paths, whether bright or dark; make the way auspicious for mankind.',
    reference: 'Rigveda 5 — Hymn to Maruts',
    note: 'The Maruts — deities of wind and storm — represent movement, power, and purification.',
    audioFile: '/audio/mandala-5.mp3'
  },
  {
    mandala: 6,
    sanskrit: 'उषा आगात् कृणोति शुभ्रं ज्योतिः शं नो भवतु दुहिता दिवः ॥',
    transliteration: 'uṣā āgat kṛṇotī śubhraṁ jyotiḥ śaṁ no bhavatu duhitā divo',
    translation: 'Uṣas (the Dawn) has come; she creates bright light; may the Daughter of Heaven bring peace to us.',
    reference: 'Rigveda 6 — Hymn to Uṣas',
    note: 'Uṣas personifies new beginnings and renewal — the ever-returning dawn of awareness.',
    audioFile: '/audio/mandala-6.mp3'
  },
  {
    mandala: 7,
    sanskrit: 'त्र्यंबकं यजामहे सुगंधिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मा अमृतात् ॥',
    transliteration: 'tryambakaṁ yajāmahe sugandhiṁ puṣṭivardhanam, urvārukam iva bandhanān mṛtyor mukṣīya mā amṛtāt',
    translation: 'We worship the Three-eyed One (Tryambaka), who is fragrant and nourishes all beings; may He liberate us from death, not from immortality.',
    reference: 'Rigveda 7.59.12 — Mahāmṛtyuñjaya Mantra',
    note: 'A prayer to Rudra (Śiva) for release from death, disease, and fear — symbolizing spiritual rebirth.',
    audioFile: '/audio/mandala-7.mp3'
  },
  {
    mandala: 8,
    sanskrit: 'अपाम सोमममृता अभूमा, आगन्म ज्योतिरविदाम देवान् ॥',
    transliteration: 'apāma somam amṛtā abhūma āganma jyotir avidāma devān',
    translation: 'We have drunk the Soma; we have become immortal; we have reached the Light; we have found the gods.',
    reference: 'Rigveda 8 — Hymn to Soma',
    note: 'A verse of ecstatic realization, symbolizing spiritual union with the divine essence.',
    audioFile: '/audio/mandala-8.mp3'
  },
  {
    mandala: 9,
    sanskrit: 'शुक्रं ते अन्यद् अरुषं ते अन्यद् वर्णो भूत्वा भवत्य यज्नियाय ॥',
    transliteration: 'śukraṁ te anyad aruṣaṁ te anyad varṇo bhūtvā bhavati yajñiyāya',
    translation: 'Your bright form is one, your reddish form another; changing your color, you become fit for the sacrifice.',
    reference: 'Rigveda 9 — Soma Pavamāna',
    note: 'The changing colors of Soma symbolize purification and transformation through the sacred act.',
    audioFile: '/audio/mandala-9.mp3'
  },
  {
    mandala: 10,
    sanskrit: 'नासदासीन्नो सदासीत्तदानीं, नासीद्रजो नो व्योमा परो यत् ॥',
    transliteration: 'nāsad āsīn no sad āsīt tadānīṁ nāsīd rajo no vyomā paro yat',
    translation: 'Then there was neither non-existence nor existence; there was no realm of air, nor the sky beyond it.',
    reference: 'Rigveda 10 — Nāsadīya Sūkta',
    note: 'The Creation Hymn — one of humanity\'s earliest philosophical reflections on existence itself.',
    audioFile: '/audio/mandala-10.mp3'
  },
];

export default function AudioPlayer({ onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bgMuted, setBgMuted] = useState(false);

  const verseAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgAudioRef.current = new Audio('/audio/ambient-background.mp3');
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.3;

    bgAudioRef.current.play().catch(() => {});

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      if (verseAudioRef.current) {
        verseAudioRef.current.pause();
        verseAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = bgMuted;
    }
  }, [bgMuted]);

  useEffect(() => {
    if (verseAudioRef.current) {
      verseAudioRef.current.pause();
    }

    verseAudioRef.current = new Audio(verseLines[currentLine].audioFile);
    verseAudioRef.current.volume = 0.8;

    const handleEnded = () => {
      if (isPlaying && currentLine < verseLines.length - 1) {
        setCurrentLine(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    const handleTimeUpdate = () => {
      if (verseAudioRef.current) {
        const percent = (verseAudioRef.current.currentTime / verseAudioRef.current.duration) * 100;
        setProgress(percent || 0);
      }
    };

    verseAudioRef.current.addEventListener('ended', handleEnded);
    verseAudioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    if (isPlaying) {
      verseAudioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (verseAudioRef.current) {
        verseAudioRef.current.removeEventListener('ended', handleEnded);
        verseAudioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [currentLine, isPlaying]);

  useEffect(() => {
    if (!isPlaying && verseAudioRef.current) {
      verseAudioRef.current.pause();
    } else if (isPlaying && verseAudioRef.current) {
      verseAudioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!isPlaying && currentLine >= verseLines.length - 1) {
      setCurrentLine(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentLine < verseLines.length - 1) {
      setCurrentLine(currentLine + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1);
      setProgress(0);
    }
  };

  const toggleBgMute = () => {
    setBgMuted(!bgMuted);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 lg:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-amber-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
            <button
              onClick={toggleBgMute}
              className="text-amber-100/60 hover:text-amber-100 transition-colors"
              title={bgMuted ? 'Unmute background audio' : 'Mute background audio'}
            >
              {bgMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="text-amber-100/60 hover:text-amber-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <motion.div
              className="text-center mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl text-amber-300 font-light mb-2">
                The Ten Maṇḍalas
              </h2>
              <p className="text-sm md:text-base text-amber-100/60 font-light">
                {verseLines[currentLine].reference}
              </p>
            </motion.div>

            <div className="mb-6 md:mb-8 min-h-[200px] md:min-h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLine}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-3 md:space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 mb-2 bg-amber-500/20 border border-amber-500/40 rounded-full"
                  >
                    <span className="text-sm md:text-base text-amber-300 font-medium">
                      Maṇḍala {verseLines[currentLine].mandala}
                    </span>
                  </motion.div>

                  <p className="text-xl md:text-2xl lg:text-3xl text-amber-200 font-light px-4">
                    {verseLines[currentLine].sanskrit}
                  </p>

                  <p className="text-sm md:text-base lg:text-lg text-amber-100/70 italic px-4">
                    {verseLines[currentLine].transliteration}
                  </p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs md:text-sm lg:text-base text-blue-200/80 font-light mt-3 px-4"
                  >
                    {verseLines[currentLine].translation}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-amber-100/50 italic mt-3 px-4 pt-3 border-t border-amber-500/20"
                  >
                    {verseLines[currentLine].note}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-4">
                <motion.button
                  onClick={handlePrev}
                  disabled={currentLine === 0}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-700/80 flex items-center justify-center text-amber-300 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: currentLine === 0 ? 1 : 1.1 }}
                  whileTap={{ scale: currentLine === 0 ? 1 : 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>

                <motion.button
                  onClick={handlePlayPause}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause className="w-6 h-6 md:w-7 md:h-7" /> : <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" />}
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={currentLine === verseLines.length - 1}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-700/80 flex items-center justify-center text-amber-300 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: currentLine === verseLines.length - 1 ? 1 : 1.1 }}
                  whileTap={{ scale: currentLine === verseLines.length - 1 ? 1 : 0.95 }}
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </div>

              <div className="text-center text-amber-100/60 text-xs font-light">
                {currentLine + 1} of {verseLines.length} • {isPlaying ? 'Listening to ancient wisdom...' : 'Press play to begin'}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
