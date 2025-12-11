import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Check, Star, Sparkles, Zap, ArrowRight, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter, Linkedin, Mail, Phone } from 'lucide-react';
import Logo from '../assets/Images/fullLogo.png'

const DettyDecemberLanding = () => {
  const canvasRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

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
    window.open('https://wa.me/2348012345678?text=Hi EchoHive Creatives! I want to book my Detty December reservation!', '_blank');
  };

  const benefits = [
    { 
      title: 'Lightning Fast Delivery',
      desc: 'EchoHive Creatives delivers your brand before December rush',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    { 
      title: 'Premium Quality Design',
      desc: 'World-class designs by EchoHive Creatives that make you stand out',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
    },
    { 
      title: 'Full Brand Package',
      desc: 'EchoHive Creatives includes logo, website, and social media assets',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=300&fit=crop'
    },
    { 
      title: 'Expert Support',
      desc: 'EchoHive Creatives team perfects your brand until you love it',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    }
  ];

  const testimonials = [
    { 
      name: 'Chioma Adeleke',
      role: 'Fashion Brand Owner',
      company: 'Chic Styles Lagos',
      text: 'EchoHive Creatives transformed my fashion business completely! Their branding expertise helped me stand out in the competitive Lagos market. Sales increased 300% after the rebrand, and customers keep complimenting our new look. The team at EchoHive Creatives understood my vision perfectly.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    { 
      name: 'Tunde Bakare',
      role: 'Restaurant Owner',
      company: 'Lagos Grill House',
      text: 'Working with EchoHive Creatives was the best investment I made this year. They created a stunning website and brand identity that perfectly captures our restaurant\'s essence. Professional, delivered on time, and exceeded expectations. I highly recommend EchoHive Creatives to any Lagos business owner.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    { 
      name: 'Ada Okafor',
      role: 'Tech Startup CEO',
      company: 'NaijaFintech Solutions',
      text: 'EchoHive Creatives captured our tech startup vision perfectly! Their strategic approach to branding helped us secure investor funding. The website they developed is sleek, fast, and converts visitors into customers. EchoHive Creatives is the go-to agency for startups in Lagos.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
    },
    {
      name: 'Emeka Nwosu',
      role: 'Real Estate Developer',
      company: 'Prime Properties Ltd',
      text: 'EchoHive Creatives helped us rebrand our real estate company and the results have been phenomenal. Their attention to detail and understanding of the Lagos market is unmatched. Our property inquiries doubled within weeks of launching the new brand created by EchoHive Creatives.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />
      
      {/* Header with Logo */}
      <header className="relative z-50 px-4 py-4 ">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="EchoHive Creatives Logo" className='w-20 ' />
    
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
          <div className="inline-block mb-3 px-4 py-1 bg-yellow-400 text-black font-bold rounded-full text-xs animate-pulse">
            🎉 DETTY DECEMBER SPECIAL - ECHOHIVE CREATIVES
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            End The Year With A
           <br className='block md:hidden'/>
              Brand New Look
       
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Transform your business with EchoHive Creatives - Lagos premier branding & web development agency. Make 2025 your breakthrough year!
          </p>
          
          <button 
            onClick={handleWhatsAppClick}
            className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-lg inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            Book Your Reservation
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 border-2 border-black" />
                ))}
              </div>
              <span className="text-gray-300">20+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-300 ml-2">5.0 Rating</span>
            </div>
            <div className="text-gray-400">
              ⏰ Offer ends December 31st
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Images */}
   <section id="benefits" data-animate className="relative py-12 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
      Why ChooseEchoHive Creatives This December?
    </h2>
    <p className="text-center text-gray-400 mb-8">
      Lagos leading branding agency - EchoHive Creatives delivers excellence
    </p>

    {/* MOBILE: horizontal scroll | DESKTOP: grid */}
    <div
      className="
        flex gap-4 overflow-x-auto scrollbar-hide
        md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible
      "
    >
      {benefits.map((benefit, idx) => (
        <div
          key={idx}
          className="min-w-[260px] md:min-w-0 group relative bg-gradient-to-br from-gray-900 to-black 
          border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 
          transition-all transform hover:-translate-y-1"
        >
          <div className="aspect-video overflow-hidden">
            <img
              src={benefit.image}
              alt={`${benefit.title} - EchoHive Creatives`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
            <p className="text-sm text-gray-400">{benefit.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Pricing Section */}
      <section id="pricing" data-animate className="relative py-2 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
           EchoHive Creatives December Pricing
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Unbeatable value from Lagos top creative agency
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter Package */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all">
              {/* <h3 className="text-xl font-bold mb-1">Starter Pack</h3>
              <p className="text-gray-400 text-sm mb-4">Perfect for new businesses</p> */}
              <div className="mb-4">
                <span className="text-4xl font-black text-blue-500">₦150k - ₦250k</span>
              </div>
              <ul className="space-y-2 mb-6 hidden">
                {['Logo Design', 'Business Card', 'Social Media Kit', '2 Revisions', 'EchoHive Creatives Quality'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={handleWhatsAppClick} className="hidden w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-bold transition-colors text-sm">
                Choose Plan
              </button>
            </div>

            {/* Pro Package - Featured */}
            <div className="relative hidden bg-gradient-to-br from-blue-900 to-blue-950 border-2 border-blue-500 rounded-xl p-6 transform scale-105 shadow-2xl shadow-blue-500/30">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full font-bold text-xs animate-pulse">
                🔥 LIMITED OFFER
              </div>
              <h3 className="text-xl font-bold mb-1">Pro Pack</h3>
              <p className="text-gray-300 text-sm mb-4">Most popular - EchoHive Creatives</p>
              <div className="mb-4">
                <span className="text-4xl font-black text-yellow-400">₦300k - ₦500k</span>
              </div>
              <ul className="space-y-2 mb-6">
                {['Full Brand Identity', 'Website Design', 'Social Media Kit', 'Email Templates', 'Unlimited Revisions', 'EchoHive Creatives Priority'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={handleWhatsAppClick} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-bold transition-colors text-sm">
                Book Now
              </button>
            </div>

            {/* Enterprise Package */}
            <div className="bg-gradient-to-br hidden from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <p className="text-gray-400 text-sm mb-4">For established brands</p>
              <div className="mb-4">
                <span className="text-4xl font-black text-blue-500">₦500k - ₦1M</span>
              </div>
              <ul className="space-y-2 mb-6">
                {['Everything in Pro', 'Full Website Development', 'SEO Optimization', 'Content Strategy', 'Priority Support', 'EchoHive Creatives Guarantee'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={handleWhatsAppClick} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-bold transition-colors text-sm">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials Slider */}
      <section id="testimonials" data-animate className="relative py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
            What Clients Say About <span className="text-yellow-400">EchoHive Creatives</span>
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Real results from real businesses in Lagos
          </p>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 min-h-[320px]">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={testimonials[currentTestimonial].image}
                  alt={`${testimonials[currentTestimonial].name} - EchoHive Creatives Client`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-1 mb-3 text-yellow-400">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic leading-relaxed">
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

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                aria-label="Previous testimonial"
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
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-4 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-2 mb-2">
            {/* Logo Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
             <img src={Logo} alt="EchoHive Creatives Logo" className='w-30' />
            
              </div>
              <p className="text-sm text-gray-400">
                Lagos premier branding & web development agency. EchoHive Creatives - transforming businesses across Nigeria.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold mb-3">Contact EchoHive Creatives</h3>
              <div className="space-y-2 text-sm text-gray-400">
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

            {/* Social Links */}
            <div>
              <h3 className="font-bold mb-3">Follow EchoHive Creatives</h3>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 EchoHive Creatives. All rights reserved. </p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/50 transition-all transform hover:scale-110 z-50 animate-bounce"
        aria-label="Contact EchoHive Creatives on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DettyDecemberLanding;