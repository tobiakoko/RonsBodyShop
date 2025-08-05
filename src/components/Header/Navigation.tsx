import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';


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
    const [showMore, setShowMore] = useState(false);
    const [visibleItems, setVisibleItems] = useState<NavigationLink[]>([]);
    const [hiddenItems, setHiddenItems] = useState<NavigationLink[]>([]);
    const navRef = useRef<HTMLElement>(null);

    const navigationLinks: NavigationLink[] = [
        { id: '1', label: 'Home', href: '#home' },
        { id: '2', label: 'About', href: '#about' },
        { id: '3', label: 'Services', href: '#services' },
        { id: '4', label: 'Contact', href: '#contact', isButton: true },
    ];

    // Smooth scroll function
    const smoothScrollTo = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            const navHeight = navRef.current?.offsetHeight || 80;
            const targetPosition = element.offsetTop - navHeight - 10;
                
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Handle navigation click
    const handleNavClick = (href: string, e: React.MouseEvent) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        
        if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
        smoothScrollTo(targetId);
        }
        
        // Update URL without page reload
        window.history.pushState(null, '', href);
        closeMobileMenu();
    };

    // Scroll spy functionality
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
        
        // Scroll spy logic
        const navHeight = navRef.current?.offsetHeight || 80;
        const fromTop = window.scrollY + navHeight + 30;
        
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigationLinks]);

    // Responsive navigation items management
    useEffect(() => {
        const handleResize = () => {
        const nav = navRef.current;
        if (!nav || window.innerWidth < 1024) {
            setVisibleItems(navigationLinks);
            setHiddenItems([]);
            return;
        }

        // Simple responsive logic - hide items if needed
        const availableWidth = nav.offsetWidth - 200; // Reserve space for logo and more button
        const itemWidth = 120; // Approximate width per item
        const maxVisibleItems = Math.floor(availableWidth / itemWidth);

        if (maxVisibleItems < navigationLinks.length - 1) { // -1 for contact button
            const contactButton = navigationLinks.find(link => link.isButton);
            const regularLinks = navigationLinks.filter(link => !link.isButton);
            
            const visible = regularLinks.slice(0, maxVisibleItems - 1);
            const hidden = regularLinks.slice(maxVisibleItems - 1);
            
            if (contactButton) visible.push(contactButton);
            
            setVisibleItems(visible);
            setHiddenItems(hidden);
            setShowMore(hidden.length > 0);
        } else {
            setVisibleItems(navigationLinks);
            setHiddenItems([]);
            setShowMore(false);
        }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [navigationLinks]);

    // Close mobile menu when clicking outside or on a link
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
            ? 'bg-white/95 backdrop-blur-sm shadow-md' 
            : 'bg-white'
        }`}
        >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand/Logo */}
            <a 
                href="#home" 
                className="font-poppins font-semibold text-xl lg:text-2xl text-gray-900 hover:text-blue-600 transition-colors duration-200"
                onClick={(e) => handleNavClick('#home', e)}
            >
                Ron's Body Shop
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
                {visibleItems.map((link) => (
                <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={
                    link.isButton
                        ? "font-poppins font-medium px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                        : `font-poppins font-medium relative group transition-colors duration-200 ${
                            activeSection === link.href.replace('#', '')
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:text-blue-600'
                        }`
                    }
                >
                    {link.label}
                    {!link.isButton && (
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                        activeSection === link.href.replace('#', '')
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}></span>
                    )}
                </a>
                ))}
                
                {/* More dropdown for hidden items */}
                {showMore && hiddenItems.length > 0 && (
                <div className="relative">
                    <button
                    className="font-poppins font-medium text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition-colors duration-200"
                    onClick={() => setShowMore(!showMore)}
                    >
                    <span>More</span>
                    <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {hiddenItems.map((link) => (
                        <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(link.href, e)}
                        className="block px-4 py-2 font-poppins font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                        >
                        {link.label}
                        </a>
                    ))}
                    </div>
                </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                type="button"
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
                {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
                ) : (
                <Menu className="w-6 h-6" />
                )}
            </button>
            </nav>

            {/* Mobile Navigation Menu */}
            <div 
            className={`lg:hidden transition-all duration-300 ease-in-out ${
                isMobileMenuOpen 
                ? 'max-h-screen opacity-100' 
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
            >
            <div className="py-4 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                {navigationLinks.map((link) => (
                    <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={
                        link.isButton
                        ? "font-poppins font-medium text-center py-3 px-4 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                        : `font-poppins font-medium py-3 px-4 rounded-md transition-all duration-200 ${
                            activeSection === link.href.replace('#', '')
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`
                    }
                    >
                    {link.label}
                    </a>
                ))}
                </div>
            </div>
            </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={closeMobileMenu}
            />
        )}
        </header>
    );
}

export default NavigationLink;