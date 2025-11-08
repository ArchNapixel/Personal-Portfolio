/**
 * Application Manager
 * Central application initializer using Singleton pattern
 */
import Singleton from '../patterns/Singleton.js';
import NavigationModule from './Navigation.js';
import ScrollEffectsModule from './ScrollEffects.js';
import SkillAnimationModule from './SkillAnimation.js';

class AppManager extends Singleton {
    constructor() {
        super();
        this.modules = [];
        this.isInitialized = false;
    }

    /**
     * Register a module
     * @param {Object} module - Module to register
     */
    registerModule(module) {
        if (module && typeof module.init === 'function') {
            this.modules.push(module);
        }
    }

    /**
     * Initialize all registered modules
     */
    initializeModules() {
        if (this.isInitialized) {
            console.warn('AppManager already initialized');
            return;
        }

        this.modules.forEach(module => {
            try {
                module.init();
            } catch (error) {
                console.error('Error initializing module:', error);
            }
        });

        this.isInitialized = true;
        this.logStartup();
    }

    /**
     * Log startup message to console
     */
    logStartup() {
        console.log('%cWelcome to Arch Angelo Nino Coles Portfolio!', 
            'color: #d4af37; font-size: 16px; font-weight: bold;');
        console.log('%cDesigned & Built with HTML, CSS, and JavaScript', 
            'color: #8b5cf6; font-size: 12px;');
        console.log('%cArchitecture: Modular Design with Design Patterns', 
            'color: #00ff00; font-size: 10px;');
    }

    /**
     * Get app status
     * @returns {Object} Current app status
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            modulesCount: this.modules.length,
            modules: this.modules.map(m => m.constructor.name)
        };
    }
}

export default AppManager;
