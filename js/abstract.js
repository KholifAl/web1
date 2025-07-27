const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(light);

    // GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load('model.glb', function (gltf) {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 0, 0); // Adjust as needed
    }, undefined, function (error) {
      console.error(error);
    });

    // Camera Position
    camera.position.z = 5;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();