import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StarBackground: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a2e] overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a0b3b] to-[#0a0a2e] opacity-80" />
      
      {/* Shooting Stars */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`shooting-${i}`}
          initial={{ top: "-10%", left: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ 
            top: "110%", 
            left: `${Math.random() * 100 - 20}%`, 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 10 + 5,
            ease: "linear"
          }}
          className="absolute w-[2px] h-[100px] bg-gradient-to-t from-transparent via-purple-400 to-white rotate-[45deg]"
        />
      ))}

      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
