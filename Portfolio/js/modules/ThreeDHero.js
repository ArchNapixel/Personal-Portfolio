/**
 * 3D Hero Background Module
 * Creates a rotating 3D CPU with RGB lighting effects
 */
const ThreeDHeroModule = (() => {
    let scene, camera, renderer;
    let cpu;
    let mouseX = 0, mouseY = 0;

    /**
     * Initialize Three.js scene
     */
    const initScene = () => {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // Scene setup
        scene = new THREE.Scene();
        scene.background = null;
        scene.fog = new THREE.Fog(0x000000, 100, 1000);

        // Camera setup
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 0, 2.5);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    };

    /**
     * Create 3D CPU model
     */
    const createCPU = () => {
        const cpuGroup = new THREE.Group();

        // CPU Base (Main body)
        const baseGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.6);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0x111111,
            shininess: 50
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.castShadow = true;
        base.receiveShadow = true;
        cpuGroup.add(base);

        // CPU Cooler (Tower style)
        const coolerGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32);
        const coolerMaterial = new THREE.MeshPhongMaterial({
            color: 0x0a0a0a,
            emissive: 0x0a0a0a
        });
        const cooler = new THREE.Mesh(coolerGeometry, coolerMaterial);
        cooler.position.y = 0.5;
        cooler.castShadow = true;
        cooler.receiveShadow = true;
        cpuGroup.add(cooler);

        // CPU Die (the processor chip on top)
        const dieGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
        const dieMaterial = new THREE.MeshPhongMaterial({
            color: 0x2d2d2d,
            emissive: 0x1a1a1a,
            shininess: 100
        });
        const die = new THREE.Mesh(dieGeometry, dieMaterial);
        die.position.y = 0.7;
        die.castShadow = true;
        die.receiveShadow = true;
        cpuGroup.add(die);

        // Add RGB LED lights
        addRGBLights(cpuGroup);

        cpu = cpuGroup;
        scene.add(cpu);
    };

    /**
     * Add subtle white lighting to CPU
     */
    const addRGBLights = (cpuGroup) => {
        // Add subtle neutral light for depth
        const light = new THREE.PointLight(0xaaaaaa, 0.4, 2);
        light.position.set(0, 0.4, 0.25);
        light.castShadow = true;
        cpuGroup.add(light);
    };

    /**
     * Setup lighting
     */
    const setupLighting = () => {
        // Ambient light for overall illumination - neutral gray
        const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
        scene.add(ambientLight);

        // Directional light for shadows - neutral white
        const directionalLight = new THREE.DirectionalLight(0xcccccc, 0.6);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        scene.add(directionalLight);
    };

    /**
     * Animation loop
     */
    const animate = () => {
        requestAnimationFrame(animate);

        if (!cpu) return;

        // Rotate CPU based on mouse position
        cpu.rotation.x = mouseY * 0.5;
        cpu.rotation.y = mouseX * 0.5;

        // Auto-rotate slowly
        cpu.rotation.z += 0.001;

        renderer.render(scene, camera);
    };

    /**
     * Handle window resize
     */
    const handleResize = () => {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    // Public API
    return {
        init() {
            initScene();
            createCPU();
            setupLighting();
            animate();

            // Event listeners
            document.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('resize', handleResize);
        }
    };
})();


