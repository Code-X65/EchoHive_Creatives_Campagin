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

   particlesGeometry.addAttribute('position', new THREE.BufferAttribute(posArray, 3));

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
        <div className="text-2xl font-black text-white">
      <img src={Logo} alt="EchoHive Creatives Logo" className="w-20"/>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-white">
          <a href="#work" className="hover:text-yellow-400 transition-colors">
            Work
          </a>
          <a href="#benefits" className="hover:text-yellow-400 transition-colors">
            Services
          </a>
          <a href="#pricing" className="hover:text-yellow-400 transition-colors flex items-center gap-1">
            <Gift size={14} className="text-yellow-400" /> Christmas Deal
          </a>
        </div>
        <a
          href="https://wa.me/2340000000000"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
        >
          Let's Talk
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
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400/30 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-yellow-400/20 border-2 border-yellow-400 text-yellow-400 text-sm font-bold uppercase tracking-wider mb-8">
            <Gift size={16} /> Detty December Special - 40% OFF
          </div>
          <h1 className="text-3xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6">
            We Don't Just <br className="hidden md:block" />
              Manage Brands
          
            <br />
            We Ignite Them
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            Visual storytelling meets automation. Scale your business this holiday season with content that converts.
          </p>

          <div className="flex flex-col  sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/2340000000000"
              className="group relative px-10 py-3 bg-yellow-400 text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 inline-flex items-center justify-center gap-3 text-3xl"
            >
           
              <span>Reserve Your Slot Now</span>
                 <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.52 3.48A11.81 11.81 0 0 0 3.48 20.52L2 22l1.48-.48A12 12 0 1 0 20.52 3.48zM12 20a8 8 0 0 1-4.43-1.3l-.31-.2L6 18l.61-.99-.2-.31A8 8 0 1 1 12 20zm3.08-6.69c-.18-.09-1.06-.52-1.22-.58-.16-.06-.28-.09-.39.09-.1.18-.4.58-.49.7-.09.12-.18.14-.36.05-.18-.09-.73-.27-1.39-.86-.51-.48-.85-1.07-.95-1.25-.1-.18-.01-.28.07-.37.07-.07.16-.18.24-.27.08-.09.11-.18.18-.3.06-.12.03-.22-.02-.31-.05-.09-.39-.94-.54-1.29-.14-.33-.29-.27-.39-.27-.1 0-.22-.01-.34-.01s-.31.05-.47.22c-.16.16-.62.6-.62 1.46s.64 1.7.73 1.82c.09.12 1.26 1.92 3.05 2.7 1.67.74 1.67.49 1.98.46.3-.03.97-.39 1.11-.76.14-.37.14-.68.1-.76-.05-.08-.18-.11-.36-.2z" />
              </svg>
            </a>
    
          </div>
        </div>

        {/* Large Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer border-4 border-blue-500/30 hover:border-yellow-400 transition-all">
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200"
              alt="Professional Photography"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-8">
              <div>
                <span className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2 block">
                  Brand Photography
                </span>
                <h3 className="text-white text-3xl font-bold">Professional Shoots</h3>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden group cursor-pointer border-4 border-blue-500/30 hover:border-yellow-400 transition-all">
            <img
              src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&q=80&w=800"
              alt="Studio Setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
              <h3 className="text-white text-lg font-bold">Studio Work</h3>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden group cursor-pointer border-4 border-blue-500/30 hover:border-yellow-400 transition-all">
            <img
              src="https://images.unsplash.com/photo-1493421419110-74f4e21bec70?auto=format&fit=crop&q=80&w=800"
              alt="Creative Content"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
              <h3 className="text-white text-lg font-bold">Creative</h3>
            </div>
          </div>

          <div className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer border-4 border-blue-500/30 hover:border-yellow-400 transition-all">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200"
              alt="Brand Strategy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
              <div>
                <span className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2 block">
                  Brand Strategy
                </span>
                <h3 className="text-white text-2xl font-bold">Digital Campaigns</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- VisualMasonry ---
const VisualMasonry = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop",
      title: "Product Photography",
      category: "Commercial",
    },
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&h=900&fit=crop",
      title: "Brand Campaign",
      category: "Marketing",
    },
    {
      url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&h=900&fit=crop",
      title: "Corporate Events",
      category: "Events",
    },
    {
      url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=900&fit=crop",
      title: "Lifestyle Content",
      category: "Social Media",
    },
    {
      url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1600&h=900&fit=crop",
      title: "Studio Portraits",
      category: "Editorial",
    },
    {
      url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&h=900&fit=crop",
      title: "Equipment Setup",
      category: "Behind the Scenes",
    },
  ];

  return (
    <section id="work" className="py-5 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400"> Visual Storytelling</span>
        </h2>
        <p className="text-xl text-gray-400">Images that speak louder than words</p>
      </div>

     <div className="
  md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6
  flex md:block gap-4 overflow-x-auto scrollbar-hide
  snap-x snap-mandatory
">
  {images.map((img, i) => (
    <div
      key={i}
      className="group relative rounded-2xl overflow-hidden cursor-pointer 
      aspect-[4/3] border-4 border-blue-500/20 hover:border-yellow-400 
      transition-all snap-start min-w-[85%] md:min-w-0"
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


      <div className="text-center mt-5">
        <a
          target="_blank"
          href="https://echohivecreatives.com/work"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105"
        >
          View Full Portfolio <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

// --- Benefits ---
const Benefits = () => {
  const items = [
    {
      icon: <Zap className="text-yellow-400 w-16 h-16" />,
      title: "Save Time",
      text: "Reclaim 40% of your week with automated workflows that handle repetitive tasks.",
    },
    {
      icon: <Camera className="text-blue-400 w-16 h-16" />,
      title: "Visual Impact",
      text: "High-end photography and videography that elevates your brand perception.",
    },
    {
      icon: <ImageIcon className="text-yellow-400 w-16 h-16" />,
      title: "Content Strategy",
      text: "A cohesive content plan that keeps your audience engaged year-round.",
    },
  ];

  return (
    <section id="benefits" className="py-4 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-4">
          Why choose EchoHive?
        </h2>
        <p className="text-center text-xl text-gray-400 mb-5">
          More than just a creative agency
        </p>
        <div className="grid md:grid-cols-3 gap-2">
          {items.map((it, i) => (
            <div
              key={i}
              className="p-4 rounded-3xl transition-all hover:-translate-y-2  text-center group"
            >
              <div className="rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {it.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-4">{it.title}</div>
              <div className="text-gray-400 leading-relaxed text-lg">{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ChristmasPricing ---
const ChristmasPricing = () => {
  return (
    <section id="pricing" className="py-5 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative p-1 rounded-[3rem] bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400">
          <div className="bg-black rounded-[2.8rem] p-5 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-block px-6 py-2 rounded-full bg-yellow-400 text-black text-sm font-black uppercase tracking-wider mb-6 shadow-lg shadow-yellow-400/50">
                🎄 Detty December Offer
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-2">
                Automate Your <span className="">Business</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                Get your business ready for 2025. Full automation audit and implementation package.
              </p>

              <div className="flex justify-center items-baseline gap-3 mb-8">
                <span className="text-5xl md:text-7xl font-black text-white">₦250k</span>
                <span className="text-3xl md:text-4xl font-bold text-blue-400">—</span>
                <span className="text-5xl md:text-7xl font-black text-white">₦450k</span>
              </div>

              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-yellow-400 text-white font-bold text-base shadow-xl mb-10">
                ⏰ Valid until Dec 31st • Only 50 slots available
              </div>

          
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="py-3 px-6 border-t border-blue-500/30 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6 items-center">

        {/* Brand */}
        <div>
          <div className="font-black text-2xl text-white mb-2">
          <img src={Logo} alt="EchoHive Creatives Logo" className="w-30"/>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Visual storytelling and automation that ignites brands across Nigeria and beyond.
          </p>
        </div>

        {/* Spacer for structure */}
        <div className="hidden md:block" />

        {/* Social */}
        <div className="md:justify-self-end">
          <h4 className="text-white font-semibold mb-2 text-sm">Connect</h4>
          <div className="flex gap-3">
            {[Instagram, Mail, Phone].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-yellow-400 transition-all flex items-center justify-center"
              >
                <Icon size={18} className="text-white" />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center pt-2">
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
      `}</style>
      
      <Nav />
      <main className="relative z-10">
        <Hero />
        <VisualMasonry />
        <Benefits />
        <ChristmasPricing />
      </main>
      <Footer />

      <a
        href="https://wa.me/2340000000000"
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