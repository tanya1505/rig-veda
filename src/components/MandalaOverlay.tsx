import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const mandalas = [
  { number: 1, name: "To Agni", family: "Various Rishis", hymns: 191 },
  { number: 2, name: "Family Book", family: "Gṛtsamada", hymns: 43 },
  { number: 3, name: "Family Book", family: "Viśvāmitra", hymns: 62 },
  { number: 4, name: "Family Book", family: "Vāmadeva", hymns: 58 },
  { number: 5, name: "Family Book", family: "Atri", hymns: 87 },
  { number: 6, name: "Family Book", family: "Bharadvāja", hymns: 75 },
  { number: 7, name: "Family Book", family: "Vasiṣṭha", hymns: 104 },
  { number: 8, name: "To Various", family: "Mixed", hymns: 103 },
  { number: 9, name: "To Soma", family: "Pavamāna", hymns: 114 },
  { number: 10, name: "Creation", family: "Various", hymns: 191 },
];

interface MandalaOverlayProps {
  scrollYProgress: any;
}

export default function MandalaOverlay({
  scrollYProgress,
}: MandalaOverlayProps) {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="relative flex items-center justify-center pointer-events-none w-full max-w-[90vw] mx-auto">
      <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] aspect-square">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/80 via-amber-950/40 to-slate-900/80 backdrop-blur-md border-2 border-amber-500/40 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="mandalaGlow">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="500" cy="500" r="450" fill="url(#mandalaGlow)" />

          {[1, 2, 3, 4].map((ring) => (
            <motion.circle
              key={`ring-${ring}`}
              cx="500"
              cy="500"
              r={ring * 100}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
              strokeOpacity={0.1 / ring}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 + ring * 0.2 }}
            />
          ))}

          {mandalas.map((_, i) => {
            const angle = i * 36 * (Math.PI / 180);
            const x1 = 500;
            const y1 = 500;
            const x2 = 500 + Math.cos(angle) * 400;
            const y2 = 500 + Math.sin(angle) * 400;

            return (
              <motion.line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeOpacity="0.15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 + i * 0.08 }}
              />
            );
          })}

          {Array.from({ length: 36 }).map((_, i) => {
            const angle = i * 10 * (Math.PI / 180);
            const x = 500 + Math.cos(angle) * 440;
            const y = 500 + Math.sin(angle) * 440;
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="2"
                fill="#f59e0b"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + i * 0.02 }}
              />
            );
          })}
        </svg>

        <motion.div style={{ rotate }} className="absolute inset-0">
          {mandalas.map((mandala, i) => {
            const angle = i * 36 * (Math.PI / 180);
            const radius = 64;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            return (
              <motion.div
                key={i}
                className="absolute pointer-events-auto"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + i * 0.1,
                }}
              >
                <motion.div
                  style={{ rotate: useTransform(rotate, (r) => -r) }}
                  className="relative -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    className="bg-slate-800/95 backdrop-blur-sm border border-amber-500/50 rounded-xl p-1.5 sm:p-2 md:p-3 min-w-[70px] sm:min-w-[90px] md:min-w-[110px] lg:min-w-[130px] shadow-xl"
                    whileHover={{
                      scale: 1.2,
                      borderColor: "rgba(245, 158, 11, 0.8)",
                      backgroundColor: "rgba(30, 41, 59, 0.98)",
                      boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)",
                      zIndex: 20,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-amber-400 mb-0.5 md:mb-1">
                        {mandala.number}
                      </div>
                      <div className="text-[32px] sm:text-[9px] md:text-[14px] text-amber-200/80 font-light mb-0.5">
                        {mandala.name}
                      </div>
                      <div className="text-[16px] sm:text-[8px] md:text-[14px] text-amber-100/60 font-light">
                        {mandala.family}
                      </div>
                      <div className="text-[16px] sm:text-[8px] md:text-[14px] text-amber-100/40 font-light mt-0.5">
                        {mandala.hymns} hymns
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              // <h1>Abhishek</h1>
            );
          })}
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-slate-900/95 backdrop-blur-md border-2 border-amber-500/70 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center pointer-events-auto shadow-2xl"
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          transition={{ duration: 1, delay: 2.5 }}
          whileHover={{
            scale: 1,
            boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
          }}
        >
          <div className="text-center px-1 sm:px-2">
            <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif text-amber-300 font-bold">
              Rigveda
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-amber-100/70">
              10 Maṇḍalas
            </div>
            <div className="text-[8px] sm:text-[9px] md:text-xs text-amber-100/50">
              1,028 hymns
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
