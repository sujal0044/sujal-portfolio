import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Dribbble, Github, Instagram, Volume2 } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef(null);

  // Custom Cursor Spring Animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Loading animation simulation for preloader
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  // Text skew animation variants
  const textVariants = {
    initial: { skewY: -10, y: 100, opacity: 0 },
    animate: { skewY: 0, y: 0, opacity: 1 },
    transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  };

  return (
    <div className="relative min-h-screen font-display selection:bg-[#ff6a00] selection:text-white overflow-x-hidden">
      
      {/* 1. Custom Interactive Cursor */}
      <motion.div
        className="fixed w-5 h-5 bg-[#ff6a00] rounded-full pointer-events-none z-[100] blur-[1px] shadow-[0_0_20px_4px_#ff6a00]"
        style={{ left: cursorSpringX, top: cursorSpringY }}
        ref={cursorRef}
      />

      {/* 2. Preloader (like in the video with single Start button) */}
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark"
        >
          <div className="relative flex items-center justify-center">
            {/* Minimal SP initials loader */}
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl font-display font-bold tracking-widest text-white"
            >
              SP<span className="text-[#ff6a00]">.</span>
            </motion.h1>
          </div>
          
          <motion.button 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.5 }}
             onClick={() => setLoading(false)}
             className="mt-12 px-10 py-3 bg-white text-black font-bold rounded-full uppercase tracking-widest text-xs hover:bg-[#ff6a00] hover:text-white transition-colors duration-300"
          >
            Start Experience
          </motion.button>
        </motion.div>
      )}

      {/* 3. Main Site Container */}
      {!loading && (
        <div className="relative w-full h-full">

          {/* 4. Cinematic Fixed Video Background (like Minh Pham) */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="fixed inset-0 w-full h-full object-cover grayscale opacity-[0.15] -z-20 pointer-events-none"
          >
            {/* If you have your cinematic-sujal.mp4 file on your GitHub, use this line. 
               Until then, this placeholder is a placeholder. A black and white moody texture loop. */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-background-of-a-person-meditating-and-connecting-with-nature-50024-preview.mp4" type="video/mp4" />
          </video>
          
          {/* Noise texture overlay */}
          <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-noise.png")' }}></div>

          {/* 5. Minimal Global Navigation */}
          <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
             <a href="/" className="text-xl font-bold tracking-tighter">SP<span className="text-[#ff6a00]">.</span></a>
             <div className="flex items-center gap-6 text-sm text-gray-300 uppercase tracking-widest">
               <a href="#about" className="hover:text-white transition-colors">About</a>
               <a href="#projects" className="hover:text-white transition-colors">Work</a>
               <a href="#contact" className="hover:text-white transition-colors">Contact</a>
             </div>
          </nav>
          
          {/* Bottom Indicators */}
          <div className="fixed bottom-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
            {/* Social Icons (Generic placeholder brands like Dribbble, etc.) */}
            <div className="flex gap-5 text-gray-500">
               <a href="https://instagram.com/_sujal.0044" target="_blank" rel="noreferrer" className="hover:text-[#ff6a00] transition-all"><Instagram size={18} /></a>
               <a href="#" className="hover:text-[#ff6a00] transition-all"><Dribbble size={18} /></a>
               <a href="https://sujal0044.github.io" target="_blank" rel="noreferrer" className="hover:text-[#ff6a00] transition-all"><Github size={18} /></a>
            </div>
            
            {/* Sound Toggle */}
            <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-widest">
              <Volume2 size={16} />
              <span>Sound On</span>
            </div>
          </div>

          {/* 6. Cinematic Hero Section (Replicating MINH PHAM design) */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32">
            
            {/* User deletion requirement is met here */}
            
            <motion.p 
              variants={textVariants} initial="initial" animate="animate"
              transition={{ delay: 0.2 }}
              className="text-gray-300 tracking-widest uppercase text-xs md:text-sm font-semibold mb-6"
            >
              SUJAL PATEL
            </motion.p>
            
            <div className="relative z-10 space-y-4">
              {[ "MAKING", "GOOD", "SHIT", "SINCE", "2026"].map((text, index) => (
                <motion.div 
                  key={index}
                  variants={textVariants} initial="initial" animate="animate"
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="overflow-hidden h-[8vh] md:h-[12vh]"
                >
                  <h1 
                    className={`text-6xl md:text-9xl font-bold tracking-tighter leading-none ${index === 1 ? 'text-[#ff6a00] font-bold' : ''}`}
                  >
                    {text}
                  }
                  </h1>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 7. Redesigned About Me Section */}
          <section id="about" className="px-6 py-40 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <motion.div 
               initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
               className="w-full md:w-[40%] flex flex-col items-center"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden glass-card">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="About Sujal" className="w-full h-full object-cover filter grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
              className="w-full md:w-[60%]"
            >
              <h2 className="text-gray-500 uppercase tracking-widest text-sm mb-6">About Me</h2>
              <div className="space-y-6">
                {[
                  "I'm a modern creative developer with strong focus",
                  "on producing high quality & impactful digital experience.",
                  "Beyond code, I adapt calmly under pressure and am a ",
                  "disciplined reader of psychology and self-growth.",
                ].map((line, index) => (
                  <motion.p 
                     key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + 0.3 }}
                     className="text-xl md:text-3xl text-gray-300 leading-tight tracking-tight flex items-center gap-4"
                  >
                     {line}
                     {/* Red Circle Overlays from the reference video */}
                     {(index === 1 || index === 2 || index === 3) && <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-4 h-4 rounded-full bg-[#ff6a00]/80"></motion.span>}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 8. Clients/Experience list (Generic placeholder list of top brands for premium Fresherness) */}
          <section id="experience" className="px-6 py-32 max-w-7xl mx-auto flex flex-col items-center">
             <motion.h2 
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
               className="text-center text-4xl md:text-6xl font-bold tracking-tight mb-20"
             >
                Built digital for
             </motion.h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-x-16 md:gap-y-12">
               {[ "FORD", "UFC", "LINCOLN", "ROYAL CARIBBEAN", "SLEEPIQ", "NFL", "VERCEL", "NETLIFY"].map((brand, i) => (
                 <motion.div 
                   key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 + 0.2 }}
                   className="text-center font-display text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-3"
                 >
                     <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }} className="w-2 h-2 rounded-full bg-[#ff6a00]/50"></motion.span>
                     {brand}
                 </motion.div>
               ))}
             </div>
          </section>

          {/* 9. Contact Section with cinematic 'Send Button' layout */}
          <section id="contact" className="px-6 py-40 max-w-7xl mx-auto text-center flex flex-col items-center">
            <motion.h2 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-4xl md:text-7xl font-bold tracking-tighter mb-20"
            >
                Let's Build the Future.
            </motion.h2>
            
            <a href="mailto:sa.tech080044@gmail.com" className="group flex items-center justify-center gap-3 text-lg md:text-2xl text-white font-bold tracking-tight p-6 border border-white/10 rounded-full hover:border-[#ff6a00] transition-all duration-300 glass-card">
              sa.tech080044@gmail.com
              <motion.span animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} className="text-[#ff6a00]">→</motion.span>
            </a>
          </section>
          
          <footer className="text-center py-10 text-xs text-gray-700 uppercase tracking-widest">
            Sujal Patel — All rights reserved
          </footer>

        </div>
      )}
    </div>
  );
}
