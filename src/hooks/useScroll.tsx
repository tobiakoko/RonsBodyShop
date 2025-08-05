import { useEffect, useState } from 'react';

// Animation hook for scroll-triggered animations
const useScrollAnimation = () => {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            if (elementId) {
              setAnimatedElements(prev => new Set(prev).add(elementId));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '120px' }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return animatedElements;
};

export default useScrollAnimation;