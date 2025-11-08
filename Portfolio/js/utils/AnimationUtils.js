/**
 * Animation Utilities
 * Helper functions for animations and transitions
 */
const AnimationUtils = {
    /**
     * Request animation frame wrapper
     * @param {Function} callback - Animation callback
     * @returns {number} Animation frame ID
     */
    requestFrame(callback) {
        return requestAnimationFrame(callback);
    },

    /**
     * Cancel animation frame
     * @param {number} id - Animation frame ID
     */
    cancelFrame(id) {
        cancelAnimationFrame(id);
    },

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} wait - Wait time in ms
     * @returns {Function} Throttled function
     */
    throttle(func, wait) {
        let timeout = null;
        let previous = 0;

        return function executedFunction(...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Smooth scroll to element
     * @param {Element} element - Target element
     * @param {number} duration - Duration in ms
     */
    smoothScroll(element, duration = 800) {
        if (!element) return;

        const targetPosition = element.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                this.requestFrame(animation);
            }
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        this.requestFrame(animation);
    }
};

export default AnimationUtils;
