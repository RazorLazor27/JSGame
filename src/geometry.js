import * as THREE from 'three';


export function addStar() {
    const geometry = new THREE.SphereGeometry( 0.25, 24, 24 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
    const star = new THREE.Mesh( geometry, material );

    const[x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );

    star.position.set(x, y ,z);
    return star;
}

export function addEnemies(){
    const geometry = new THREE.SphereGeometry(3, 24, 24 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const enem = new THREE.Mesh( geometry, material );

    let x = THREE.MathUtils.randFloatSpread( 50 );
    let z = THREE.MathUtils.randFloatSpread( 200 );
    
    if(z > 0) {
        z = -z;
    }

    enem.position.set ( x, 0, z );
    return enem;
}

export function addSphere(){
    const sphereTexture = new THREE.TextureLoader().load("moon.jpg")

    const geometry = new THREE.SphereGeometry( 3, 24, 24 ); 
    const material = new THREE.MeshBasicMaterial( { map: sphereTexture } ); 
    const sphere = new THREE.Mesh( geometry, material );

    

    return sphere
}

export function addBridge(){
    const geometry = new THREE.BoxGeometry(50 ,1 ,200);
    const material = new THREE.MeshStandardMaterial( { color: 0x5f5f5f} );
    const bridge = new THREE.Mesh( geometry, material);

    bridge.position.z -= 50;

    return bridge;
}

