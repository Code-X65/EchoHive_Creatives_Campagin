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
  Play,
  CheckCircle,
  Film,
  Plane,
  Package,
  Pencil,
  Settings,
  Video,
} from "lucide-react";
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

      ctx.fillStyle = "rgba(250, 204, 21, 0.6)";
      ctx.strokeStyle = "#fbbf24";
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
      ctx.strokeStyle = "#fbbf24";
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

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(18, -6, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(20, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();

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

      particlesGeometry.attributes.position.needsUpdate = true;

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
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg border-b border-blue-500/30 bg-black/90" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <img src={Logo} alt="EchoHive Creatives" className="w-20" />
        <div className="hidden md:flex gap-8 text-sm font-semibold text-white">
          <a href="#services" className="hover:text-yellow-400 transition-colors">
            Services
          </a>
          <a href="#work" className="hover:text-yellow-400 transition-colors">
            Portfolio
          </a>
          <a href="#offer" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
            <Gift size={14} className="text-yellow-400" /> Free Audit
          </a>
        </div>
        <a
          href="#contact"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
        >
          Book My Audit
        </a>
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
    <section className="relative  pt-32 pb-5 flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400/30 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-yellow-400/20 border-2 border-yellow-400 text-yellow-400 text-sm font-bold uppercase tracking-wider mb-8">
            <Gift size={16} /> FREE 30-Min Project Audit + 20% OFF
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6">
            Transform Your Vision<br />
            Into Powerful<br />
            
              Creative Content
        
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            Premium Brand Films • Event Coverage • Drone Operations • Creative Production
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Work with the team behind Nigeria's fastest-rising creative brands. 
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-10 py-5 bg-yellow-400 text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 inline-flex items-center justify-center gap-3 text-lg"
            >
              <span>Book My Free Audit</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="#work"
              className="px-10 py-5 border-2 border-blue-500 text-white font-bold rounded-full hover:bg-blue-500 transition-all inline-flex items-center justify-center gap-3 text-lg"
            >
              <Play size={20} />
              <span>See Work Portfolio</span>
            </a>
          </div>

          <p className="text-yellow-400 text-sm font-semibold mt-6">
            Limited to the first 10 new clients this month
          </p>
        </div>
      </div>
    </section>
  );
};

// --- Value Proposition ---
const ValueProposition = () => {
  const values = [
    {
      icon: <Film className="w-12 h-12" />,
      title: "High-Quality Production",
      text: "Cinematic storytelling, sharp visuals, premium event coverage.",
    },
    {
      icon: <Plane className="w-12 h-12" />,
      title: "Professional Drone Services",
      text: "Licensed operators + cutting-edge drone gear.",
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Photography & Videography",
      text: "Corporate, lifestyle, product, documentary.",
    },
    {
      icon: <Pencil className="w-12 h-12" />,
      title: "Creative Direction & Branding",
      text: "From concept → execution → delivery.",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Fast & Reliable",
      text: "Industry-standard workflow with fast turnarounds.",
    },
  ];

  return (
    <section className="py-5 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-4">
          Why Brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400">Choose Us</span>
        </h2>
        <p className="text-center text-xl text-gray-400 mb-5">
         Delacruz Innovations & EchoHive Creatives deliver world-class visuals that boost engagement, attract customers, and elevate your brand story.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/50 to-transparent border border-blue-500/20 hover:border-yellow-400/50 transition-all hover:-translate-y-2 group"
            >
              <div className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Showreel Section ---
const ShowreelSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="relative rounded-3xl overflow-hidden border-4 border-blue-500/30 hover:border-yellow-400 transition-all group">
          <div className="aspect-video bg-gradient-to-br from-blue-950 to-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={40} className="text-black ml-2" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Watch Our Showreel</h3>
              <p className="text-gray-400 text-lg">
                See how we turn ordinary moments into unforgettable content
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services Overview ---
const ServicesOverview = () => {
  const services = [
    { icon: <Film />, name: "Brand Films & Commercials" },
    { icon: <Camera />, name: "Event Coverage (Corporate, Lifestyle, Luxury)" },
    { icon: <Plane />, name: "Drone Filming & Aerial Shots" },
    { icon: <Package />, name: "Product Photography & Content Production" },
    { icon: <Pencil />, name: "Branding & Creative Direction" },
    { icon: <Settings />, name: "Gear & Drone Rentals" },
    { icon: <Video />, name: "Social Media Content Shoots" },
  ];

  return (
    <section id="services" className="py-5 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-4">
          What We Do
        </h2>
        <p className="text-center text-xl text-gray-400 mb-5">
          Full-service creative production for modern brands
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-500/20 hover:border-yellow-400 transition-all flex items-center gap-4 group hover:-translate-y-1"
            >
              <div className="text-yellow-400 group-hover:scale-110 transition-transform">
                {React.cloneElement(service.icon, { size: 32 })}
              </div>
              <span className="text-white font-semibold text-lg">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Portfolio Section ---
const PortfolioSection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop",
      title: "Brand Film Production",
      category: "Commercial",
    },
    {
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&h=900&fit=crop",
      title: "Corporate Event Coverage",
      category: "Events",
    },
    {
      url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1600&h=900&fit=crop",
      title: "Aerial Drone Shots",
      category: "Drone Operations",
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop",
      title: "Product Photography",
      category: "Commercial",
    },
    {
      url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1600&h=900&fit=crop",
      title: "Lifestyle Content",
      category: "Social Media",
    },
    {
      url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&h=900&fit=crop",
      title: "Behind the Scenes",
      category: "Production",
    },
  ];

  return (
    <section id="work" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400">Work</span>
        </h2>
        <p className="text-xl text-gray-400">Visual storytelling that drives results</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-video border-4 border-blue-500/20 hover:border-yellow-400 transition-all"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">
                {img.category}
              </span>
              <h3 className="text-white text-2xl font-bold">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://echohivecreatives.com/work"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105"
        >
          View Full Portfolio <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

// --- Social Proof ---
const SocialProof = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const clients = [
    "Nike", "Coca-Cola", "MTN", "Guinness", "Access Bank", "DStv"
  ];
  
  const testimonials = [
    {
      text: "Their production quality boosted our campaign engagement drastically.",
      author: "Marketing Director, Tech Startup",
    },
    {
      text: "Professional, fast, and incredibly creative.",
      author: "Event Coordinator, Luxury Brand",
    },
    {
      text: "Best drone team we've worked with in Lagos.",
      author: "Creative Director, Agency",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Trusted by Top Brands, Creators, Agencies & Event Producers
        </h3>
        <p className="text-gray-400 mb-12">Join the brands creating unforgettable content</p>

        {/* Client Logos Slider */}
        <div className="relative mb-16 overflow-hidden">
          <div className="flex animate-scroll gap-12 items-center">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-20 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-sm"
              >
                <span className="text-white/60 font-semibold text-sm">{client}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-transparent border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105"
            >
              <p className="text-white text-lg italic mb-4">"{t.text}"</p>
              <p className="text-yellow-400 font-semibold"> {t.author}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Card Shuffle */}
        <div className="md:hidden relative h-64">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-500 ${
                i === currentIndex
                  ? 'opacity-100 translate-x-0 scale-100'
                  : i === (currentIndex - 1 + testimonials.length) % testimonials.length
                  ? 'opacity-0 -translate-x-full scale-95'
                  : 'opacity-0 translate-x-full scale-95'
              }`}
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-transparent border border-blue-500/20 h-full flex flex-col justify-center">
                <p className="text-white text-lg italic mb-4">"{t.text}"</p>
                <p className="text-yellow-400 font-semibold"> {t.author}</p>
              </div>
            </div>
          ))}
          
          {/* Dots Indicator */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-blue-500 w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// --- Offer Section ---
const OfferSection = () => {
  return (
    <section id="offer" className="py-5 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative p-1 rounded-[3rem] bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400">
          <div className="bg-black rounded-[2.8rem] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-block px-6 py-2 rounded-full bg-yellow-400 text-black text-sm font-black uppercase tracking-wider mb-6">
                🎁 Limited Time Offer
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Get a <span className="text-yellow-400">FREE</span> 30-Min Project Audit
                <br />+ 20% OFF Your First Project
              </h2>

              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                We will review your brand needs, content goals, event requirements, or upcoming campaign and give you a fully actionable plan  free.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 text-lg mb-8"
              >
                Claim My Free Audit <ArrowRight size={24} />
              </a>

              <p className="text-yellow-400 font-bold text-sm">
                ⏰ Only 10 slots left this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact Form ---
const ContactForm = () => {
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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-5 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} className="text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            You're Booked In!
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            A member of our team will contact you within 24 hours to confirm your free audit and next steps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://echohivecreatives.com/work"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-yellow-400 hover:text-black transition-all"
            >
              View Portfolio
            </a>
            <a
              href="https://wa.me/2348123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-black transition-all inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.81 11.81 0 0 0 3.48 20.52L2 22l1.48-.48A12 12 0 1 0 20.52 3.48zM12 20a8 8 0 0 1-4.43-1.3l-.31-.2L6 18l.61-.99-.2-.31A8 8 0 1 1 12 20zm3.08-6.69c-.18-.09-1.06-.52-1.22-.58-.16-.06-.28-.09-.39.09-.1.18-.4.58-.49.7-.09.12-.18.14-.36.05-.18-.09-.73-.27-1.39-.86-.51-.48-.85-1.07-.95-1.25-.1-.18-.01-.28.07-.37.07-.07.16-.18.24-.27.08-.09.11-.18.18-.3.06-.12.03-.22-.02-.31-.05-.09-.39-.94-.54-1.29-.14-.33-.29-.27-.39-.27-.1 0-.22-.01-.34-.01s-.31.05-.47.22c-.16.16-.62.6-.62 1.46s.64 1.7.73 1.82c.09.12 1.26 1.92 3.05 2.7 1.67.74 1.67.49 1.98.46.3-.03.97-.39 1.11-.76.14-.37.14-.68.1-.76-.05-.08-.18-.11-.36-.2z" />
              </svg>
              Chat With Our Team
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-blue-950/50 to-transparent border border-blue-500/30 rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
            Start Your Project
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Fill out the form below and we'll get back to you within 24 hours
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Company / Brand Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">What type of project are you planning?</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
              >
                <option value="">Select project type</option>
                <option value="brand-film">Brand Film</option>
                <option value="event-coverage">Event Coverage</option>
                <option value="drone-operations">Drone Operations</option>
                <option value="product-shoot">Product Shoot</option>
                <option value="full-campaign">Full Creative Campaign</option>
                <option value="branding">Branding</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Estimated Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
                >
                  <option value="">Select budget range</option>
                  <option value="100k-300k">₦100k–₦300k</option>
                  <option value="300k-700k">₦300k–₦700k</option>
                  <option value="700k-2m">₦700k–₦2M</option>
                  <option value="2m+">₦2M+</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Preferred Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-blue-500/30 text-white focus:border-yellow-400 focus:outline-none transition-all resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 text-lg"
            >
              Book My Audit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="py-12 px-6 border-t border-blue-500/30 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8 items-center">
        <div>
            <img src={Logo} alt="EchoHive Creatives" className="w-20" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Visual storytelling and creative production that elevates brands across Nigeria and beyond.
          </p>
        </div>

        <div className="hidden md:block" />

        <div className="md:justify-self-end">
          <h4 className="text-white font-semibold mb-3 text-sm">Connect With Us</h4>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, link: "https://instagram.com/echohivecreatives" },
              { Icon: Mail, link: "mailto:hello@echohivecreatives.com" },
              { Icon: Phone, link: "tel:+2348123456789" }
            ].map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-yellow-400 transition-all flex items-center justify-center"
              >
                <Icon size={18} className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-6 border-t border-blue-500/20">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} EchoHive Creatives. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- App ---
export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <Nav />
      <main className="relative z-10">
        <Hero />
        <ValueProposition />
        <ShowreelSection />
        <ServicesOverview />
        {/* <PortfolioSection /> */}
        <SocialProof />
        <OfferSection />
        <ContactForm />
      </main>
      <Footer />

      <a
        href="https://wa.me/2348123456789"
        target="_blank"
        rel="noreferrer"
        className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transform hover:scale-110 transition-transform shadow-yellow-400/50"
        style={{ background: "#25D366", color: "white" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.81 11.81 0 0 0 3.48 20.52L2 22l1.48-.48A12 12 0 1 0 20.52 3.48zM12 20a8 8 0 0 1-4.43-1.3l-.31-.2L6 18l.61-.99-.2-.31A8 8 0 1 1 12 20zm3.08-6.69c-.18-.09-1.06-.52-1.22-.58-.16-.06-.28-.09-.39.09-.1.18-.4.58-.49.7-.09.12-.18.14-.36.05-.18-.09-.73-.27-1.39-.86-.51-.48-.85-1.07-.95-1.25-.1-.18-.01-.28.07-.37.07-.07.16-.18.24-.27.08-.09.11-.18.18-.3.06-.12.03-.22-.02-.31-.05-.09-.39-.94-.54-1.29-.14-.33-.29-.27-.39-.27-.1 0-.22-.01-.34-.01s-.31.05-.47.22c-.16.16-.62.6-.62 1.46s.64 1.7.73 1.82c.09.12 1.26 1.92 3.05 2.7 1.67.74 1.67.49 1.98.46.3-.03.97-.39 1.11-.76.14-.37.14-.68.1-.76-.05-.08-.18-.11-.36-.2z" />
        </svg>
      </a>

      <BeeOverlay />
      <ThreeBackground />
    </div>
  );
}