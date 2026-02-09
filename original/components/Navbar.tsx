
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-black py-4 shadow-xl border-b border-[#d4af37]/50`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0 transition-transform hover:scale-105">
          <img src={CONTACT_INFO.logoUrl} alt="Clinton Gold" className="h-10 md:h-12 w-auto object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="p-2 hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <a
            href={CONTACT_INFO.whatsappUrl}
            className="flex items-center space-x-2 bg-gold-gradient text-black px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            <Phone size={14} fill="currentColor" />
            <span>Atendimento</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-black border-b border-[#d4af37]/50 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen py-8' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-6 px-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium tracking-widest uppercase hover:text-gold w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={CONTACT_INFO.whatsappUrl}
            className="w-full flex items-center justify-center space-x-2 bg-gold-gradient text-black py-4 rounded-xl font-bold uppercase tracking-widest"
          >
            <Phone size={18} fill="currentColor" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
