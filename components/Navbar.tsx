'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Phone } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';
import SearchModal from './SearchModal';
import { useSettings } from './SettingsProvider';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { whatsappUrl, salesDisabled } = useSettings();
  
  // Filtrar menu "Jóias" se vendas estiverem desativadas
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (salesDisabled && item.label === 'Jóias') {
      return false;
    }
    return true;
  });

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
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <img src={CONTACT_INFO.logoUrl} alt="Clinton Gold" className="h-6 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {filteredNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors duration-200 ${
                pathname === item.href ? 'text-gold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:text-gold transition-colors"
          >
            <Search size={20} />
          </button>
          <a
            href={whatsappUrl}
            className="flex items-center space-x-2 bg-gold-gradient text-black px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            <Phone size={14} fill="currentColor" />
            <span>Atendimento</span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gold hover:text-gold/80 transition-colors"
          >
            <Search size={24} />
          </button>
          <button
            className="p-2 text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-black border-b border-[#d4af37]/50 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen py-8' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-6 px-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-lg font-medium tracking-widest uppercase hover:text-gold w-full text-center ${
                pathname === item.href ? 'text-gold' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <Search size={18} />
            <span>Buscar Produtos</span>
          </button>
          <a
            href={whatsappUrl}
            className="w-full flex items-center justify-center space-x-2 bg-gold-gradient text-black py-4 rounded-xl font-bold uppercase tracking-widest"
          >
            <Phone size={18} fill="currentColor" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
