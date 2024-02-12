import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { addStar, addSphere } from './src/geometry.js';

const MAX_STAR = 200; 
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const camera = new THREE.OrthographicCamera( width / - 24, width / 24, height / 24, height / - 24, 1, 1000 );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xfcc22d } );
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

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



for (let i = 0; i < MAX_STAR; i++){
  const star = addStar();
  background.push(star);
}

background.forEach( object => { scene.add( object ); })








function animate() {
	requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  cameraTarget.copy(sphere.position);
  cameraTarget.add(cameraOffset);
  camera.position.lerp(cameraTarget, 0.1); // Smoothly interpolate camera position
  camera.lookAt(sphere.position); // Look at sphere
  controls.update;

	renderer.render( scene, camera );
}
animate();