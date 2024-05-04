let scene, camera, renderer, controls;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding; // Ensures correct gamma handling
    document.body.appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // PLY model loader
    const plyLoader = new THREE.PLYLoader();

    // Load all point clouds from the 'models' folder
    loadPointCloudsFromFolder(plyLoader);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // Update controls in the animation loop
}

function loadPointCloudsFromFolder(loader) {
    // Fetch list of files in the 'models' folder
    fetch('models')
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                // Load each point cloud
                loader.load(`models/${file}`, function (geometry) {
                    const material = new THREE.PointsMaterial({
                        size: 0.00001,
                        vertexColors: THREE.VertexColors,
                    });
                
                    const points = new THREE.Points(geometry, material);
                    //points.scale.set(0.0025, 0.0025, 0.0025);
                    scene.add(points);
                });    
            });
        })
        .catch(error => console.error('Error loading point clouds:', error));
}
