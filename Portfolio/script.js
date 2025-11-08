/**
 * Portfolio Main Script - All features in one file
 * Features: Custom Cursor, 3D CPU Model with RGB Lights
 */

// ==================== CUSTOM CURSOR ==================== 
const initCursorEffect = () => {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let isMoving = false;

    const cursor = document.createElement('div');
    const cursorTrail = document.createElement('div');

    cursor.className = 'custom-cursor';
    cursorTrail.className = 'cursor-trail';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);

    document.body.style.cursor = 'none';

    // Ensure cursor is visible initially
    cursor.style.opacity = '1';
    cursorTrail.style.opacity = '0.9';

    const updateCursor = (e) => {
        isMoving = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    };

    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.3;
        trailY += (mouseY - trailY) * 0.3;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    };

    // Mouse move listener
    document.addEventListener('mousemove', updateCursor, true);

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '0.9';
    }, true);

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    }, true);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .contact-card, .skill-item, .cta-button'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorTrail.classList.add('cursor-trail-hover');
        }, true);
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorTrail.classList.remove('cursor-trail-hover');
        }, true);
    });

    console.log('✓ Cursor effect initialized');
    animateTrail();
};

// ==================== 3D HERO BACKGROUND ==================== 
const init3DHero = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !window.THREE) return;

    let scene, camera, renderer;
    let deskSetup, rgbLights = [];
    let isLongPressing = false;
    let longPressTimer = null;
    let targetRotationY = 0;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(0x000000, 150, 1000);

    // Camera setup - positioned better for desk view
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 2.5);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // Create detailed desk setup
    const createDeskSetup = () => {
        const setupGroup = new THREE.Group();

        // ==================== DESK TABLE ====================
        const deskGeometry = new THREE.BoxGeometry(2.5, 0.05, 1.2);
        const deskMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0x0a0a0a,
            shininess: 30
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.y = -0.8;
        desk.receiveShadow = true;
        setupGroup.add(desk);

        // ==================== LEFT SPEAKER ====================
        const speakerGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
        const speakerMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0x0a0a0a,
            shininess: 50
        });
        const leftSpeaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
        leftSpeaker.position.set(-0.8, -0.4, -0.3);
        leftSpeaker.castShadow = true;
        leftSpeaker.receiveShadow = true;
        setupGroup.add(leftSpeaker);

        // Right speaker
        const rightSpeaker = new THREE.Mesh(speakerGeometry, speakerMaterial);
        rightSpeaker.position.set(0.8, -0.4, -0.3);
        rightSpeaker.castShadow = true;
        rightSpeaker.receiveShadow = true;
        setupGroup.add(rightSpeaker);

        // ==================== MONITOR ====================
        // Monitor stand base
        const standGeometry = new THREE.BoxGeometry(0.12, 0.15, 0.15);
        const standMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a2a,
            emissive: 0x0a0a0a,
            shininess: 50
        });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(0, -0.4, 0.1);
        stand.castShadow = true;
        stand.receiveShadow = true;
        setupGroup.add(stand);

        // Monitor arm/bracket
        const armGeometry = new THREE.BoxGeometry(0.06, 0.5, 0.08);
        const armMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a2a,
            emissive: 0x0a0a0a,
            shininess: 60
        });
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        arm.position.set(0, 0.1, 0.1);
        arm.castShadow = true;
        arm.receiveShadow = true;
        setupGroup.add(arm);

        // Monitor bezel/frame
        const bezelGeometry = new THREE.BoxGeometry(0.95, 0.6, 0.08);
        const bezelMaterial = new THREE.MeshPhongMaterial({
            color: 0x1f1f1f,
            emissive: 0x0a0a0a,
            shininess: 45
        });
        const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
        bezel.position.set(0, 0.6, 0.15);
        bezel.castShadow = true;
        bezel.receiveShadow = true;
        setupGroup.add(bezel);

        // Monitor screen (display with glow)
        const screenGeometry = new THREE.BoxGeometry(0.9, 0.55, 0.02);
        const screenMaterial = new THREE.MeshPhongMaterial({
            color: 0x0a0a0a,
            emissive: 0x1a2a3a,
            shininess: 100
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.6, 0.2);
        screen.castShadow = true;
        screen.receiveShadow = true;
        setupGroup.add(screen);

        // ==================== PC CASE (RIGHT SIDE) ====================
        const caseGeometry = new THREE.BoxGeometry(0.35, 0.75, 0.4);
        const caseMaterial = new THREE.MeshPhongMaterial({
            color: 0x0f0f0f,
            emissive: 0x0a0a0a,
            shininess: 70
        });
        const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
        pcCase.position.set(0.75, -0.2, -0.2);
        pcCase.castShadow = true;
        pcCase.receiveShadow = true;
        setupGroup.add(pcCase);

        // Case front panel
        const panelGeometry = new THREE.BoxGeometry(0.33, 0.6, 0.02);
        const panelMaterial = new THREE.MeshPhongMaterial({
            color: 0x050505,
            emissive: 0x0a0a0a,
            shininess: 80
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(0.75, -0.1, 0.2);
        panel.castShadow = true;
        panel.receiveShadow = true;
        setupGroup.add(panel);

        // ==================== KEYBOARD ====================
        const keyboardGeometry = new THREE.BoxGeometry(0.5, 0.04, 0.2);
        const keyboardMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0x0a0a0a,
            shininess: 40
        });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.set(-0.2, -0.5, 0.3);
        keyboard.rotation.x = 0.1;
        keyboard.castShadow = true;
        keyboard.receiveShadow = true;
        setupGroup.add(keyboard);

        // ==================== MOUSE PAD ====================
        const mousepadGeometry = new THREE.BoxGeometry(0.25, 0.01, 0.2);
        const mousepadMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a2a,
            emissive: 0x0f0f0f,
            shininess: 20
        });
        const mousepad = new THREE.Mesh(mousepadGeometry, mousepadMaterial);
        mousepad.position.set(0.35, -0.48, 0.25);
        mousepad.receiveShadow = true;
        setupGroup.add(mousepad);

        // ==================== MOUSE ====================
        const mouseGeometry = new THREE.BoxGeometry(0.08, 0.04, 0.12);
        const mouseMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0x0a0a0a,
            shininess: 60
        });
        const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
        mouse.position.set(0.3, -0.46, 0.35);
        mouse.rotation.z = 0.2;
        mouse.castShadow = true;
        mouse.receiveShadow = true;
        setupGroup.add(mouse);

        // ==================== NEUTRAL WHITE LIGHT ON PC CASE ====================
        // Add subtle white light for depth instead of RGB
        const light = new THREE.PointLight(0xaaaaaa, 0.4, 3);
        light.position.set(0.75, 0, 0.22);
        light.castShadow = true;
        setupGroup.add(light);

        deskSetup = setupGroup;
        scene.add(deskSetup);
    };

    // Setup Lighting
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xcccccc, 0.5);
    directionalLight.position.set(3, 5, 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    createDeskSetup();

    // Long press handling
    canvas.addEventListener('mousedown', () => {
        isLongPressing = true;
        longPressTimer = setTimeout(() => {
            isLongPressing = true;
        }, 300);
    });

    canvas.addEventListener('mouseup', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
        isLongPressing = false;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isLongPressing) {
            const x = (e.clientX / width) * 2 - 1;
            targetRotationY = x * Math.PI * 0.5;
        }
    });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        if (deskSetup) {
            // Smooth rotation toward target
            deskSetup.rotation.y += (targetRotationY - deskSetup.rotation.y) * 0.1;
        }

        renderer.render(scene, camera);
    };

    // Mouse movement handler
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        const newWidth = canvas.clientWidth;
        const newHeight = canvas.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    animate();
};

// ==================== SMOOTH SCROLLING ==================== 
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ==================== HAMBURGER MENU ==================== 
const initHamburgerMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
};

// ==================== NAVBAR SCROLL EFFECT ==================== 
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, var(--secondary-bg), transparent)';
        }
    });
};

// ==================== SKILL BARS ANIMATION ==================== 
const initSkillAnimation = () => {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressBar 1.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });
};

// ==================== SCROLL REVEAL ANIMATION ==================== 
const initScrollReveal = () => {
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.project-card, .skill-item, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealOnScroll.observe(element);
    });
};

// ==================== PARALLAX EFFECT ==================== 
const initParallax = () => {
    const hero = document.querySelector('.hero-accent');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }
};

// ==================== ACTIVE NAV LINK ==================== 
const initActiveNavLink = () => {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--accent-gold)';
            } else {
                link.style.color = 'var(--text-secondary)';
            }
        });
    });
};

// ==================== INITIALIZE ALL ==================== 
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initializing...');
    initCursorEffect();
    console.log('✓ Cursor initialized');
    initSmoothScroll();
    initHamburgerMenu();
    initNavbarScroll();
    initSkillAnimation();
    initScrollReveal();
    initParallax();
    initActiveNavLink();
    
    // Initialize 3D scene after a small delay to ensure Three.js is loaded
    setTimeout(() => {
        init3DHero();
        console.log('✓ 3D Hero initialized');
    }, 500);
    
    console.log('✅ Portfolio fully loaded!');
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== CONSOLE MESSAGE ==================== 
console.log('%cWelcome to Arch Angelo Nino Coles Portfolio!', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%cDesigned & Built with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 12px;');
console.log('%cFeatures: Custom Cursor, 3D CPU Model with RGB Lights', 'color: #00ff00; font-size: 10px;');
