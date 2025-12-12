import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Check, Star, Sparkles, Zap, ArrowRight, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, Play, Camera, Film, Video } from 'lucide-react';
import Logo from '../assets/Images/fullLogo.png';

const  MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    startDate: '',
    description: ''
  });

  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Personal Info', fields: ['name', 'email', 'phone'] },
    { number: 2, title: 'Company Details', fields: ['company', 'projectType'] },
    { number: 3, title: 'Project Scope', fields: ['budget', 'startDate'] },
    { number: 4, title: 'Description', fields: ['description'] }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep = (step) => {
    const stepFields = steps[step - 1].fields;
    return stepFields.every(field => {
      if (field === 'name' || field === 'email' || field === 'phone') {
        return formData[field].trim() !== '';
      }
      return true;
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you within 24 hours.');
  };

  return (
    <div className=" py-5 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-4 text-white">
          Start Your Project
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Fill out the form below and we'll contact you within 24 hours
        </p>


        {/* Form */}
        <div className=" rounded-xl p-8">
          <div className="min-h-[400px]">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Company Details */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Company Details</h3>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Company / Brand Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">What type of project are you planning?</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="">Select a project type</option>
                    <option value="brand-film">Brand Film</option>
                    <option value="event-coverage">Event Coverage</option>
                    <option value="drone-operations">Drone Operations</option>
                    <option value="product-shoot">Product Shoot</option>
                    <option value="full-campaign">Full Creative Campaign</option>
                    <option value="branding">Branding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Project Scope */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Project Scope</h3>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Estimated Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="100k-300k">₦100k–₦300k</option>
                    <option value="300k-700k">₦300k–₦700k</option>
                    <option value="700k-2m">₦700k–₦2M</option>
                    <option value="2m+">₦2M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Preferred Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Description */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Tell Us More</h3>
                <div>
                  <label className="block text-sm font-bold mb-2 text-white">Project Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="8"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white resize-none"
                    placeholder="Tell us about your project, your goals, and any specific requirements..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between border-gray-800">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                currentStep === 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  !validateStep(currentStep)
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                }`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all transform hover:scale-105"
              >
                <Check size={20} />
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

const CreativeAgencyLanding = () => {

  const canvasRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    startDate: '',
    description: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#3B82F6' : '#FBBF24';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348012345678?text=Hi! I want to book my free 30-min project audit!', '_blank');
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

// Services data with images
const services = [
  { 
    image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=800&q=80',
    title: 'Brand Films & Commercials',
    desc: 'Cinematic storytelling that captures your brand essence'
  },
  { 
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    title: 'Event Coverage',
    desc: 'Corporate, lifestyle, and luxury event production'
  },
  { 
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
    title: 'Drone Filming & Aerial Shots',
    desc: 'Licensed operators with cutting-edge drone gear'
  },
  { 
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    title: 'Product Photography & Content',
    desc: 'High-quality product shoots and content production'
  },
  { 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    title: 'Creative Direction & Branding',
    desc: 'From concept to execution to delivery'
  },
  { 
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    title: 'Gear & Drone Rentals',
    desc: 'Professional equipment available for rent'
  },
  { 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    title: 'Social Media Content Shoots',
    desc: 'Engaging content optimized for social platforms'
  }
];


 const valueProps = [
    { 
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80',
      title: 'High-Quality Production',
      desc: 'Cinematic storytelling, sharp visuals, premium event coverage'
    },
    { 
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
      title: 'Professional Drone Services',
      desc: 'Licensed operators + cutting-edge drone gear'
    },
    { 
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
      title: 'Photography & Videography',
      desc: 'Corporate, lifestyle, product, documentary'
    },
    { 
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
      title: 'Creative Direction & Branding',
      desc: 'From concept → execution → delivery'
    },
    { 
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
      title: 'Fast & Reliable',
      desc: 'Industry-standard workflow with fast turnarounds'
    }
  ];

  const testimonials = [
    { 
      name: 'Chioma Adeleke',
      role: 'Marketing Director',
      company: 'Luxury Brands Nigeria',
      text: 'Their production quality boosted our campaign engagement drastically.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    { 
      name: 'Tunde Bakare',
      role: 'CEO',
      company: 'Tech Innovation Hub',
      text: 'Professional, fast, and incredibly creative.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    { 
      name: 'Ada Okafor',
      role: 'Events Manager',
      company: 'Elite Events Lagos',
      text: 'Best drone team we\'ve worked with in Lagos.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
    }
  ];

  const clientLogos = [
    'Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E', 'Brand F'
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">You're Booked In!</h1>
            <p className="text-xl text-gray-300 mb-8">
              A member of our team will contact you within 24 hours to confirm your free audit and next steps.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              View Portfolio
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat With Our Team
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />
      
      {/* Header */}
      <header className="relative z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
         
            <div>
           <img src={Logo} alt="Echohive Creatives" className='w-20' />
            </div>
          </div>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-bold text-sm transition-all"
          >
            Contact Us
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 py-4">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm animate-pulse">
            🎁 FREE 30-Min Project Audit + 20% OFF Your First Project
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Transform Your Vision Into<br/>
            Powerful Creative Content
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-3xl mx-auto font-semibold">
            Premium Brand Films • Event Coverage • Drone Operations • Creative Production
          </p>
          
          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            Work With the Team Behind Nigeria's Fastest-Rising Creative Brands. Delacruz Innovations & EchoHive Creatives deliver world-class visuals that boost engagement, attract customers, and elevate your brand story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="#contact-form"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
            >
              Book My Free Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => document.getElementById('showreel').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-5 h-5" />
              See Work Portfolio
            </button>
          </div>

          <div className="text-sm text-yellow-400 font-bold animate-pulse">
            ⏰ Limited to the first 10 new clients this month
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
   <section id="value-props" data-animate className="relative py-5 ">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
      Why Brands Choose Us
    </h2>
    
    <div className="mt-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 flex overflow-x-scroll md:overflow-x-visible gap-4 pb-4 px-4 md:px-0 scrollbar-hide snap-x snap-mandatory">
      {valueProps.map((prop, idx) => (
        <div
          key={idx}
          className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all transform hover:-translate-y-1 min-w-[280px] md:min-w-0 snap-center group"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={prop.image} 
              alt={prop.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
            <p className="text-gray-400">{prop.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Showreel Section */}
      <section id="showreel" data-animate className="relative py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
            See Our Work
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            See how we turn ordinary moments into unforgettable content
          </p>
          
          <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=675&fit=crop"
              alt="Video Production Showreel"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
   <section id="services" data-animate className="relative py-16 bg-gradient-to-b from-black to-gray-900">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
      What We Do
    </h2>
    
    <div className="mt-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 flex overflow-x-scroll md:overflow-x-visible gap-4 pb-4 px-4 md:px-0 scrollbar-hide snap-x snap-mandatory">
      {services.map((service, idx) => (
        <div
          key={idx}
          className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all transform hover:-translate-y-1 min-w-[280px] md:min-w-0 snap-center group"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-400">{service.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Social Proof - Client Logos */}
      <section data-animate className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-400">
            Trusted by top brands, creators, agencies & event producers
          </h3>
          
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll gap-8">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-40 h-24 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 font-bold"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" data-animate className="relative py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12">
            What Clients Say
          </h2>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 min-h-[320px]">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-1 mb-3 text-yellow-400">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic leading-relaxed text-lg">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-blue-400">{testimonials[currentTestimonial].role}</p>
                    <p className="text-xs text-gray-500">{testimonials[currentTestimonial].company}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentTestimonial ? 'bg-blue-500 w-8' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section data-animate className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 border-2 border-blue-500">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Get a FREE 30-Min Project Audit<br/>
              <span className="text-yellow-400">+ 20% OFF Your First Project</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              We will review your brand needs, content goals, event requirements, or upcoming campaign and give you a fully actionable plan — free.
            </p>
            <a 
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
            >
              Claim My Free Audit
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-yellow-400 font-bold mt-4 animate-pulse">
              ⏰ Only 10 slots left this month
            </p>
          </div>
        </div>
      </section>

  <MultiStepForm />

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
              
                <img src={Logo} alt="EchoHive Creatives Logo" className="w-30" />
              </div>
              <p className="text-sm text-gray-400">
                Delacruz Innovations & EchoHive Creatives - transforming visions into powerful creative content across Nigeria.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>info@echohivecreatives.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>+234 801 234 5678</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span>WhatsApp Business</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                             <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} EchoHive Creatives — All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CreativeAgencyLanding;
