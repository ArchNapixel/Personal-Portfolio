/**
 * Navigation Module
 * Handles all navigation-related functionality
 */
import DOMUtils from '../utils/DOMUtils.js';
import AnimationUtils from '../utils/AnimationUtils.js';

const NavigationModule = (() => {
    // Private variables
    const hamburger = DOMUtils.select('.hamburger');
    const navLinks = DOMUtils.select('.nav-links');
    const navbar = DOMUtils.select('.navbar');

    /**
     * Initialize mobile menu
     */
    const initMobileMenu = () => {
        if (!hamburger) return;

        DOMUtils.on(hamburger, 'click', () => {
            DOMUtils.toggleClass(navLinks, 'active');
            DOMUtils.toggleClass(hamburger, 'active');
        });

        // Close menu when a link is clicked
        const links = DOMUtils.selectAll('.nav-links a');
        links.forEach(link => {
            DOMUtils.on(link, 'click', () => {
                DOMUtils.removeClass(navLinks, 'active');
                DOMUtils.removeClass(hamburger, 'active');
            });
        });
    };

    /**
     * Initialize smooth scrolling
     */
    const initSmoothScroll = () => {
        const anchors = DOMUtils.selectAll('a[href^="#"]');
        anchors.forEach(anchor => {
            DOMUtils.on(anchor, 'click', (e) => {
                e.preventDefault();
                const target = DOMUtils.select(anchor.getAttribute('href'));
                if (target) {
                    AnimationUtils.smoothScroll(target);
                }
            });
        });
    };

    /**
     * Initialize navbar scroll effect
     */
    const initNavbarScroll = () => {
        const throttledScroll = AnimationUtils.throttle(() => {
            if (window.scrollY > 50) {
                DOMUtils.setStyles(navbar, {
                    background: 'rgba(10, 10, 10, 0.95)',
                    backdropFilter: 'blur(10px)'
                });
            } else {
                DOMUtils.setStyles(navbar, {
                    background: 'linear-gradient(to bottom, var(--secondary-bg), transparent)'
                });
            }
        }, 100);

        window.addEventListener('scroll', throttledScroll);
    };

    /**
     * Initialize active nav link highlighting
     */
    const initActiveNavLink = () => {
        const throttledScroll = AnimationUtils.throttle(() => {
            const sections = DOMUtils.selectAll('section[id]');
            const navLinks = DOMUtils.selectAll('.nav-links a');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                DOMUtils.removeClass(link, 'active');
                if (link.getAttribute('href').slice(1) === current) {
                    DOMUtils.addClass(link, 'active');
                    DOMUtils.setStyles(link, { color: 'var(--accent-gold)' });
                } else {
                    DOMUtils.setStyles(link, { color: 'var(--text-secondary)' });
                }
            });
        }, 100);

        window.addEventListener('scroll', throttledScroll);
    };

    // Public API
    return {
        init() {
            initMobileMenu();
            initSmoothScroll();
            initNavbarScroll();
            initActiveNavLink();
        }
    };
})();

export default NavigationModule;
