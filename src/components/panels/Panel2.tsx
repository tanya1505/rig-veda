import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function Panel2() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900/40 to-slate-900" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Flame className="w-64 h-64 text-orange-500" strokeWidth={1} />
          <motion.div
            className="absolute inset-0 blur-3xl bg-orange-500/40 rounded-full scale-150"
            animate={{
              scale: [1.5, 1.8, 1.5],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            y: [-20, -200 - Math.random() * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [1, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      ))}

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
          The First Songs
        </motion.h2>

        <motion.p
          className="text-2xl md:text-3xl text-orange-100/90 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          From silence came sound — hymns to Fire, to Dawn,
        </motion.p>
        <motion.p
          className="text-2xl md:text-3xl text-orange-100/90 font-light leading-relaxed mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          voices rising like smoke into the cosmic order.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
