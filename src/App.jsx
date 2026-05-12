import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Volume2, VolumeX, Mail, Code, Terminal } from 'lucide-react';

// --- 3D TILT WRAPPER ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- OPTION 4: CINEMATIC EMBERS ---
const Particles = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#ff6a00]"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: '110%',
              filter: 'blur(1px)',
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: ['0vh', '-120vh'],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        );
      })}
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  // --- MAGNETIC CURSOR PHYSICS ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
  }, []);

  const toggleMusic = () => {
    if (isMuted) {
      audioRef.current.play();
      audioRef.current.volume = 0.3;
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#ff6a00] selection:text-white relative">
      
      {/* MAGNETIC CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff6a00] rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#ff6a00]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 border border-[#ff6a00]/30 rounded-full pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{ x: ringX, y: ringY }}
      />

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=cinematic-time-lapse-115672.mp3" />

      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
          >
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute w-96 h-96 bg-[#ff6a00]/10 blur-[120px] rounded-full" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }} 
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
              transition={{ duration: 2 }}
              className="text-7xl font-black tracking-widest z-10"
            >
              SP<span className="text-[#ff6a00]">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Particles />

          {/* NAVIGATION */}
          <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="font-bold text-xl tracking-tighter pointer-events-auto cursor-none">
              SUJAL<span className="text-[#ff6a00]">.</span>
            </motion.div>
            <motion.button initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} onClick={toggleMusic} className="pointer-events-auto cursor-none p-3 glass-card rounded-full hover:bg-white/10 transition flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff6a00]">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isMuted ? 'Sound Off' : 'Sound On'}
            </motion.button>
          </nav>

          {/* HERO SECTION */}
          <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
               {/* Abstract Robo/AI Core Image - Slow Reveal */}
               <motion.img 
                 src="https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2500&auto=format&fit=crop" 
                 alt="AI Core" 
                 initial={{ opacity: 0, filter: "blur(40px)", scale: 1.2 }}
                 animate={{ opacity: 0.25, filter: "blur(4px)", scale: 1 }}
                 transition={{ duration: 5, ease: "easeOut" }}
                 className="w-full h-full object-cover mix-blend-screen"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]"></div>
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 8 }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#ff6a00]/20 rounded-full blur-[180px] pointer-events-none"
               />
            </div>

            <div className="relative z-10 text-center max-w-5xl">
               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-[#ff6a00] uppercase tracking-widest text-sm font-bold mb-6">
                 Creative Technologist • AI Enthusiast
               </motion.div>
               <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
                 BUILDING <br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a00] to-yellow-500 drop-shadow-[0_0_30px_rgba(255,106,0,0.3)]">FUTURE.</span>
               </motion.h1>
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                 Sujal Patel is a modern creative developer pursuing a Master’s degree in Computer Science in London. Blending algorithms, AI, motion, and modern UI design into digital experiences.
               </motion.p>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 space-y-40 pb-40 relative z-10">
            
            {/* UPGRADED MINDSET SECTION */}
            <section id="about" className="pt-20">
              <TiltCard>
                <div className="glass-card p-12 md:p-24 rounded-3xl relative overflow-hidden group border border-white/5 hover:border-[#ff6a00]/30 transition-all duration-700">
                  
                  {/* Slow Reveal Abstract Mindset Background */}
                  <motion.div className="absolute inset-0 z-0 opacity-10 mix-blend-screen grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000">
                    <motion.img 
                      src="https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=2000&auto=format&fit=crop"
                      initial={{ filter: "blur(20px)", scale: 1.1 }}
                      whileInView={{ filter: "blur(0px)", scale: 1 }}
                      transition={{ duration: 4 }}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />

                  <div className="relative z-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight">The <span className="text-[#ff6a00]">Mindset.</span></h2>
                    <div className="grid md:grid-cols-2 gap-12 text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                      <p>
                        The architecture of code means nothing without the architecture of the mind. My journey from India to the heart of London's tech landscape wasn't just geographical; it was an evolution of extreme discipline. I operate at the absolute intersection of rigorous logic and relentless creativity.
                      </p>
                      <p>
                        I study human psychology and stoicism as intensely as I study machine learning algorithms. Why? Because the ability to remain exceptionally calm under immense pressure is the ultimate developer superpower. When servers crash or complex models fail, I don't panic. <strong className="text-white font-bold">I execute.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </section>

            {/* SKILLS SECTION */}
            <section>
               <h2 className="text-3xl font-bold mb-12 flex items-center gap-4"><Code className="text-[#ff6a00]" /> Technical Arsenal</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { title: "Frontend & UI", skills: "React.js • Next.js • Tailwind CSS • Framer Motion • Three.js" },
                   { title: "Backend & Cloud", skills: "Node.js • Python • Firebase • AWS Architecture" },
                   { title: "AI & Creative", skills: "Machine Learning • Deep Learning • Motion Graphics • Branding" }
                 ].map((box, i) => (
                   <TiltCard key={i} className="h-full">
                     <div className="glass-card p-10 rounded-2xl h-full border-t border-white/5 hover:border-[#ff6a00]/50 transition-colors cursor-none relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[#ff6a00]/0 group-hover:bg-[#ff6a00]/5 transition-colors duration-500" />
                       <h3 className="text-xl font-bold mb-4 text-white relative z-10">{box.title}</h3>
                       <p className="text-[#ff6a00] font-mono text-sm leading-loose relative z-10">{box.skills}</p>
                     </div>
                   </TiltCard>
                 ))}
               </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section>
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-4"><Terminal className="text-[#ff6a00]" /> Operational Experience</h2>
              <div className="space-y-6">
                {[
                  { role: "Frontend Developer Intern", company: "TechNova Solutions", year: "2024", desc: "Engineered responsive React architectures and optimized UI rendering performance metrics." },
                  { role: "Freelance Creative Developer", company: "Independent", year: "2023", desc: "Developed cinematic portfolio platforms and integrated AI productivity assistants." }
                ].map((exp, i) => (
                  <motion.div key={i} whileHover={{ x: 20 }} className="glass-card p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center group cursor-none border border-white/5 hover:border-[#ff6a00]/30">
                     <div>
                       <h3 className="text-2xl font-bold group-hover:text-[#ff6a00] transition-colors">{exp.role}</h3>
                       <p className="text-gray-500 mt-2"><span className="text-white">{exp.company}</span> • {exp.desc}</p>
                     </div>
                     <div className="text-[#ff6a00] font-mono mt-4 md:mt-0 opacity-50 group-hover:opacity-100 transition-opacity">{exp.year}</div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* STATS SECTION */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
               {[
                 { num: "3+", label: "AI/ML Certifications" },
                 { num: "50+", label: "Projects Deployed" },
                 { num: "2026", label: "Master's Graduation" },
                 { num: "100%", label: "Calm Under Pressure" }
               ].map((stat, i) => (
                 <TiltCard key={i}>
                   <div className="glass-card p-8 rounded-2xl cursor-none hover:bg-white/5 transition-colors">
                     <div className="text-4xl md:text-5xl font-black text-[#ff6a00] mb-2">{stat.num}</div>
                     <div className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
                   </div>
                 </TiltCard>
               ))}
            </section>

            {/* CONTACT SECTION */}
            <section className="text-center pt-20">
               <TiltCard>
                 <div className="glass-card p-16 md:p-24 rounded-[3rem] relative overflow-hidden cursor-none border border-white/5 hover:border-[#ff6a00]/30 transition-all duration-700">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#ff6a00]/10 to-transparent opacity-50" />
                   
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 bg-[#ff6a00]/20 blur-[100px] rounded-full pointer-events-none" />

                   <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10">INITIATE <br/>SEQUENCE.</h2>
                   <p className="text-gray-400 mb-10 relative z-10 max-w-md mx-auto">Ready to build something that pushes the boundaries of the web? Let's talk.</p>
                   
                   <a href="mailto:sa.tech080044@gmail.com" className="cursor-none relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-[#ff6a00] hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)]">
                     <Mail size={20} /> sa.tech080044@gmail.com
                   </a>
                 </div>
               </TiltCard>
               
               <div className="flex justify-center gap-8 mt-16 text-gray-500 relative z-10">
                 <a href="https://instagram.com/_sujal.0044" className="hover:text-[#ff6a00] transition-colors cursor-none hover:-translate-y-1 duration-300"><Instagram size={24} /></a>
                 <a href="https://sujal0044.github.io" className="hover:text-[#ff6a00] transition-colors cursor-none hover:-translate-y-1 duration-300"><Github size={24} /></a>
               </div>
               <div className="mt-10 text-xs text-gray-700 uppercase tracking-widest relative z-10">
                 Sujal Patel — Building the Future Through Creativity & Code
               </div>
            </section>

          </div>
        </>
      )}
    </div>
  );
}
