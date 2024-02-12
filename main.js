import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { addStar, addSphere, addBridge } from './src/geometry.js';

const MAX_STAR = 200; 


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);

scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);

const background = [];

const sphere = addSphere();
background.push(sphere);


const cameraDistance = 12; // Distance from sphere
const cameraOffset = new THREE.Vector3(0, 10, cameraDistance); // Offset from sphere
const cameraTarget = new THREE.Vector3(); // Camera target (sphere position)
const cameraLookAt = new THREE.Vector3(0, 0, 0); // Look at origin
camera.position.copy(cameraOffset); // Set initial camera position
camera.lookAt(cameraLookAt); // Look at origin


const bridge = addBridge();
bridge.position.y -= 3.5;
background.push(bridge);



for (let i = 0; i < MAX_STAR; i++){
  const star = addStar();
  background.push(star);
}

background.forEach( object => { scene.add( object ); })








function animate() {
	requestAnimationFrame( animate );

  cameraTarget.copy(sphere.position);
  cameraTarget.add(cameraOffset);
  camera.position.lerp(cameraTarget, 0.1); // Smoothly interpolate camera position
  camera.lookAt(sphere.position); // Look at sphere

  controls.update;

	renderer.render( scene, camera );
}
animate();