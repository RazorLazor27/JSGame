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