/**
 * DOM Utilities
 * Helper functions for DOM manipulation
 */
const DOMUtils = {
    /**
     * Select single element
     * @param {string} selector - CSS selector
     * @returns {Element|null} DOM element
     */
    select(selector) {
        return document.querySelector(selector);
    },

    /**
     * Select multiple elements
     * @param {string} selector - CSS selector
     * @returns {NodeList} Collection of DOM elements
     */
    selectAll(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Add event listener
     * @param {Element} element - Target element
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    on(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        }
    },

    /**
     * Remove event listener
     * @param {Element} element - Target element
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    off(element, event, handler) {
        if (element) {
            element.removeEventListener(event, handler);
        }
    },

    /**
     * Add class to element
     * @param {Element} element - Target element
     * @param {string} className - Class name
     */
    addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element
     * @param {Element} element - Target element
     * @param {string} className - Class name
     */
    removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     * @param {Element} element - Target element
     * @param {string} className - Class name
     */
    toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Check if element has class
     * @param {Element} element - Target element
     * @param {string} className - Class name
     * @returns {boolean} True if has class
     */
    hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    },

    /**
     * Set multiple styles
     * @param {Element} element - Target element
     * @param {Object} styles - Styles object
     */
    setStyles(element, styles) {
        if (element) {
            Object.assign(element.style, styles);
        }
    },

    /**
     * Get element offset
     * @param {Element} element - Target element
     * @returns {Object} Object with top and left offset
     */
    getOffset(element) {
        if (!element) return { top: 0, left: 0 };
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }
};

export default DOMUtils;
