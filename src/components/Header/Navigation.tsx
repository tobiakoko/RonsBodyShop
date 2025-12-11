import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationLink {
    id: string;
    label: string;
    href: string;
    isButton?: boolean;
}

const NavigationLink: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navRef = useRef<HTMLElement>(null);

    const navigationLinks: NavigationLink[] = useMemo(() => [
        { id: '1', label: 'Home', href: '#home' },
        { id: '2', label: 'About', href: '#about' },
        { id: '3', label: 'Services', href: '#services' },
        { id: '4', label: 'Contact', href: '#contact', isButton: true },
    ], []);

    const smoothScrollTo = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            const navHeight = navRef.current?.offsetHeight || 64;
            const targetPosition = element.offsetTop - navHeight;
                
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNavClick = (href: string, e: React.MouseEvent) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        
        if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            smoothScrollTo(targetId);
        }
        
        window.history.pushState(null, '', href);
        closeMobileMenu();
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
            
            const navHeight = navRef.current?.offsetHeight || 64;
            const fromTop = window.scrollY + navHeight + 100;
            
            const sections = navigationLinks
                .filter(link => !link.isButton)
                .map(link => ({
                    id: link.href.replace('#', ''),
                    element: document.getElementById(link.href.replace('#', ''))
                }))
                .filter(section => section.element);

            let currentSection = 'home';
            
            for (const section of sections) {
                if (section.element && section.element.offsetTop <= fromTop) {
                    currentSection = section.id;
                }
            }
            
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigationLinks]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white/98 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_8px_32px_-8px_rgba(30,58,138,0.12)]'
                    : 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.03)]'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <a
                        href="#home"
                        className="flex items-center [color:var(--color-navy)] hover:[color:var(--color-red)] transition-all duration-300 group relative z-10"
                        onClick={(e) => handleNavClick('#home', e)}
                    >
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-gold)]/0 via-[var(--color-gold)]/10 to-[var(--color-gold)]/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                            <img
                                src="/logo.png"
                                alt="Ron's Body Shop Logo"
                                className="relative w-38 h-30 transition-transform duration-300 group-hover:scale-110 object-contain"
                            />
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
                        {navigationLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={(e) => handleNavClick(link.href, e)}
                                className={
                                    link.isButton
                                        ? "group relative px-5 py-2.5 lg:px-6 [background-color:var(--color-red)] text-white! text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:[background-color:var(--color-red-dark)] shadow-sm hover:shadow-[0_4px_20px_rgba(220,38,38,0.45)] hover:-translate-y-0.5 hover:scale-[1.02]"
                                        : `group relative px-3.5 py-2 lg:px-4 text-sm font-medium transition-all duration-300 rounded-lg ${
                                            activeSection === link.href.replace('#', '')
                                                ? '[color:var(--color-navy)] font-semibold'
                                                : '[color:var(--color-gray-700)] hover:[color:var(--color-navy)]'
                                        }`
                                }
                            >
                                {link.isButton ? (
                                    <>
                                        <span className="relative z-10 flex items-center gap-2">
                                            {link.label}
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-red-dark)] to-[var(--color-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10">{link.label}</span>
                                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 [background:linear-gradient(90deg,var(--color-gold)_0%,var(--color-red)_100%)] transition-all duration-300 ${
                                            activeSection === link.href.replace('#', '')
                                                ? 'opacity-100 scale-x-100'
                                                : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                                        }`}></span>
                                    </>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        className="md:hidden relative p-2 [color:var(--color-navy)] hover:[color:var(--color-red)] rounded-lg transition-all duration-300 hover:bg-gray-50 active:scale-95"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <div className="relative w-6 h-6">
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 animate-in spin-in-180 duration-300" />
                            ) : (
                                <Menu className="w-6 h-6 animate-in fade-in duration-300" />
                            )}
                        </div>
                    </button>
                </nav>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="py-4 border-t border-gray-100/50">
                        <div className="flex flex-col gap-1.5">
                            {navigationLinks.map((link, index) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(link.href, e)}
                                    className={
                                        link.isButton
                                            ? "group px-5 py-3.5 [background-color:var(--color-red)] text-white text-base font-semibold rounded-xl hover:[background-color:var(--color-red-dark)] transition-all duration-300 text-center shadow-lg shadow-[var(--color-red)]/25 hover:shadow-xl hover:shadow-[var(--color-red)]/40 active:scale-[0.98]"
                                            : `px-5 py-3 text-base font-medium transition-all duration-300 rounded-xl relative ${
                                                activeSection === link.href.replace('#', '')
                                                    ? '[color:var(--color-navy)] bg-gray-50 font-semibold'
                                                    : '[color:var(--color-gray-700)] hover:[color:var(--color-navy)] hover:bg-gray-50 active:bg-gray-100'
                                            }`
                                    }
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation: isMobileMenuOpen ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                                    }}
                                >
                                    {link.isButton ? (
                                        <span className="flex items-center justify-center gap-2">
                                            {link.label}
                                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    ) : (
                                        <>
                                            {link.label}
                                            {activeSection === link.href.replace('#', '') && (
                                                <span className="absolute left-5 right-5 bottom-2 h-0.5 [background:linear-gradient(90deg,var(--color-gold)_0%,var(--color-red)_100%)] rounded-full"></span>
                                            )}
                                        </>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavigationLink;