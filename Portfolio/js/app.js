/**
 * Main Application Initialization Script
 * Uses ES6 modules and design patterns for clean, maintainable code
 */

import AppManager from './modules/AppManager.js';
import NavigationModule from './modules/Navigation.js';
import ScrollEffectsModule from './modules/ScrollEffects.js';
import SkillAnimationModule from './modules/SkillAnimation.js';
import CursorModule from './modules/CursorEffect.js';
import ThreeDHeroModule from './modules/ThreeDHero.js';

/**
 * Initialize application
 * Runs when DOM is ready
 */
const initializeApp = () => {
    // Get singleton instance of AppManager
    const app = AppManager.getInstance();

    // Register modules
    app.registerModule(CursorModule);
    app.registerModule(ThreeDHeroModule);
    app.registerModule(NavigationModule);
    app.registerModule(ScrollEffectsModule);
    app.registerModule(SkillAnimationModule);

    // Initialize all modules
    app.initializeModules();
};

/**
 * Page load event
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/**
 * DOM Content Loaded event
 */
document.addEventListener('DOMContentLoaded', initializeApp);
