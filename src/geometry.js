import * as THREE from 'three';


export function addStar() {
    const geometry = new THREE.SphereGeometry( 0.25, 24, 24 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
    const star = new THREE.Mesh( geometry, material );

    const[x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );

    star.position.set(x, y ,z);
    return star;
}

export function addSphere(){
    const geometry = new THREE.SphereGeometry( 3, 24, 24 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xfcc22d } ); 
    const sphere = new THREE.Mesh( geometry, material );

    return sphere
}

export function addBridge(){
    const geometry = new THREE.BoxGeometry(1000 ,1 ,500);
    const material = new THREE.MeshStandardMaterial( { color: 0x5f5f5f} );
    const bridge = new THREE.Mesh( geometry, material);

    return bridge;
}