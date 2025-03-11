


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750 / 500, 0.1, 1000);

const threedeeDiv = document.getElementById('threedee');

const renderer = new THREE.WebGLRenderer();


renderer.setSize(750, 500);

threedeeDiv.appendChild(renderer.domElement)

;


const ambientLight = new THREE.AmbientLight('rgb(255, 249, 249)', 2); 
scene.add(ambientLight);

const ambientLightTwo = new THREE.AmbientLight('rgb(255, 252, 252)', 12); 
scene.add(ambientLightTwo);



const loader = new THREE.GLTFLoader();

let model;
    

loader.load('3Dmodel/untitled.glb', function ( gltf ) {

	model = gltf.scene;
	scene.add(model);
	

	model.position.set(0, 0, 0);

	model.scale.set(0.4, 0.4, 0.4)

	camera.position.set(-2, 2, 7);

	

	model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ 
                color: 0xffffff,  
                metalness: 1,
                        roughness: 0.0,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.0,
                        reflectivity: 1.0,
                        opacity: 0.8,
                        emissive: 'rgb(200, 200, 255)',
                        emissiveIntensity: 0.2,
            });
        }
    });

	  // Add environment map for reflections
	  const cubeTextureLoader = new THREE.CubeTextureLoader();
	  const envMap = cubeTextureLoader.load([
		  'px.jpg', 'nx.jpg',
		  'py.jpg', 'ny.jpg',
		  'pz.jpg', 'nz.jpg'
	  ]);
	  scene.environment = envMap;


	animate();

}, undefined, function ( error ) {

	console.error( error );

});

function animate() {
    requestAnimationFrame(animate);

	if (model) {
        model.rotation.y += 0.01; 
    }

    renderer.render(scene, camera);
}

