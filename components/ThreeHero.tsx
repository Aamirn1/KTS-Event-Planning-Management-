
import React from 'react';
import { motion } from 'framer-motion';

const ThreeHero: React.FC = () => {
  return (
    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden perspective-[1000px]">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-64 h-64 transform-style-3d"
      >
        {/* Simplified 3D Stage Simulation */}
        <div className="absolute inset-0 bg-yellow-600/20 border-2 border-[#d4af37] flex items-center justify-center rounded-lg glass shadow-[0_0_50px_rgba(212,175,55,0.3)]">
           <div className="text-center">
             <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-2" />
             <p className="text-[#d4af37] font-serif text-2xl">KTS</p>
             <p className="text-xs uppercase tracking-widest text-white/60">Events & Decor</p>
           </div>
        </div>
        
        {/* Orbiting elements */}
        {[0, 90, 180, 270].map((rot) => (
          <div
            key={rot}
            style={{ transform: `rotateY(${rot}deg) translateZ(160px)` }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/50"
          >
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
          </div>
        ))}
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]" />
    </div>
  );
};

export default ThreeHero;
