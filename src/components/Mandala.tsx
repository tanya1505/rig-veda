import { motion } from 'framer-motion';

interface MandalaProps {
  stage: number;
}

export default function Mandala({ stage }: MandalaProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        className="opacity-20"
      >
        <motion.circle
          cx="400"
          cy="400"
          r="8"
          fill="#f59e0b"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? 1 : 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {stage >= 2 && (
          <>
            {[1, 2, 3].map((ring) => (
              <motion.circle
                key={`ring-${ring}`}
                cx="400"
                cy="400"
                r={40 * ring}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 0.6,
                  scale: 1,
                }}
                transition={{ duration: 1.5, delay: ring * 0.2 }}
              />
            ))}
          </>
        )}

        {stage >= 3 && (
          <>
            {[0, 120, 240].map((angle, i) => {
              const radians = (angle * Math.PI) / 180;
              const x1 = 400;
              const y1 = 400;
              const x2 = 400 + Math.cos(radians) * 150;
              const y2 = 400 + Math.sin(radians) * 150;

              return (
                <motion.path
                  key={`spoke-${i}`}
                  d={`M ${x1} ${y1} Q ${x1 + Math.cos(radians) * 75} ${
                    y1 + Math.sin(radians) * 75
                  } ${x2} ${y2}`}
                  stroke="#0891b2"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2, delay: i * 0.3 }}
                />
              );
            })}
          </>
        )}

        {stage >= 4 && (
          <>
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const radians = ((angle - 90) * Math.PI) / 180;
              const cx = 400 + Math.cos(radians) * 100;
              const cy = 400 + Math.sin(radians) * 100;

              return (
                <motion.g key={`petal-${i}`}>
                  <motion.ellipse
                    cx={cx}
                    cy={cy}
                    rx="25"
                    ry="50"
                    fill="#f59e0b"
                    fillOpacity="0.3"
                    transform={`rotate(${angle} ${cx} ${cy})`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: i < 3 ? 0.5 : 0,
                      scale: i < 3 ? 1 : 0,
                    }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                  />
                </motion.g>
              );
            })}
          </>
        )}

        {stage >= 5 && (
          <>
            {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((angle, i) => {
              const radians = ((angle - 90) * Math.PI) / 180;
              const cx = 400 + Math.cos(radians) * 180;
              const cy = 400 + Math.sin(radians) * 180;

              return (
                <motion.circle
                  key={`rishi-${i}`}
                  cx={cx}
                  cy={cy}
                  r="12"
                  fill="#f59e0b"
                  fillOpacity="0.6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.4],
                    scale: [0, 1.2, 1],
                    r: [12, 15, 8],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    times: [0, 0.5, 1],
                  }}
                />
              );
            })}
          </>
        )}

        {stage >= 6 && (
          <>
            {Array.from({ length: 10 }).map((_, ring) => (
              <motion.circle
                key={`full-ring-${ring}`}
                cx="400"
                cy="400"
                r={50 + ring * 30}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.4,
                  scale: 1,
                }}
                transition={{ duration: 1, delay: ring * 0.1 }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i * 36 - 90) * (Math.PI / 180);
              const x2 = 400 + Math.cos(angle) * 350;
              const y2 = 400 + Math.sin(angle) * 350;

              return (
                <motion.line
                  key={`spoke-${i}`}
                  x1="400"
                  y1="400"
                  x2={x2}
                  y2={y2}
                  stroke="#f59e0b"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: 1 + i * 0.05 }}
                />
              );
            })}

            <motion.circle
              cx="400"
              cy="400"
              r="30"
              fill="#f59e0b"
              fillOpacity="0.8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2 }}
            />

            <motion.circle
              cx="400"
              cy="400"
              r="15"
              fill="#fbbf24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
            />
          </>
        )}

        {stage >= 7 && (
          <motion.circle
            cx="400"
            cy="400"
            r="350"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeOpacity="0.3"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </svg>
    </div>
  );
}
