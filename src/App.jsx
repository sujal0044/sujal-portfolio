import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Volume2, VolumeX, Mail, Code, Terminal, Layers, ExternalLink } from 'lucide-react';

const abstractCoreImg = "https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2500&auto=format&fit=crop";
const mindsetBg = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop";

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
    const particleCount = window.innerWidth < 768 ? 20 : 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
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
        ctx.fillStyle = '#ff6a00';
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 106, 0, ${0.3 - dist / 150 * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
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
      // Precision dot (Instant)
      dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      // Trailing aura (Slightly delayed for tech feel)
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      
      const target = e.target;
      const isSelectable = target.closest('a') || target.closest('button') || target.closest('.tech-card');
      if (isSelectable) {
        dotRef.current.style.scale = '2.5';
        dotRef.current.style.backgroundColor = '#fff';
        cursorRef.current.style.opacity = '1';
        cursorRef.current.style.scale = '1.5';
      } else {
        dotRef.current.style.scale = '1';
        dotRef.current.style.backgroundColor = '#ff6a00';
        cursorRef.current.style.opacity = '0.5';
        cursorRef.current.style.scale = '1';
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setTimeout(() => setLoading(false), 2000);
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
      <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 border border-[#ff6a00] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out opacity-50" />
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-[#ff6a00] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_10px_#ff6a00]" />

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3" />

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]">
             <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-[#ff6a00] border-t-transparent rounded-full animate-spin"></div>
               <div className="text-[#ff6a00] font-mono tracking-widest animate-pulse uppercase text-xs">Initializing Cortex...</div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <NeuralNetwork />
          
          <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
            <div className="font-bold text-2xl tracking-tighter hover:text-[#ff6a00] transition-colors">SUJAL<span className="text-[#ff6a00]">.</span></div>
            <button onClick={toggleMusic} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white transition-all">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </nav>

          <section className="relative min-h-screen flex items-center justify-center px-6">
            <div className="relative z-10 text-center">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#ff6a00] font-mono text-xs tracking-[0.3em] mb-4 uppercase">System Architect // London, UK</motion.div>
               <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
                 BUILDING <br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a00] to-yellow-500">FUTURE.</span>
               </h1>
               <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                 I am Sujal Patel. A creative technologist building intelligent digital ecosystems. Welcome to my operational cortex.
               </p>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-6 space-y-32 pb-40 relative z-10">
            <section>
              <div className="bg-[#0a0a0a] border border-white/5 p-12 md:p-20 rounded-2xl tech-card transition-all hover:border-[#ff6a00]/30">
                  <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-[#ff6a00]">The Mindset</h2>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    My journey from India to the heart of London’s tech landscape was an evolution of extreme discipline. I operate at the intersection of rigorous logic and relentless creativity. When servers crash or complex models fail, I don't panic. <span className="text-white font-bold italic underline decoration-[#ff6a00]">I execute.</span>
                  </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {["Frontend Engine", "Backend Logic", "AI Integration"].map((title, i) => (
                   <div key={i} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-xl tech-card hover:border-[#ff6a00]/50 transition-all">
                     <h3 className="text-lg font-bold mb-2 uppercase tracking-tighter">{title}</h3>
                     <div className="w-8 h-1 bg-[#ff6a00] mb-6"></div>
                     <p className="text-gray-500 text-sm leading-relaxed">Designing high-performance architectures that scale with precision and reliability.</p>
                   </div>
                 ))}
            </section>
            
            <section className="text-center py-10">
               <div className="bg-[#ff6a00] p-16 md:p-24 rounded-3xl tech-card group hover:scale-[0.98] transition-transform duration-500">
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black mb-10">READY TO <br /> DEPLOY?</h2>
                 <a href="mailto:sa.tech080044@gmail.com" className="inline-block px-10 py-5 bg-black text-white font-bold rounded-full hover:scale-110 transition-transform uppercase text-xs tracking-widest">
                   Initiate Sequence
                 </a>
               </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
