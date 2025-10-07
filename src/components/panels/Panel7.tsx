import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, Home } from 'lucide-react';
import ChantingRishi from '../ChantingRishi';

interface Panel7Props {
  onListenClick: () => void;
}

export default function Panel7({ onListenClick }: Panel7Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 1]);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 md:py-20"
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(120, 53, 15, 0.3) 0%, #0f172a 60%)',
            'radial-gradient(circle at 50% 50%, rgba(146, 64, 14, 0.4) 0%, #0f172a 60%)',
            'radial-gradient(circle at 50% 50%, rgba(120, 53, 15, 0.3) 0%, #0f172a 60%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <ChantingRishi />
          </motion.div>

          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl text-amber-200 font-serif font-light mb-6 md:mb-8 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              The Living Voice
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-amber-100/80 font-light leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              The same voice that rose from ancient fires
            </motion.p>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-amber-100/80 font-light leading-relaxed mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              still echoes today — an unbroken thread across time.
            </motion.p>

            <motion.div
              className="mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl text-amber-300 font-light mb-2 tracking-wide">
                अग्निमीळे पुरोहितं
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-amber-100/60 font-light italic mb-2">
                agním īḷe purohitaṃ
              </p>
              <p className="text-base md:text-lg text-amber-100/50 font-light">
                Rigveda 1.1.1
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={onListenClick}
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white text-base md:text-lg font-light shadow-2xl overflow-hidden pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  Hear the First Hymn
                </span>
              </motion.button>

              <motion.button
                onClick={handleHomeClick}
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-slate-700/80 rounded-full text-amber-200 text-base md:text-lg font-light shadow-2xl overflow-hidden pointer-events-auto border border-amber-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-slate-600/80"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  Return to Beginning
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
