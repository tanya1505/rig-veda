import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MandalaOverlay from "../MandalaOverlay";

export default function Panel6() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-16 md:py-20 px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-900" />

      <div className="relative z-20 w-full h-[130vh] flex items-center justify-center">
        <MandalaOverlay scrollYProgress={scrollYProgress} />

        <motion.div
          className="absolute top-8 md:top-12 lg:top-72 left-0 right-0 text-center px-4"
          // className="absolute top-52  left-0 right-0 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-5xl text-amber-200 font-serif font-light mb-4 md:mb-6 tracking-wide">
            The Family Books
          </h2>

          <p className="text-lg md:text-2xl lg:text-3xl text-amber-100/90 font-light leading-relaxed">
            Ten maṇḍalas, each a world complete —
          </p>
          <p className="text-lg md:text-2xl lg:text-3xl text-amber-100/90 font-light leading-relaxed mt-2 md:mt-4">
            from family lineages to cosmic mysteries.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
