import * as THREE from '../libs/three.module.js';


export class FormaOvalada extends THREE.Object3D {
    constructor(pos, width, height, depth, radius, material){
        super();

        let settings = {
            depth: depth,
            bevelEnabled: true,
            bevelSegments: 5,
            steps: 1,
            bevelSize: radius,
            bevelThickness: 0,
            curveSegments: 4
        };

        let shape = new THREE.Shape();

        shape.absarc( 0, 0, 0, -Math.PI / 2, -Math.PI, true );
        shape.absarc( 0, height -  radius * 2, 0, Math.PI, Math.PI / 2, true );
        shape.absarc( width - radius * 2, height -  radius * 2, 0, Math.PI / 2, 0, true );
        shape.absarc( width - radius * 2, 0, 0, 0, -Math.PI / 2, true );

        let geometry = new THREE.ExtrudeBufferGeometry(shape, settings);

        geometry.translate(pos.x, pos.y, pos.z);
        this.roundBox = new THREE.Mesh( geometry, material) ;
        this.roundBox.userData = this;
        this.add(this.roundBox);
    }
}