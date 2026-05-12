import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Volume2, VolumeX, Mail, Code, Terminal, Layers, ExternalLink } from 'lucide-react';

const abstractCoreImg = "https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2500&auto=format&fit=crop";
const mindsetBg = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop";
const worksBg = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop";

// --- 1. SP CHIP PRELOADER ENGINE ---
const ChipPreloader = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({ pathLength: 1, opacity: 1, transition: { pathLength: { delay: i * 0.2, duration: 1 }, opacity: { delay: i * 0.2, duration: 0.2 } }})
  };
  return (
    <div className="relative flex items-center justify-center w-64 h-64 z-10">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[ "M 5 30 L 20 30", "M 5 50 L 20 50", "M 5 70 L 20 70", "M 95 30 L 80 30", "M 95 50 L 80 50", "M 95 70 L 80 70", "M 30 5 L 30 20", "M 50 5 L 50 20", "M 70 5 L 70 20", "M 30 95 L 30 80", "M 50 95 L 50 80", "M 70 95 L 70 80" ].map((d, i) => (
          <motion.path key={i} d={d} stroke="#ff6a00" strokeWidth="2" fill="none" strokeLinecap="round" variants={draw} custom={1} initial="hidden" animate="visible" />
        ))}
        <motion.rect x="20" y="20" width="60" height="60" rx="4" stroke="#ff6a00" strokeWidth="2.5" fill="none" variants={draw} custom={2} initial="hidden" animate="visible" />
        <motion.rect x="32" y="32" width="36" height="36" rx="3" fill="#ff6a00" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} />
        <motion.text x="50" y="55" textAnchor="middle" fill="#050505" fontSize="18" fontWeight="900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.5 }}>SP</motion.text>
      </svg>
    </div>
  );
};

// --- 2. OPTION 1: NEURAL NETWORK ---
const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth, height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    let particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, radius: 2 });
    }
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1; if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = '#ff6a00'; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 106, 0, ${0.2 - dist / 150 * 0.2})`; ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cursorRef.current || !dotRef.current) return;
      const { clientX, clientY } = e;
      dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      
      const isHover = e.target.closest('a, button, .tech-card');
      cursorRef.current.style.width = isHover ? '60px' : '30px';
      cursorRef.current.style.height = isHover ? '60px' : '30px';
      cursorRef.current.style.borderColor = isHover ? '#fff' : '#ff6a00';
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setTimeout(() => setLoading(false), 3500);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMusic = () => {
    if (isMuted) { audioRef.current.play(); audioRef.current.volume = 0.2; } 
    else { audioRef.current.pause(); }
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#ff6a00] cursor-none relative">
      
      {/* PRECISION TECH CURSOR */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-[30px] h-[30px] border border-[#ff6a00] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300 ease-out flex items-center justify-center">
         <div className="w-[1px] h-4 bg-white/20 absolute" />
         <div className="h-[1px] w-4 bg-white/20 absolute" />
      </div>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#ff6a00] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#ff6a00]" />

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3" />

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]">
            <ChipPreloader />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <NeuralNetwork />
          
          <nav className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-50">
            <div className="font-bold text-2xl">SUJAL<span className="text-[#ff6a00]">.</span></div>
            <button onClick={toggleMusic} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white transition-all">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </nav>

          <section className="relative min-h-screen flex items-center justify-center px-6">
            <div className="absolute inset-0 z-0">
               <motion.img src={abstractCoreImg} initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 0.15, filter: "blur(0px)" }} transition={{ duration: 2 }} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>
            <div className="relative z-10 text-center">
               <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">BUILDING <br /> THE <span className="text-[#ff6a00]">FUTURE.</span></h1>
               <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">I am Sujal Patel. A creative technologist building intelligent ecosystems.</p>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 space-y-40 pb-40 relative z-10">
            {/* MINDSET WITH BLURRY IMAGE REVEAL */}
            <section className="relative group">
              <motion.img src={mindsetBg} initial={{ opacity: 0, filter: "blur(30px)" }} whileInView={{ opacity: 0.1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="absolute inset-0 w-full h-full object-cover -z-10 rounded-3xl" />
              <div className="bg-white/5 border border-white/10 p-16 md:p-24 rounded-3xl tech-card backdrop-blur-xl">
                  <h2 className="text-5xl font-black mb-10 text-[#ff6a00]">The Mindset</h2>
                  <p className="text-gray-300 text-xl leading-relaxed font-light">My journey to London’s tech landscape was an evolution of discipline. I operate at the intersection of rigorous logic and relentless creativity. I don't panic. <span className="text-white font-bold italic">I execute.</span></p>
              </div>
            </section>

            {/* SELECTED WORKS WITH BLURRY IMAGE REVEAL */}
            <section className="relative group">
              <motion.img src={worksBg} initial={{ opacity: 0, filter: "blur(30px)" }} whileInView={{ opacity: 0.1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="absolute inset-0 w-full h-full object-cover -z-10 rounded-3xl" />
              <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest text-[#ff6a00]">Selected Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[ { n: "AI Analyzer", t: "Python • ML" }, { n: "Cloud Dash", t: "Next.js • AWS" } ].map((p, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl tech-card backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-4">{p.n}</h3>
                    <div className="text-xs font-mono text-[#ff6a00] uppercase tracking-widest">{p.t}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center py-20">
               <div className="bg-[#ff6a00] p-24 rounded-[4rem] tech-card shadow-[0_0_50px_rgba(255,106,0,0.3)]">
                 <h2 className="text-6xl md:text-8xl font-black text-black mb-10 tracking-tighter">INITIATE <br /> SEQUENCE.</h2>
                 <a href="mailto:sa.tech080044@gmail.com" className="inline-block px-12 py-6 bg-black text-white font-bold rounded-full hover:scale-110 transition-transform uppercase text-xs tracking-[0.2em]">Deploy Now</a>
               </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
}
