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
  Film,
  Plane,
  Sparkles,
  CheckCircle2,
   ArrowLeft, Check
} from "lucide-react";
import { Video,  Aperture, Palette, MonitorPlay, X } from 'lucide-react';
import zenith from '../assets/Images/zenith.png';
import desperado from '../assets/Images/desperado.png';
import amstel from '../assets/Images/amstel.png';
import benfash from '../assets/Images/benfash.png';
import amala from '../assets/Images/amala.png';
import easyjet from '../assets/Images/easyjet.png';
import * as THREE from "three";

import Logo from '../assets/Images/fullLogo.png';

// --- BeeOverlay ---
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

// --- Three.js Background ---
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

// --- Nav ---
const Nav = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xs bg-[#0b0f15]/80" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
           <img src={Logo} alt="EchoHive Logo" className="w-30"/>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="https://echohivecreatives.com/work" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#contact" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
            <Gift size={14} className="text-yellow-400" /> Free Audit
          </a>
        </div>
        <button 
    onClick={onContactClick}
    className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
  >
    Contact us
  </button>
      </div>
    </header>
  );
};

// --- Hero ---
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-4 flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} text-center lg:text-left`}>
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Gift size={12} /> FREE 30-Min Audit + 20% OFF - Your First Creative Project
          </div>
       <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] mb-4">
  Turn Your Brand, Event & Campaign Into <br />
  <span className="text-blue-500">High-Impact Visual Content That Converts</span>
</h1>
         <p className="text-base text-slate-300 max-w-2xl mb-4 leading-relaxed font-medium">
  Brand Films, Event Coverage & Drone Production Designed to Boost Engagement and Sales
</p>
          <p className="text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
            Work with the team behind Nigeria's fastest-rising creative brands. <span className="hidden">World-class visuals that boost engagement, attract customers, and elevate your brand story.</span> 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              <span className="relative">Book My Free Audit</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://echohivecreatives.com/"
              className="px-8 py-4 border-2 border-slate-700 text-white font-semibold rounded-lg hover:border-blue-500 transition-all inline-flex items-center justify-center gap-3"
            >
              See Work Portfolio
            </a>
          </div>

          <p className="text-sm text-yellow-400 mt-6 font-semibold">
            ⚡ Limited to the first 10 new clients this month
          </p>
        </div>

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
        </div>
      </div>
    </section>
  );
};

// --- Why Choose Us ---
const WhyChooseUs = () => {
  const items = [
    { img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop", title: "High-Quality Production", text: "Cinematic storytelling, sharp visuals, premium event coverage" },
    { img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop", title: "Professional Drone Services", text: "Licensed operators with cutting-edge drone gear" },
    { img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop", title: "Photography & Videography", text: "Corporate, lifestyle, product, documentary" },
    { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", title: "Creative Direction & Branding", text: "From concept → execution → delivery" },
    { img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop", title: "Fast & Reliable", text: "Industry-standard workflow with fast turnarounds" },
  ];

  return (
    <section className="py-4 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading Area */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Brands Choose Us</h2>
          <p className="text-slate-400">Delacruz Innovations & EchoHive Creatives deliver world-class visuals that boost engagement, attract customers, and elevate your brand story.</p>
        </div>

        {/* MOBILE — Horizontal scroll */}
        <div className="flex md:hidden gap-6 overflow-x-scroll snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {items.map((it, i) => (
            <div
              key={i}
              className="min-w-[260px] h-[320px] relative snap-center rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={it.img}
                alt={it.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Title (always visible) */}
                <h3 className="text-xl font-bold text-white mb-2 z-10">
                  {it.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm z-10 leading-relaxed">
                  {it.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP — Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <div
              key={i}
              className="h-[340px] relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={it.img}
                alt={it.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {it.title}
                </h3>

                {/* Description (hover reveal) */}
                <p className="text-slate-300 z-10 leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {it.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// --- Showreel Section ---
const Showreel = () => {
  return (
    <section className="py-4 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">See Our Work In Action</h2> */}
        {/* <p className="text-slate-400 mb-12">See how we turn ordinary moments into unforgettable content</p> */}
        <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            <div className="text-center">
              <Film className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-semibold">Showreel Video</p>
              <p className="text-sm">Autoplay muted video of highlights, drone shots, BTS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services Overview ---

const ServicesOverview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    {
      title: "Brand Films & Commercials",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      icon: <Video className="w-10 h-10" />
    },
    {
      title: "Event Coverage",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      icon: <Camera className="w-10 h-10" />
    },
    {
      title: "Drone Filming",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
      icon: <Aperture className="w-10 h-10" />
    },
    {
      title: "Product Photography",
      image: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800&h=600&fit=crop",
      icon: <Camera className="w-10 h-10" />
    },
    {
      title: "Creative Direction",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop",
      icon: <Palette className="w-10 h-10" />
    },
    {
      title: "Gear Rentals",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
      icon: <MonitorPlay className="w-10 h-10" />
    },
    {
      title: "Social Media Content",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      icon: <Instagram className="w-10 h-10" />
    },
  ];

  const handleShuffle = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  return (
    <section id="services" className="py-4 px-6 ">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
         
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">What We Do</h2>
          {/* <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            From concept to delivery, we craft visual experiences that captivate and convert
          </p> */}
        </div>
        
        {/* Mobile Shuffle View */}
        {isMobile ? (
          <div className="relative flex items-center justify-center overflow-hidden">
            {/* Card Stack Container */}
            <div className="relative w-full max-w-[320px] h-[450px]">
              {services.map((service, i) => {
                // Calculate position relative to current index
                const position = (i - currentIndex + services.length) % services.length;
                
                // Logic for the stack visual
                const isActive = position === 0;
                const isNext = position === 1;
                const isLast = position === services.length - 1;
                
                // Positioning Logic
                // We show roughly 3 cards: Active, Next, and "Previous" (Last) fading out
                let rotateVal = 0;
                let translateXVal = 0;
                let translateYVal = 0;
                let scaleVal = 1;
                let opacityVal = 1;
                let zIndexVal = services.length - position;

                if (isActive) {
                  rotateVal = 0;
                  translateYVal = 0;
                  scaleVal = 1;
                  opacityVal = 1;
                  zIndexVal = 50;
                } else if (isNext) {
                  rotateVal = 4; // Slight tilt right
                  translateXVal = 20; // Slight offset right
                  scaleVal = 0.95;
                  opacityVal = 0.8;
                  zIndexVal = 40;
                } else if (position === 2) {
                   // Third card peeking
                  rotateVal = 8;
                  translateXVal = 40;
                  scaleVal = 0.9;
                  opacityVal = 0.5;
                  zIndexVal = 30;
                } else if (isLast) {
                  // The card that just left (animation effect)
                  rotateVal = -15;
                  translateXVal = -100;
                  translateYVal = 20;
                  opacityVal = 0;
                  zIndexVal = 0;
                } else {
                  // All other cards hidden behind
                  scaleVal = 0.8;
                  opacityVal = 0;
                  zIndexVal = 0;
                }

                return (
                  <div
                    key={i}
                    onClick={handleShuffle}
                    className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      // We handle all transforms here to avoid Tailwind conflicts
                      transform: `
                        translateX(${translateXVal}px) 
                        translateY(${translateYVal}px) 
                        rotate(${rotateVal}deg) 
                        scale(${scaleVal})
                      `,
                      zIndex: zIndexVal,
                      opacity: opacityVal,
                      transformOrigin: 'bottom center', // Makes the fan effect look more natural
                    }}
                  >
                    <div className="relative h-full rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl hover:shadow-blue-500/20 transition-shadow">
                      {/* Image Background */}
                      <div className="absolute inset-0">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-end p-8 pb-10">
                        {/* <div className="text-white mb-4 p-3 bg-blue-600/20 backdrop-blur-md rounded-2xl w-fit border border-blue-500/30">
                            {service.icon}
                        </div> */}
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                            {service.title}
                        </h3>
                        <div className="flex items-center gap-2 text-green-400 font-medium">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-xl">Available Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Indicators - Fixed Centering */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
              {services.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-700 w-2'
                  }`}
                />
              ))}
            </div>
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500 text-xs uppercase tracking-widest font-semibold pointer-events-none">
              Tap card to view next
            </div>
          </div>
        ) : (
          /* Desktop Grid View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-blue-500/50 transition-all duration-300 h-72">
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div className="text-white/80 group-hover:text-blue-400 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-3 group-hover:translate-x-1 transition-transform">
                        {service.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-green-400 transition-colors">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm">Professional Grade</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- VisualMasonry ---
const VisualMasonry = () => {
  const images = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=900&fit=crop",
  ];

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Portfolio</h2>
          <p className="text-slate-400">Captured moments that define brands</p>
        </div>
        <a href="https://echohivecreatives.com/work" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">
          View Full Gallery <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px]">
        {images.map((img, i) => (
          <div key={i} className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
            <img src={img} alt="Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">Creative</span>
              <h3 className="text-white text-xl font-bold">Project {i + 1}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Social Proof ---


const SocialProof = () => {
  const logos = [
    { name: "Zenth tech", image: zenith, width: 80, height: 30 },
    { name: "Desperado", image: desperado, width: 120, height: 40 },
    { name: "Amstel Malta", image: amstel, width: 100, height: 35 },
    { name: "Benfash", image: benfash, width: 100, height: 40 },
    { name: "Amalaonthgo", image: amala, width: 80, height: 30 },
    { name: "easyjet", image: easyjet, width: 100, height: 40 }
  ];

  return (
    <section className="py-4 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Trusted by Top Brands</h2>
        <p className="text-center text-slate-400 mb-16">Creators, agencies & event producers choose us</p>
        
        <div className="relative">
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 mx-8 flex items-center justify-center w-40 h-24"
              >
                <div className="relative opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={logo.image}
                    alt={`${logo.name} logo`}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// --- Contact Form ---


const ContactForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    startDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="relative bg-slate-900/95 backdrop-blur-lg p-6 rounded-xl border border-slate-800 max-w-md w-full">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center py-4">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/20 border-2 border-yellow-400">
              <Check size={32} className="text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              🎉 Thank You {formData.name}!
            </h2>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              You're Booked In!
            </h3>
            <p className="text-slate-300 mb-6 max-w-sm mx-auto">
              While you wait, explore how we've helped brands like yours stand out visually
            </p>
            <div className="flex flex-col gap-3">
              <a
                target="_blank"
                href="https://echohivecreatives.com/work"
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-sm"
              >
                View Our Portfolio
              </a>
              <a
                href="https://wa.me/2348109880912"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all text-sm"
              >
                Chat With Us On WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-70 p-4">
      <div className="relative bg-slate-900/95 backdrop-blur-lg p-6 rounded-xl border border-slate-800 max-w-md w-full max-h-[90vh] mt-10 overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Book Free Audit</h2>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Your Details</h3>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange} 
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm" 
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange} 
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm"
                placeholder="+234 800 000 0000"
              />
            </div>
          </div>
        )}

        {/* Step 2: Company Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Company Info</h3>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Company / Brand</label>
              <input 
                type="text" 
                name="company" 
                value={formData.company}
                onChange={handleChange} 
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm"
                placeholder="Company name (optional)"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Project Type *</label>
              <select 
                name="projectType" 
                value={formData.projectType}
                onChange={handleChange} 
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm"
              >
                <option value="">Select project type</option>
                <option value="brand-film">Brand Film</option>
                <option value="event-coverage">Event Coverage</option>
                <option value="drone-operations">Drone Operations</option>
                <option value="product-shoot">Product Shoot</option>
                <option value="creative-campaign">Full Creative Campaign</option>
                <option value="branding">Branding</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

      {/* Step 3: Budget & Timeline */}
{step === 3 && (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-white">Budget & Timeline</h3>
    <div>
      <label className="block text-white text-sm font-medium mb-1">Budget Range</label>
      <select 
        name="budget" 
        value={formData.budget}
        onChange={handleChange} 
        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm"
      >
        <option value="">Select budget</option>
        <option value="100k-300k">₦100k–₦300k</option>
        <option value="300k-700k">₦300k–₦700k</option>
        <option value="700k-2m">₦700k–₦2M</option>
        <option value="2m+">₦2M+</option>
      </select>
    </div>
    <div>
      <label className="block text-white text-sm font-medium mb-1">Start Date</label>
      <input 
        type="date" 
        name="startDate" 
        value={formData.startDate}
        onChange={handleChange} 
        min={new Date().toISOString().split('T')[0]} // This prevents past dates
        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm" 
      />
    </div>
  </div>
)}

        {/* Step 4: Project Description */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Project Details</h3>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Description</label>
              <textarea 
                name="description" 
                rows={4}
                value={formData.description}
                onChange={handleChange} 
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
                placeholder="Share your vision, goals, and requirements..."
              ></textarea>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors inline-flex items-center justify-center gap-1 text-sm"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all hover:scale-105 inline-flex items-center justify-center gap-1 text-sm"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all hover:scale-105 text-sm"
            >
              Book Free Audit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


// --- Footer ---
const Footer = () => (
  <footer className="py-4 px-6 border-t border-slate-800 bg-[#080b10]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <img src={Logo} alt="EchoHive Creatives" className="w-30 " />
        <div className="text-sm text-slate-500">Visuals. Production. Growth.</div>
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
        <a href="mailto:hello@echohive.com" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
        <a href="tel:+2340000000000" className="text-slate-400 hover:text-white transition-colors"><Phone size={20} /></a>
      </div>
      <div className="text-sm text-slate-600">© {new Date().getFullYear()} EchoHive Creatives</div>
    </div>
  </footer>
);

// --- App ---
export default function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f15] text-white font-sans selection:bg-blue-500 selection:text-white">
    <Nav onContactClick={() => setShowContactForm(true)} />
      <main className="relative z-10">
        <Hero />
        <WhyChooseUs />
        <Showreel />
        <ServicesOverview />
        {/* <VisualMasonry /> */}
        <SocialProof />
                <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-green-600 text-white text-sm font-bold uppercase tracking-wider mb-4">
            Limited Offer
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Get a FREE 30-Min Project Audit<br />+ 20% OFF Your First Project
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            We will review your brand needs, content goals, event requirements, or upcoming campaign and give you a fully actionable plan for free.
          </p>
          <p className="text-yellow-400 font-semibold opacity-50">⚡ Only 10 slots left this month</p>
        </div>
        {/* <ContactForm /> */}
        {showContactForm && (
  <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4" onClick={() => setShowContactForm(false)}>
    <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <ContactForm onClose={() => setShowContactForm(false)} />
    </div>
  </div>
)}
      </main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/2348109880912"
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

      <BeeOverlay />
      <ThreeBackground />
    </div>
  );
}