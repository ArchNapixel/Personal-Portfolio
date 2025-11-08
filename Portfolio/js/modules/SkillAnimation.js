/**
 * Skill Animation Module
 * Handles skill progress bar animations
 */
import DOMUtils from '../utils/DOMUtils.js';

const SkillAnimationModule = (() => {
    /**
     * Initialize skill bars animation on scroll
     */
    const initSkillBarsAnimation = () => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    DOMUtils.setStyles(entry.target, {
                        animation: 'progressBar 1.5s ease-out forwards'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all skill progress bars
        const skillBars = DOMUtils.selectAll('.skill-progress');
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };

    // Public API
    return {
        init() {
            initSkillBarsAnimation();
        }
    };
})();

export default SkillAnimationModule;
