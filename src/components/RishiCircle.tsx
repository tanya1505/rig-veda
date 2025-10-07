import { motion } from "framer-motion";

export default function RishiCircle() {
  return (
    <div className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-10">
      <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-96 lg:h-96">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-orange-600/40 to-amber-600/40 blur-2xl" />
        </motion.div>

        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute left-1/2 top-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -60 - Math.random() * 30, -80 - Math.random() * 40],
              x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <img
            src="/rishi2.png"
            alt="Meditating Rishi"
            className="w-full h-full object-contain drop-shadow-2xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.className =
                  "w-full h-full flex items-center justify-center";
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

        {/* <motion.div
          className="absolute left-1/2 bottom-2 md:bottom-4 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <motion.path
              d="M12 2c-3 5-8 8-8 12a8 8 0 0 0 16 0c0-4-5-7-8-12Z"
              fill="url(#fireGradient)"
              stroke="#f59e0b"
              strokeWidth="0.5"
              animate={{
                d: [
                  'M12 2c-3 5-8 8-8 12a8 8 0 0 0 16 0c0-4-5-7-8-12Z',
                  'M12 2c-3 5-7 9-7 12a7 7 0 0 0 14 0c0-3-4-7-7-12Z',
                  'M12 2c-3 5-8 8-8 12a8 8 0 0 0 16 0c0-4-5-7-8-12Z',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M12 8c-1 2-3 3-3 5a3 3 0 0 0 6 0c0-2-2-3-3-5Z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="0.5"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <defs>
              <linearGradient id="fireGradient" x1="12" y1="2" x2="12" y2="22">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div> */}
      </div>
    </div>
  );
}
