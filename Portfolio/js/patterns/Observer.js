/**
 * Observer Pattern Implementation
 * Allows objects to subscribe to events and react when they occur
 */
class Observer {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Function to execute when event fires
     * @returns {Function} Unsubscribe function
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);

        // Return unsubscribe function
        return () => {
            this.events[eventName] = this.events[eventName].filter(
                cb => cb !== callback
            );
        };
    }

    /**
     * Emit an event
     * @param {string} eventName - Name of the event
     * @param {any} data - Data to pass to subscribers
     */
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }

    /**
     * Subscribe to event only once
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Function to execute
     */
    once(eventName, callback) {
        const unsubscribe = this.on(eventName, (data) => {
            callback(data);
            unsubscribe();
        });
    }

    /**
     * Remove all subscribers from an event
     * @param {string} eventName - Name of the event
     */
    clear(eventName) {
        if (eventName) {
            delete this.events[eventName];
        } else {
            this.events = {};
        }
    }
}

export default Observer;
