import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { addStar, addSphere, addBridge } from './src/geometry.js';

const MAX_STAR = 200; 
let isArrowPressed = false;
let isMoving = false;

document.addEventListener('keydown', (event) => {
  if (event.key.startsWith('Arrow')) {
      isArrowPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key.startsWith('Arrow')) {
      isArrowPressed = false;
  }
});

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

let spherePosition = new THREE.Vector3();
let sphereVelocity = new THREE.Vector3();
let speedDisplay = document.getElementById('speed-value');
let xSpeedDisplay = document.getElementById("x-speed");
let zSpeedDisplay = document.getElementById("z-speed");
let pressed = document.getElementById("arrowPressed");
let moving = document.getElementById("moving");

function animate() {
	requestAnimationFrame( animate );

  spherePosition.add(sphereVelocity);
  sphere.position.copy(spherePosition);

  cameraTarget.copy(sphere.position);
  cameraTarget.add(cameraOffset);
  camera.position.lerp(cameraTarget, 0.1); // Smoothly interpolate camera position
  camera.lookAt(sphere.position); // Look at sphere

  controls.update;
  speedDisplay.textContent = sphereVelocity.length().toFixed(2);
  xSpeedDisplay.textContent = sphereVelocity.x.toFixed(2);
  zSpeedDisplay.textContent = sphereVelocity.z.toFixed(2);
  pressed.textContent = isArrowPressed ? "true" : "false";
  moving.textContent = isMoving ? "true" : "false";
  
  // Moviendose hacia la derecha
  if (!isArrowPressed && sphereVelocity.x > 0 && isMoving){
    sphereVelocity.x -= 0.001;
    if (Math.abs(sphereVelocity.x) < 0.005 ){
      sphereVelocity.x = 0;
      if (Math.abs(sphereVelocity.z) == 0){
        isMoving = false;
      }
    }
  }
  // Moviendose hacia atras
  if (!isArrowPressed && sphereVelocity.z > 0 && isMoving){
    sphereVelocity.z -= 0.001;
    if (Math.abs(sphereVelocity.z) < 0.005) {
      sphereVelocity.z = 0;
      if (Math.abs(sphereVelocity.x) == 0){
        isMoving = false;
      }
    }
  }
  // Moviendose hacia la izquierda
  if (!isArrowPressed && sphereVelocity.x < 0 && isMoving){
    sphereVelocity.x += 0.001;
    if(Math.abs(sphereVelocity.x) < 0.005){
      sphereVelocity.x = 0;
      if (Math.abs(sphereVelocity.z) == 0){
        isMoving = false;
      }
    }
  }
  if (!isArrowPressed && sphereVelocity.z < 0 && isMoving){
    sphereVelocity.z += 0.001;
    if(Math.abs(sphereVelocity.z) < 0.005){
      sphereVelocity.z = 0;
      if (Math.abs(sphereVelocity.x) == 0){
        isMoving = false;
      }
    }
  }



  

	renderer.render( scene, camera );
}
animate();

// Define speed decay outside of the event handlers
const speedDecay = 0.95;

// Function to handle arrow key presses
function handleKeyPress(event) {
  const acceleration = 0.01; // Acceleration value
  const maxSpeed = 0.5; // Maximum speed
  isArrowPressed = true;
  isMoving = true;
  
  switch (event.key) {
      case 'ArrowUp':
          sphereVelocity.z -= acceleration;
          break;
      case 'ArrowDown':
          sphereVelocity.z += acceleration;
          break;
      case 'ArrowLeft':
          sphereVelocity.x -= acceleration;
          break;
      case 'ArrowRight':
          sphereVelocity.x += acceleration;
          break;
  }

  // Limit velocity to maximum speed
  sphereVelocity.clampLength(-maxSpeed, maxSpeed);
}

// Function to handle arrow key releases
function handleKeyRelease(event) {
  const threshold = 0.05; // Adjust this threshold value as needed

  switch (event.key) {
      case 'ArrowUp':
          if (Math.abs(sphereVelocity.z) < threshold) {
              sphereVelocity.z = 0;
          } else {
              sphereVelocity.z *= speedDecay;
          }
          break;
      case 'ArrowDown':
          if (Math.abs(sphereVelocity.z) < threshold) {
              sphereVelocity.z = 0;
          } else {
              sphereVelocity.z *= speedDecay;
          }
          break;
      case 'ArrowLeft':
          if (Math.abs(sphereVelocity.x) < threshold) {
              sphereVelocity.x = 0;
          } else {
              sphereVelocity.x *= speedDecay;
          }
          break;
      case 'ArrowRight':
          if (Math.abs(sphereVelocity.x) < threshold) {
              sphereVelocity.x = 0;
          } else {
              sphereVelocity.x *= speedDecay;
          }
          break;
  }

  // If velocity magnitude is very small, set velocity to zero
  if (sphereVelocity.lengthSq() < threshold * threshold) {
      sphereVelocity.set(0, 0, 0);
  }
  isArrowPressed = false;
}

// Add event listeners for key presses and releases
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);