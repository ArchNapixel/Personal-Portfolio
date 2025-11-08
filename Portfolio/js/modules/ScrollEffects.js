/**
 * Scroll Effects Module
 * Handles scroll-based animations and effects
 */
import DOMUtils from '../utils/DOMUtils.js';

const ScrollEffectsModule = (() => {
    const heroAccent = DOMUtils.select('.hero-accent');

    /**
     * Initialize parallax effect
     */
    const initParallax = () => {
        if (!heroAccent) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            DOMUtils.setStyles(heroAccent, {
                transform: `translateY(${scrollY * 0.5}px)`
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    };

    /**
     * Initialize element reveal on scroll
     */
    const initScrollReveal = () => {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    DOMUtils.setStyles(entry.target, {
                        opacity: '1',
                        transform: 'translateY(0)'
                    });
                    revealOnScroll.unobserve(entry.target);
                }
            });
        }, revealOptions);

        // Apply reveal animation
        const elements = DOMUtils.selectAll('.project-card, .skill-item, .contact-card');
        elements.forEach(element => {
            DOMUtils.setStyles(element, {
                opacity: '0',
                transform: 'translateY(30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease'
            });
            revealOnScroll.observe(element);
        });
    };

    // Public API
    return {
        init() {
            initParallax();
            initScrollReveal();
        }
    };
})();

export default ScrollEffectsModule;
