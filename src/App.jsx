import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#ff6a00] selection:text-white pb-20">
      
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#ff6a00]/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#ff6a00] tracking-widest uppercase text-xs md:text-sm mb-6 font-semibold"
        >
          London based Creative
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold mb-6 tracking-tight"
        >
          Sujal <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Patel.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl font-light"
        >
          Software Developer • AI Enthusiast • Creative Technologist
        </motion.p>
      </section>

      {/* About Section */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center gap-3">
            <span className="text-[#ff6a00]">/</span> About Me
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            A modern creative developer and technology enthusiast currently pursuing a Master’s degree in Computer Science at the University of East London. Passionate about building immersive digital experiences, blending development, AI, motion, and modern UI design into meaningful products.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Beyond the code, I am a disciplined learner and avid reader of psychology and self-growth literature. This perspective ensures I remain calm under pressure, adapting swiftly to complex problem-solving requirements.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white flex items-center gap-3">
          <span className="text-[#ff6a00]">/</span> Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Frontend Development', 'Backend & Cloud', 'AI & Creative'].map((title, i) => (
            <motion.div 
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#ff6a00]">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {i === 0 ? "React.js, Next.js, Tailwind CSS, JavaScript, HTML/CSS" : 
                 i === 1 ? "Node.js, Python, Firebase, AWS Cloud Foundations" : 
                 "Machine Learning, Deep Learning, Motion Graphics, UI/UX"}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 max-w-5xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's Build the Future.</h2>
          <a href="mailto:sa.tech080044@gmail.com" className="px-8 py-4 bg-[#ff6a00] text-black font-bold rounded-full hover:bg-white transition-colors duration-300 mb-10">
            sa.tech080044@gmail.com
          </a>
          
          <div className="flex gap-6">
            <a href="https://instagram.com/_sujal.0044" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:text-[#ff6a00] hover:bg-white/10 transition-all">
              <Instagram size={24} />
            </a>
            <a href="https://sujal0044.github.io" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:text-[#ff6a00] hover:bg-white/10 transition-all">
              <Github size={24} />
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
