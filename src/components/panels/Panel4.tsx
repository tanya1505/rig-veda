import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sanskritGlyphs = ['ॐ', 'ऋ', 'त', 'म्', 'ध', 'य', 'ज्', 'ञ'];

export default function Panel4() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-amber-900/20 to-slate-900" />

      <div className="absolute inset-0 flex items-center justify-center">
        {sanskritGlyphs.map((glyph, i) => {
          const angle = (i * 360) / sanskritGlyphs.length;
          const radius = 250;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={i}
              className="absolute text-7xl font-light"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.4, 0.4, 0],
                scale: [0, 1, 1, 1.5],
                x: [0, x * 0.5, x, x * 1.5],
                y: [0, y * 0.5, y, y * 1.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
            >
              <span className="text-amber-400">{glyph}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          <Flame className="w-40 h-40 text-amber-500/30" strokeWidth={0.5} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y }}
        className="relative z-10 text-center px-8 max-w-4xl"
      >
        <motion.h2
          className="text-5xl md:text-6xl text-amber-200 font-serif font-light mb-8 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          The Meaning of the Rigveda
        </motion.h2>

        <motion.p
          className="text-2xl md:text-3xl text-amber-100/90 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          More than words — a bridge between earth and cosmos,
        </motion.p>
        <motion.p
          className="text-2xl md:text-3xl text-amber-100/90 font-light leading-relaxed mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          where poetry, philosophy, and ritual become one.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

function Flame({ className, strokeWidth }: { className: string; strokeWidth: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
    >
      <path d="M12 2c-3 5-8 8-8 12a8 8 0 0 0 16 0c0-4-5-7-8-12Z" />
      <path d="M12 8c-1 2-3 3-3 5a3 3 0 0 0 6 0c0-2-2-3-3-5Z" />
    </svg>
  );
}
