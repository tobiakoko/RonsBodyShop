import React, { useState, useEffect, useRef } from 'react';
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

    const navigationLinks: NavigationLink[] = [
        { id: '1', label: 'Home', href: '#home' },
        { id: '2', label: 'About', href: '#about' },
        { id: '3', label: 'Services', href: '#services' },
        { id: '4', label: 'Contact', href: '#contact', isButton: true },
    ];

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
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header 
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/80 backdrop-blur-md shadow-sm' 
                    : 'bg-white'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a 
                        href="#home" 
                        className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors duration-200"
                        onClick={(e) => handleNavClick('#home', e)}
                    >
                        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="6" fill="currentColor"/>
                            <path d="M12 10h8M12 16h8M12 22h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="font-semibold text-lg">Ron's Auto</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigationLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={(e) => handleNavClick(link.href, e)}
                                className={
                                    link.isButton
                                        ? "px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        : `px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                                            activeSection === link.href.replace('#', '')
                                                ? 'text-gray-900'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`
                                }
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </nav>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(link.href, e)}
                                    className={
                                        link.isButton
                                            ? "px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 text-center"
                                            : `px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-md ${
                                                activeSection === link.href.replace('#', '')
                                                    ? 'text-gray-900 bg-gray-50'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`
                                    }
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default NavigationLink;