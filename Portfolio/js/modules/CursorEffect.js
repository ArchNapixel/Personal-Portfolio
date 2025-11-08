/**
 * Cursor Effect Module
 * Creates a custom cursor with trailing effect
 */
const CursorModule = (() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const cursor = document.createElement('div');
    const cursorTrail = document.createElement('div');

    /**
     * Initialize cursor elements
     */
    const initCursorElements = () => {
        cursor.className = 'custom-cursor';
        cursorTrail.className = 'cursor-trail';

        document.body.appendChild(cursor);
        document.body.appendChild(cursorTrail);

        // Hide default cursor
        document.body.style.cursor = 'none';
    };

    /**
     * Update cursor position
     */
    const updateCursor = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    };

    /**
     * Animate trail effect
     */
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.2;
        trailY += (mouseY - trailY) * 0.2;

        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(animateTrail);
    };

    /**
     * Handle element interactions
     */
    const initInteractions = () => {
        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorTrail.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .project-card, .contact-card, .skill-item'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorTrail.classList.add('cursor-trail-hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorTrail.classList.remove('cursor-trail-hover');
            });
        });
    };

    // Public API
    return {
        init() {
            initCursorElements();
            initInteractions();
            animateTrail();
        }
    };
})();
