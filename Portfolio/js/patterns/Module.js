/**
 * Module Pattern Implementation
 * Provides encapsulation and privacy for code
 */
const ModulePattern = {
    /**
     * Create a module with private and public methods
     * @param {Function} fn - Function that returns public API
     * @returns {Object} Module instance with public methods
     */
    create(fn) {
        const module = {};
        const publicAPI = fn(module);
        return Object.assign(module, publicAPI);
    },

    /**
     * Create a namespaced module
     * @param {string} namespace - Module namespace
     * @param {Function} fn - Module definition
     * @returns {Object} Namespaced module
     */
    namespace(namespace, fn) {
        const parts = namespace.split('.');
        let obj = {};
        let current = obj;

        for (let i = 0; i < parts.length - 1; i++) {
            current[parts[i]] = {};
            current = current[parts[i]];
        }

        current[parts[parts.length - 1]] = fn();
        return obj;
    }
};

export default ModulePattern;
