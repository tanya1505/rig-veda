import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Panel3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="h-screen relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900" />

      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((river) => (
          <motion.div
            key={river}
            className="absolute w-full"
            style={{
              top: `${30 + river * 15}%`,
            }}
          >
            <svg
              className="w-full h-32"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <motion.path
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
                strokeOpacity="0.3"
                d="M0,160 Q360,120 720,160 Q1080,200 1440,160"
                animate={{
                  d: [
                    'M0,160 Q360,120 720,160 Q1080,200 1440,160',
                    'M0,140 Q360,180 720,140 Q1080,100 1440,140',
                    'M0,160 Q360,120 720,160 Q1080,200 1440,160',
                  ],
                }}
                transition={{
                  duration: 8 + river * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: river * 0.5,
                }}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-1 bg-teal-400/40 rounded-full"
          style={{
            left: `${10 + i * 6}%`,
            top: `${40 + Math.sin(i) * 10}%`,
          }}
          animate={{
            x: [0, 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'linear',
          }}
        />
      ))}

      <motion.div
        style={{ y }}
        className="relative z-10 text-center px-8 max-w-4xl"
      >
        <motion.h2
          className="text-5xl md:text-6xl text-teal-200 font-serif font-light mb-8 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          The River of Time
        </motion.h2>

        <motion.p
          className="text-2xl md:text-3xl text-teal-100/90 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          By the banks of Sarasvatī and Sindhu,
        </motion.p>
        <motion.p
          className="text-2xl md:text-3xl text-teal-100/90 font-light leading-relaxed mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          flowing through millennia, carrying sacred verses.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
