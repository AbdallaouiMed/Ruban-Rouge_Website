'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Container } from './Container';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/histoire`, label: t('nav.histoire') },
    { href: `/${locale}/creations`, label: t('nav.creations') },
    { href: `/${locale}/commandes`, label: t('nav.commandes') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ivory shadow-md' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col">
            <span
              className={`font-display text-2xl font-bold transition-colors ${
                isScrolled ? 'text-ruban-red' : 'text-white'
              }`}
            >
              Ruban Rouge
            </span>
            <span
              className={`font-script text-sm transition-colors ${
                isScrolled ? 'text-gold' : 'text-white/90'
              }`}
            >
              {t('heritage.since')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans font-medium text-sm transition-colors hover:text-ruban-red ${
                  isScrolled ? 'text-espresso' : 'text-white hover:text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Language Switcher + Phone Button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant={isScrolled ? 'dark' : 'light'} />
            <a
              href="tel:+212535510010"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans font-semibold text-sm transition-all ${
                isScrolled
                  ? 'bg-ruban-red text-white hover:bg-ruban-red-dark'
                  : 'bg-white text-ruban-red hover:bg-white/90'
              }`}
            >
              <Phone className="w-4 h-4" />
              {t('nav.phone')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-espresso' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-ivory shadow-lg">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 font-sans font-medium text-espresso hover:bg-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-6 py-3 flex items-center gap-4 border-t border-cream mt-2 pt-4">
                <LanguageSwitcher variant="dark" />
                <a
                  href="tel:+212535510010"
                  className="flex items-center gap-2 px-4 py-2 bg-ruban-red text-white rounded-full font-sans font-semibold text-sm hover:bg-ruban-red-dark transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t('nav.phone')}
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
