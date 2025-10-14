import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Tracks which elements have entered the viewport and should be animated
 */
const useScrollAnimation = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            if (elementId) {
              // Use functional update to ensure we're working with the latest state
              setAnimatedElements((prev) => {
                const newSet = new Set(prev);
                newSet.add(elementId);
                return newSet;
              });
              
              // Once animated, stop observing this element to improve performance
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { 
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '50px' // Start animation slightly before element enters viewport
      }
    );

    // Find all elements with data-animate-id attribute
    const elements = document.querySelectorAll('[data-animate-id]');
    
    // Observe each element
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return animatedElements;
};

export default useScrollAnimation;