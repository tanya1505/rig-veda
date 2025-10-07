import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RishiCircle from '../RishiCircle';

export default function Panel5() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-orange-950/30 to-slate-900" />

      <RishiCircle />

      <motion.div
        style={{ y }}
        className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-7xl ml-auto mr-8 md:mr-16 lg:mr-24"
      >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl text-orange-200 font-serif font-light mb-6 md:mb-8 tracking-wide"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          The Seers
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-orange-100/90 font-light leading-relaxed max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          A rishi sits beside the sacred fire,
        </motion.p>
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-orange-100/90 font-light leading-relaxed mt-4 max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          a channel of divine sound, keeper of cosmic order.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
