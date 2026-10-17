import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, PhoneCall, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { getWhatsAppUrl } from '../utils/contactHelpers';

interface NavbarProps {
  onNavigateToSection?: (sectionId: string) => void;
  isLegalView?: boolean;
  onReturnToHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToSection,
  isLegalView = false,
  onReturnToHome,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio', id: 'inicio' },
    { label: 'Servicios', href: '#servicios', id: 'servicios' },
    { label: 'Experiencia', href: '#experiencia', id: 'experiencia' },
    { label: 'Proyectos', href: '#proyectos', id: 'proyectos' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    setIsOpen(false);
    if (isLegalView && onReturnToHome) {
      e.preventDefault();
      onReturnToHome();
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (onNavigateToSection) {
      onNavigateToSection(id);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isLegalView && onReturnToHome) {
      e.preventDefault();
      onReturnToHome();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-purple-100 py-2.5 sm:py-3'
          : 'bg-white/85 backdrop-blur-sm py-3 sm:py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#inicio"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D32A5] rounded-xl p-1 min-h-[44px]"
            aria-label="Eber Ruiz Zamora - Volver al inicio"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4B197A] to-[#6D32A5] flex items-center justify-center text-white font-bold text-lg tracking-wider shadow-sm transition-transform group-hover:scale-105 border border-purple-200/40 flex-shrink-0">
              {PERSONAL_INFO.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-lg font-bold text-[#4B197A] tracking-tight group-hover:text-[#6D32A5] transition-colors leading-tight">
                {PERSONAL_INFO.fullName}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-normal leading-tight">
                {PERSONAL_INFO.profession}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(link.id, e)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#6D32A5] hover:bg-[#F0E7FC]/60 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[#6D32A5] min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button & WhatsApp */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4B197A] bg-[#F0E7FC] hover:bg-[#e4d2fb] rounded-xl transition-colors border border-purple-200 min-h-[44px]"
              title="Abrir chat en WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#6D32A5]" />
              <span>+57 302 310 5047</span>
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleLinkClick('contacto', e)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#6D32A5] to-[#4B197A] hover:from-[#5a278c] hover:to-[#3e1464] rounded-xl shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6D32A5] min-h-[44px]"
            >
              <span>Hablemos</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button - Comfortable Touch Target >= 44px */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contacto"
              onClick={(e) => handleLinkClick('contacto', e)}
              className="px-3 py-2 text-xs font-bold text-white bg-[#6D32A5] rounded-xl shadow-xs min-h-[44px] flex items-center"
            >
              Hablemos
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#6D32A5] hover:bg-[#F0E7FC] focus:outline-none focus:ring-2 focus:ring-[#6D32A5] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(link.id, e)}
                className="block px-3.5 py-3 text-base font-semibold text-slate-800 hover:text-[#6D32A5] hover:bg-[#F0E7FC] rounded-xl transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 text-xs sm:text-sm font-semibold text-[#4B197A] bg-[#F0E7FC] rounded-xl border border-purple-200 min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4 text-[#6D32A5]" />
                <span>WhatsApp: +57 302 310 5047</span>
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick('contacto', e)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#6D32A5] to-[#4B197A] rounded-xl shadow-xs min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contactar ahora</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
