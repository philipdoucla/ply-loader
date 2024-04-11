let scene, camera, renderer, mesh;

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);


    // PLY model loader
    const plyLoader = new THREE.PLYLoader();
    plyLoader.load('model.ply', function (geometry) {
        // if (geometry.attributes.color) {
        //     const colors = geometry.attributes.color;
        //     for (let i = 0; i < colors.count; i++) {
        //         colors.setXYZ(i, colors.getX(i) / 255, colors.getY(i) / 255, colors.getZ(i) / 255);
        //     }
        // }

        const material = new THREE.PointsMaterial({
            size: 0.00001,
            vertexColors: THREE.VertexColors,
        });
    
        const points = new THREE.Points(geometry, material);
        points.scale.set(0.0025, 0.0025, 0.0025)
        scene.add(points);
    });    

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

    // Add rotation to the model for better visibility
    if (mesh) {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
