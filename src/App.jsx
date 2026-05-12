import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Volume2, VolumeX, Mail, Code, Terminal, Layers, ExternalLink } from 'lucide-react';

const abstractCoreImg = "https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2500&auto=format&fit=crop";
const mindsetBg = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop";

// --- BRIGHT OPTION 1 NEURAL NETWORK ---
const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 20 : 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 106, 0, 0.7)';
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 106, 0, ${0.2 - dist / 150 * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-100" />;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const cursorRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cursorRef.current) return;
      // 144Hz Direct GPU translation
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      
      const target = e.target;
      const isHovering = target.closest('h1') || target.closest('p') || target.closest('h2') || target.closest('a') || target.closest('button');
      
      if (isHovering) {
        cursorRef.current.style.width = '120px';
        cursorRef.current.style.height = '120px';
        cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        cursorRef.current.style.border = '1px solid rgba(255, 106, 0, 0.5)';
      } else {
        cursorRef.current.style.width = '10px';
        cursorRef.current.style.height = '10px';
        cursorRef.current.style.backgroundColor = 'white';
        cursorRef.current.style.border = 'none';
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setTimeout(() => setLoading(false), 2500);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMusic = () => {
    if (isMuted) { audioRef.current.play(); audioRef.current.volume = 0.2; } 
    else { audioRef.current.pause(); }
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#ff6a00] cursor-none relative">
      
      {/* CRYSTAL CLEAR 144Hz LENS */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 ease-out"
        style={{ boxShadow: '0 0 20px rgba(255, 106, 0, 0.2)' }}
      />

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3" />

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]">
             <div className="text-[#ff6a00] text-4xl font-black animate-pulse">SP.</div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <NeuralNetwork />
          
          <nav className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-50">
            <div className="font-bold text-xl tracking-tighter">SUJAL<span className="text-[#ff6a00]">.</span></div>
            <button onClick={toggleMusic} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-[#ff6a00]">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </nav>

          <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
            <div className="relative z-10 text-center max-w-5xl">
               <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none hover:scale-[1.02] transition-transform duration-500">
                 BUILDING <br /> THE <span className="text-[#ff6a00]">FUTURE.</span>
               </h1>
               <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                 I am Sujal Patel. A creative technologist and AI architect based in London. I don't just write code—I engineer intelligent digital ecosystems.
               </p>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 space-y-32 pb-40 relative z-10">
            <section className="relative">
              <div className="bg-white/5 border border-white/10 p-12 md:p-24 rounded-3xl relative overflow-hidden shadow-2xl hover:border-[#ff6a00]/30 transition-colors duration-500">
                  <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight">The <span className="text-[#ff6a00]">Mindset.</span></h2>
                  <div className="grid md:grid-cols-2 gap-12 text-gray-300 text-lg leading-relaxed font-light">
                    <p>The architecture of code means nothing without the architecture of the mind. My journey from India to London was an evolution of extreme discipline. I operate at the intersection of rigorous logic and relentless creativity.</p>
                    <p>I study human psychology as intensely as I study machine learning. The ability to remain calm under pressure is the ultimate developer superpower. <strong className="text-white">I execute.</strong></p>
                  </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {["Frontend & UI", "Backend & Cloud", "AI & Creative"].map((title, i) => (
                   <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-2xl hover:border-[#ff6a00]/50 transition-all duration-500">
                     <h3 className="text-xl font-bold mb-4">{title}</h3>
                     <div className="w-10 h-1 bg-[#ff6a00] mb-4"></div>
                     <p className="text-gray-400 text-sm">Professional expertise in engineering scalable, high-performance systems.</p>
                   </div>
                 ))}
            </section>
            
            <section className="text-center py-20">
               <div className="bg-white/5 border border-white/10 p-20 rounded-[4rem] hover:border-[#ff6a00]/40 transition-all duration-700">
                 <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">INITIATE <span className="text-[#ff6a00]">SEQUENCE.</span></h2>
                 <a href="mailto:sa.tech080044@gmail.com" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold rounded-full hover:bg-[#ff6a00] hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
                   Contact Me
                 </a>
               </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
