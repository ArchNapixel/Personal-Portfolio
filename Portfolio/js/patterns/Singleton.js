/**
 * Singleton Pattern Implementation
 * Ensures a class has only one instance and provides a global point of access
 */
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        return this;
    }

    /**
     * Static method to get singleton instance
     * @returns {Singleton} The singleton instance
     */
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

export default Singleton;
