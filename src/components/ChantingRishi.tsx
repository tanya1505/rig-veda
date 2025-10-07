import { motion } from 'framer-motion';

export default function ChantingRishi() {
  return (
    <motion.div
      className="w-60 h-60 md:w-64 md:h-64 lg:w-[30rem] lg:h-[30rem] relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full"
      >
        <img
          src="/Rishi.png"
          alt="Meditating Rishi"
          className="w-full h-full object-contain drop-shadow-2xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex items-center justify-center';
              fallback.innerHTML = `
                <svg width="100%" height="100%" viewBox="0 0 200 300" class="opacity-70">
                  <ellipse cx="100" cy="280" rx="40" ry="15" fill="#78350f" opacity="0.6" />
                  <path d="M100 280 Q95 200 100 150 Q95 100 100 60" stroke="#c2410c" stroke-width="25" fill="none" stroke-linecap="round"/>
                  <circle cx="100" cy="45" r="35" fill="#c2410c"/>
                  <circle cx="100" cy="40" r="15" fill="#f59e0b" opacity="0.8"/>
                  <path d="M70 60 Q60 70 55 85" stroke="#c2410c" stroke-width="12" fill="none" stroke-linecap="round"/>
                  <path d="M130 60 Q140 70 145 85" stroke="#c2410c" stroke-width="12" fill="none" stroke-linecap="round"/>
                  <circle cx="100" cy="180" r="8" fill="#ea580c" opacity="0.6"/>
                  <circle cx="100" cy="200" r="8" fill="#ea580c" opacity="0.6"/>
                  <circle cx="100" cy="220" r="8" fill="#ea580c" opacity="0.6"/>
                </svg>
              `;
              parent.appendChild(fallback);
            }
          }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/60 rounded-full"
            animate={{
              x: [0, 10 + i * 5],
              y: [0, -(15 + i * 10)],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
