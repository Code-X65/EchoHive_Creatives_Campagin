import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Zap,
  Image as ImageIcon,
  Gift,
  ArrowRight,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from '../assets/Images/fullLogo.png'

gsap.registerPlugin(ScrollTrigger);

// --- BeeOverlay (unchanged) ---
const BeeOverlay = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const mouseRef = useRef({ x: null, y: null });
  const beeRef = useRef({
    x: 0,
    y: 0,
    angle: 0,
    speed: 4,
    turnSpeed: 0.05,
    wingAngle: 0,
    wingSpeed: 0.5,
    wanderTarget: { x: 0, y: 0 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    beeRef.current.x = window.innerWidth / 2;
    beeRef.current.y = window.innerHeight / 2;
    beeRef.current.wanderTarget = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e) => (mouseRef.current = { x: e.clientX, y: e.clientY });
    const handleMouseLeave = () => (mouseRef.current = { x: null, y: null });

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    handleResize();

    const drawBee = (x, y, angle, wingAngle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const scale = 0.5;

      const wingOffset = Math.sin(wingAngle) * 15;

      ctx.fillStyle = "rgba(220, 240, 255, 0.7)";
      ctx.strokeStyle = "#a5b4fc";
      ctx.lineWidth = 1;

      ctx.save();
      ctx.translate(5, -10);
      ctx.rotate(Math.PI / 4 + wingOffset * 0.05);
      ctx.beginPath();
      ctx.ellipse(20, -20, 25, 12, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(5, 10);
      ctx.rotate(-(Math.PI / 4 + wingOffset * 0.05));
      ctx.beginPath();
      ctx.ellipse(20, 20, 25, 12, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(-40, 0);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.ellipse(0, 0, 30, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-10, -16);
      ctx.quadraticCurveTo(-5, 0, -10, 16);
      ctx.moveTo(5, -17);
      ctx.quadraticCurveTo(10, 0, 5, 17);
      ctx.moveTo(-20, -12);
      ctx.quadraticCurveTo(-15, 0, -20, 12);
      ctx.stroke();

      ctx.save();
      ctx.translate(15, -15);
      ctx.rotate(-0.2);
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(20, -20);
      ctx.lineTo(15, 5);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(20, -20, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(18, -6, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(20, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(20, 2, 5, 0.2, Math.PI / 2);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bee = beeRef.current;
      let targetX, targetY;

      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        targetX = mouseRef.current.x;
        targetY = mouseRef.current.y;
      } else {
        const distToTarget = Math.hypot(bee.wanderTarget.x - bee.x, bee.wanderTarget.y - bee.y);
        if (distToTarget < 50) {
          bee.wanderTarget = {
            x: 50 + Math.random() * (canvas.width - 100),
            y: 50 + Math.random() * (canvas.height - 100),
          };
        }
        targetX = bee.wanderTarget.x;
        targetY = bee.wanderTarget.y;
      }

      const dx = targetX - bee.x;
      const dy = targetY - bee.y;
      const targetAngle = Math.atan2(dy, dx);

      let diff = targetAngle - bee.angle;
      while (diff <= -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      bee.angle += diff * bee.turnSpeed;
      bee.x += Math.cos(bee.angle) * bee.speed;
      bee.y += Math.sin(bee.angle) * bee.speed;
      bee.y += Math.sin(Date.now() / 200) * 1;
      bee.wingAngle += bee.wingSpeed;

      drawBee(bee.x, bee.y, bee.angle, bee.wingAngle);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
};

// --- Three.js Background (unchanged) ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 15;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

   particlesGeometry.addAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 3;

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positions = particlesGeometry.attributes.position.array;

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(positions[i * 3]) > 7.5) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 7.5) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 7.5) velocities[i * 3 + 2] *= -1;
      }

     particlesGeometry.getAttribute("position").needsUpdate = true;

      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

// --- Nav with GSAP show/hide on scroll up/down ---
const Nav = () => {
  const headerRef = useRef(null);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // initial animate in
    gsap.fromTo(header, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > lastScroll.current && currentY > 80) {
          // scrolling down -> hide
          gsap.to(header, { y: -120, duration: 0.3, ease: "power2.out" });
        } else {
          // scrolling up -> show
          gsap.to(header, { y: 0, duration: 0.45, ease: "power3.out" });
        }
        lastScroll.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-[#0b0f15]/60"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
    <img src={Logo} alt="EchoHive Logo" className="w-20" />
       
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#benefits" className="hover:text-white transition-colors">Services</a>
          <a href="#pricing" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
            <Gift size={14} className="text-yellow-400" /> Christmas Deal
          </a>
        </div>
        <a href="https://wa.me/2340000000000" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-colors">
          Let's Talk
        </a>
      </div>
    </header>
  );
};

// --- Hero (centered, CTA replaced, removed View Portfolio) ---
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Reveal animation using GSAP + ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen pt-32 pb-20 flex items-center justify-center px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} reveal text-center`}>
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-6 mx-auto">
            <Gift size={12} /> Detty December Special
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-500 leading-[1.05] mb-6">
            We don't just <br />
            <span className="">manage brands.</span> <br />
            We ignite them.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop wasting money on manual tasks. Let visual storytelling and automation scale your business this holiday season.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/2340000000000"
              className="group relative px-8 py-4 bg-green-600 text-white font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 inline-flex items-center gap-3"
              aria-label="Reserve your slot now on WhatsApp"
            >
              {/* WhatsApp Inline SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
                <path d="M20.52 3.48A11.81 11.81 0 0 0 3.48 20.52L2 22l1.48-.48A12 12 0 1 0 20.52 3.48zM12 20a8 8 0 0 1-4.43-1.3l-.31-.2L6 18l.61-.99-.2-.31A8 8 0 1 1 12 20zm3.08-6.69c-.18-.09-1.06-.52-1.22-.58-.16-.06-.28-.09-.39.09-.1.18-.4.58-.49.7-.09.12-.18.14-.36.05-.18-.09-.73-.27-1.39-.86-.51-.48-.85-1.07-.95-1.25-.1-.18-.01-.28.07-.37.07-.07.16-.18.24-.27.08-.09.11-.18.18-.3.06-.12.03-.22-.02-.31-.05-.09-.39-.94-.54-1.29-.14-.33-.29-.27-.39-.27-.1 0-.22-.01-.34-.01s-.31.05-.47.22c-.16.16-.62.6-.62 1.46s.64 1.7.73 1.82c.09.12 1.26 1.92 3.05 2.7 1.67.74 1.67.49 1.98.46.3-.03.97-.39 1.11-.76.14-.37.14-.68.1-.76-.05-.08-.18-.11-.36-.2z" />
              </svg>
              <span className="relative">Reserve your slot now</span>
            </a>
          </div>
        </div>

        {/* Hero Image Grid (kept but placed center-right on large screens) */}
        <div className="relative h-[520px] hidden lg:block">
          <div className="absolute top-0 right-0 w-64 h-80 rounded-2xl overflow-hidden border-4 border-slate-800/50 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
            <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600" alt="Camera" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-24 right-48 w-60 h-72 rounded-2xl overflow-hidden border-4 border-slate-800/50 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20">
            <img src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&q=80&w=600" alt="Studio" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-12 right-12 w-72 h-48 rounded-2xl overflow-hidden border-4 border-slate-800/50 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 z-30">
            <img src="https://images.unsplash.com/photo-1493421419110-74f4e21bec70?auto=format&fit=crop&q=80&w=600" alt="Creative" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-10 right-80 z-40 bg-white text-black p-4 rounded-xl transform -rotate-12 animate-bounce duration-[2000ms]">
            <p className="font-bold text-xs">Holiday Offer</p>
            <p className="text-red-600 font-black text-xl">-40% OFF</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- VisualMasonry (unchanged except reveal classes) ---
const VisualMasonry = () => {
  const images = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=900&fit=crop",
  ];

  return (
    <section id="work" className="py-4 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Visual Storytelling</h2>
          <p className="text-slate-400">Captured moments that define brands.</p>
        </div>
        <a target="_blank" href="https://echohivecreatives.com/work" className="text-blue-400 hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">View Full Gallery <ArrowRight size={16} /></a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px]">
        {images.map((img, i) => (
          <div key={i} className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
            <img src={img} alt="Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">Branding</span>
              <h3 className="text-white text-xl font-bold">Project {i + 1}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Benefits (unchanged except reveal) ---
const Benefits = () => {
  const items = [
    { icon: <Zap className="text-yellow-400 w-20 h-20" />, title: "Save Time", text: "Reclaim 40% of your week with automated workflows." },
    { icon: <Camera className="text-blue-400  w-20 h-20" />, title: "Visual Impact", text: "High-end photography that elevates your brand perception." },
    { icon: <ImageIcon className="text-green-400 w-20 h-20 " />, title: "Content Strategy", text: "A cohesive plan that keeps your audience engaged." },
  ];

  return (
    <section id="benefits" className="py-4 px-6 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-10 reveal">Why EchoHive?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {items.map((it, i) => (
            <div key={i} className="p-8 rounded-2xl transition-all hover:-translate-y-2 reveal items-center">
              <div className="rounded-lg mx-auto flex items-center justify-center mb-2 ">
                {it.icon}
              </div>
              <div className="text-xl font-bold text-white mb-3">{it.title}</div>
              <div className="text-slate-400 leading-relaxed">{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ChristmasPricing (changes: gradient blue->yellow, show range, sticker, remove CTA) ---
const ChristmasPricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Blue -> Yellow border gradient (main) */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-r from-blue-500 to-yellow-400">
          <div className="bg-[#0b0f15] rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
            {/* subtle snow / texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-8 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-block px-4 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider mb-4">
                Detty December Offer
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Automate Your Business</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Get your business ready for the new year. Full automation audit and implementation starting at:
              </p>

              {/* Pricing range 250k - 450k */}
              <div className="flex justify-center items-baseline gap-2 mb-4">
                <span className="text-4xl md:text-6xl font-bold text-white">₦250k</span>
                <span className="text-2xl md:text-3xl font-semibold text-white">—</span>
                <span className="text-3xl md:text-4xl font-bold text-white">₦450k</span>
              </div>

              {/* Sticker */}
              <div className="mx-auto inline-block">
                <div className="inline-flex items-center justify-center px-3 py-2 rounded-full bg-yellow-400 text-black font-bold text-sm tracking-wide shadow-lg">
                  Offer valid until Dec 31st. Only 50 slots.
                </div>
              </div>

              {/* CTA removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer (unchanged) ---
const Footer = () => (
  <footer className="py-12 px-6 border-t border-slate-800 bg-[#080b10]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <div className="font-bold text-xl text-white mb-1">EchoHive Creatives</div>
        <div className="text-sm text-slate-500">Visuals. Automation. Growth.</div>
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Phone size={20} /></a>
      </div>
      <div className="text-sm text-slate-600">© {new Date().getFullYear()} EchoHive.</div>
    </div>
  </footer>
);

// --- App with floating WhatsApp button and ScrollTrigger reveal setup ---
export default function App() {
// Replace ScrollTrigger with Intersection Observer
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-[#0b0f15] text-white font-sans selection:bg-blue-500 selection:text-white">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <VisualMasonry />
        <Benefits />
        <ChristmasPricing />
      </main>
      <Footer />

      {/* Floating WhatsApp button bottom-right */}
      <a
        href="https://wa.me/2340000000000"
        target="_blank"
        rel="noreferrer"
        className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transform hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
        style={{ background: "#25D366", color: "white" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.81 11.81 0 0 0 3.48 20.52L2 22l1.48-.48A12 12 0 1 0 20.52 3.48zM12 20a8 8 0 0 1-4.43-1.3l-.31-.2L6 18l.61-.99-.2-.31A8 8 0 1 1 12 20zm3.08-6.69c-.18-.09-1.06-.52-1.22-.58-.16-.06-.28-.09-.39.09-.1.18-.4.58-.49.7-.09.12-.18.14-.36.05-.18-.09-.73-.27-1.39-.86-.51-.48-.85-1.07-.95-1.25-.1-.18-.01-.28.07-.37.07-.07.16-.18.24-.27.08-.09.11-.18.18-.3.06-.12.03-.22-.02-.31-.05-.09-.39-.94-.54-1.29-.14-.33-.29-.27-.39-.27-.1 0-.22-.01-.34-.01s-.31.05-.47.22c-.16.16-.62.6-.62 1.46s.64 1.7.73 1.82c.09.12 1.26 1.92 3.05 2.7 1.67.74 1.67.49 1.98.46.3-.03.97-.39 1.11-.76.14-.37.14-.68.1-.76-.05-.08-.18-.11-.36-.2z" />
        </svg>
      </a>

      {/* Backgrounds */}
      <BeeOverlay />
      <ThreeBackground />
    </div>
  );
}
