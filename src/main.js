import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
let camera;
if (window.innerWidth <= 768) {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
} else {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
}
camera.position.set(10.5, 12.6,-13.3);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up Draco and GLTF Loaders
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
loader.setDRACOLoader(dracoLoader);

// Lighting setup
const light = new THREE.RectAreaLight(0xffffff, 0.25, 10, 20);
light.position.set(0, 2.85, 0);
light.lookAt(0, 3, 0);
const spotLight = new THREE.SpotLight(0xffffff, 9);
spotLight.position.set(0, 2.85, 0);
spotLight.angle = Math.PI; 
spotLight.castShadow = true;

scene.add(light, spotLight);

// Load environment model
loader.load(
    'assets/models/EnvironmentNoLFS.glb',
    (gltf) => {
        scene.add(gltf.scene);

        gsap.to(camera.position, {
            duration: 5,    // Duration of the zoom effect
            x: 1.5,           // Target x position
            y: 1.8,           // Target y position
            z: -1.9,          // Target z position
            ease: "power2.out", // Ease for smoothness
            onUpdate: () => camera.lookAt(0, 1, 0) // Keep camera focused on the target
        });
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

// initialize orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-1,.7,1);

// smooth controls
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.update();

// bound orbit controls
if (window.innerWidth <= 768) {
    controls.minPolarAngle = Math.PI / 2.7;
    controls.maxPolarAngle = Math.PI / 2.19;
    controls.minAzimuthAngle = Math.PI / 1.3;
    controls.maxAzimuthAngle = -Math.PI * 1.2;
} else {
    controls.minPolarAngle = Math.PI / 2.9;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = Math.PI / 1.3;
    controls.maxAzimuthAngle = -Math.PI * 1.2;
}
// Animation loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
