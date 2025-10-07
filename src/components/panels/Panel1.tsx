import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Panel1() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="h-screen relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-slate-900/30 to-slate-900/30 " />
      {/* <div className="absolute inset-0   " /> */}

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 60%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 40%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        style={{ y }}
        className="relative z-10 text-center px-8 max-w-4xl"
      >
        <motion.h1
          className="text-6xl md:text-7xl text-blue-100 font-serif font-light mb-8 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          The World Before Words
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-blue-200/80 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.2 }}
        >
          In the beginning, there was only silence —
        </motion.p>

        <motion.p
          className="text-2xl md:text-3xl text-blue-200/80 font-light leading-relaxed mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.8 }}
        >
          the breath of wind, the flow of rivers, the distant stars.
        </motion.p>

        <motion.div
          className="mt-16 text-blue-300/50 text-lg font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        >
          Scroll to continue &darr;
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
