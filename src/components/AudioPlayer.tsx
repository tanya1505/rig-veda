import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  onClose: () => void;
}

const verseLines = [
  {
  mandala: 1,
  sanskrit: 'अग्निमीळे पुरोहितं यज्ञस्य देवम् ऋत्विजम् । होतारं रत्नधातमम् ॥१॥',
  transliteration: 'agním īḷe purohitaṁ yajñasya devaṁ ṛtvijam, hotāraṁ ratnadhātamam',
  translation: 'I praise Agni, the priest placed in front of the sacrifice, the divine officiant of the ritual, the invoker, and best bestower of treasures.',
  reference: 'Rigveda 1.1.1',
  note: 'The opening verse of the Rigveda — invoking Agni (Fire) as the divine messenger who connects mortals and gods.',
  audioFile: '/audio/mandala-1.mp3'
},
{
  mandala: 2,
  sanskrit: 'यो जात एव प्रथमो मनस्वान् देवो देवान् क्रतुना पर्यभूषत् । यस्य शुष्माद् रोदसी अभ्यसेतां नृम्णस्य मह्ना स जनास इन्द्रः ॥१॥',
  transliteration: 'yo jāta eva prathamo manasvān devo devān kratunā paryabhūṣat, yasya śuṣmād rodasī abhyasetāṁ nṛmṇasya mahnā sa janāsa indraḥ',
  translation: 'He who, born first, mighty in mind, adorned the gods with wisdom — by whose power heaven and earth tremble — he, O people, is Indra.',
  reference: 'Rigveda 2.12.1',
  note: 'A hymn glorifying Indra as the foremost and most powerful among gods, whose strength sustains the cosmos.',
  audioFile: '/audio/mandala-2.mp3'
},
{
  mandala: 3,
  sanskrit: 'विश्वानि देवा सवितर् दूर्धा नि परासुव । यद् भद्रं तन् न आसुव ॥१०॥',
  transliteration: 'viśvāni devā savitar duritāni parāsuva, yad bhadraṁ tan na āsuva',
  translation: 'O divine Savitar, remove all evil and grant us what is good and auspicious.',
  reference: 'Rigveda 3.62.10',
  note: 'The Gayatri Mantra — one of the most sacred verses of the Rigveda, invoking Savitar, the divine source of light and inspiration.',
  audioFile: '/audio/mandala-3.mp3'
},
{
  mandala: 4,
  sanskrit: 'त्वां ह्यग्ने सदमित्समन्यवो देवासो देवमरतिं न्येरिर इति क्रत्वा न्येरिरे । अमर्त्यं यजतं मर्त्येष्वा देवमादेवं जनत प्रचेतसं विश्वमादेवं जनत प्रचेतसम् ॥१॥',
  transliteration: 'tvāṁ hy agne sadam it samanyavo devāso devam aratiṁ nyerir iti kratvā nyerire, amartyaṁ yajataṁ martyeṣvā devam ādevaṁ janata pracetasaṁ viśvam ādevaṁ janata pracetasaṁ',
  translation: 'For you, O Agni, ever and always the gods have chosen you — the immortal among mortals, the divine seer born of the gods, all-knowing and ever-wise.',
  reference: 'Rigveda 4.1.1',
  note: 'This hymn opens Mandala 4, praising Agni as the eternal divine intelligence dwelling among men.',
  audioFile: '/audio/mandala-4.mp3'
},
{
  mandala: 5,
  sanskrit: 'यत् प्रायासिष्ट पृषतीभिरश्वैः वीळुपविभिर्मरुतो रथेभिः । क्षोदन्त आपो रिणते वनान्यवो स्रियो वृषभः क्रन्दतु द्यौः ॥६॥',
  transliteration: 'yat prāyāsiṣṭa pṛṣatībhir aśvaiḥ vīḷupavibhir maruto rathebhih, kṣodanta āpo riṇate vanānya vo sriyo vṛṣabhaḥ krandatu dyaūḥ',
  translation: 'When you, O Maruts, drive forth with your spotted steeds and shining chariots, the waters roar, the forests quake, and the heavens thunder like a bull.',
  reference: 'Rigveda 5.58.6',
  note: 'A vivid hymn to the Maruts — storm deities symbolizing energy, vitality, and cosmic movement.',
  audioFile: '/audio/mandala-5.mp3'
},
{
  mandala: 6,
  sanskrit: 'उदु श्रिय उषसो रोचमाना अस्थुरपां नोर्मयो रुशन्तः । कृणोति विश्वा सुपथा सुगान्यभूदु वस्वी दक्षिणा मघोनी ॥१॥',
  transliteration: 'udu śriya uṣaso rocamānā asthur apāṁ normayo ruśantaḥ, kṛṇoti viśvā supathā sugāny abhūd u vasvī dakṣiṇā maghonī',
  translation: 'The radiant dawns have risen in splendor, their waves shining with brightness; they create all fair paths — generous, blessed, and full of bounty.',
  reference: 'Rigveda 6.64.1',
  note: 'A hymn celebrating Ushas (the Dawn) as the bringer of light, order, and prosperity to the world.',
  audioFile: '/audio/mandala-6.mp3'
},
{
  mandala: 7,
  sanskrit: 'त्र्यंबकं यजामहे सुगंधिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मा अमृतात् ॥१२॥',
  transliteration: 'tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam, urvārukam iva bandhanān mṛtyor mukṣīya mā’mṛtāt',
  translation: 'We worship the Three-eyed One, fragrant and nourishing all beings; may He liberate us from death’s bondage, like a cucumber released from its stem, but not from immortality.',
  reference: 'Rigveda 7.59.12',
  note: 'The Mahāmṛtyuñjaya Mantra — invoking Rudra (Shiva) for healing, longevity, and liberation from the cycle of death.',
  audioFile: '/audio/mandala-7.mp3'
},
{
  mandala: 8,
  sanskrit: 'अपाम सोमममृता अभूमागन्म ज्योतिरविदाम देवान् । किं नूनमस्मान्कृणवदरातिः किमु धूर्तिरमृत मर्त्यस्य ॥३॥',
  transliteration: 'apām somam amṛtā abhūma āganma jyotir avidāma devān, kiṁ nūnam asmān kṛṇavad arātiḥ kimu dhūrtir amṛta martyasya',
  translation: 'We have drunk the Soma, we have become immortal, we have reached the light, we have found the gods. What harm can enmity or deceit do to us now, O immortal one, against the mortal?',
  reference: 'Rigveda 8.48.3',
  note: 'One of the most ecstatic Soma hymns, describing mystical union and spiritual illumination through the divine drink.',
  audioFile: '/audio/mandala-8.mp3'
},
{
  mandala: 9,
  sanskrit: 'सोमः पवते जनिता मतीनां जनिता दिवो जनिता पृथिव्याः । जनिताग्नेर्जनिता सूर्यस्य जनितेन्द्रस्य जनितोत विष्णोः ॥५॥',
  transliteration: 'somaḥ pavate janitā matīnām janitā divo janitā pṛthivyāḥ, janitāgner janitā sūryasya janitendrasya janitota viṣṇoḥ',
  translation: 'Soma, the flowing one, is the generator of inspirations, the creator of heaven and earth, the source of Agni, the Sun, Indra, and Vishnu.',
  reference: 'Rigveda 9.95.5',
  note: 'A hymn to Soma as the divine creative principle, the life-force underlying all gods and worlds.',
  audioFile: '/audio/mandala-9.mp3'
},
{
  mandala: 10,
  sanskrit: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् । किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥१॥',
  transliteration: 'nāsad āsīn no sad āsīt tadānīṁ nāsīd rajo no vyomā paro yat, kim āvarīvaḥ kuha kasya śarman ambhaḥ kim āsīd gahanaṁ gabhīram',
  translation: 'Then was neither non-existence nor existence; there was no realm of air, no sky beyond. What covered it? Where was it? In whose keeping? Was there the deep unfathomed water?',
  reference: 'Rigveda 10.129.1',
  note: 'The opening of the Nasadiya Sukta — a profound philosophical hymn contemplating the origin of creation and the mystery of being.',
  audioFile: '/audio/mandala-10.mp3'
}
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
