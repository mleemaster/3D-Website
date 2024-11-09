import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(1.5,1.8,-1.9);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up Draco and GLTF Loaders
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
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
    '/assets/models/EnvironmentFinal5.glb',
    (gltf) => {
        scene.add(gltf.scene);
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
controls.minPolarAngle = Math.PI / 2.9;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = Math.PI / 1.3;
controls.maxAzimuthAngle = -Math.PI * 1.2;

// Animation loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
