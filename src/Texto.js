import * as THREE from '../libs/three.module.js';

export class Texto extends THREE.Object3D {
    constructor(pos, text, size, material, fontURL) {
        super();

        let that = this;
        let loader = new THREE.FontLoader();

        loader.load(fontURL, (font) => {

            let geometry = new THREE.TextGeometry( text, {
                font: font,
                size: size,
                height: size/5,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: size/5,
                bevelSize: size/20,
                bevelOffset: 0,
                bevelSegments: 2
            });

            let mesh = new THREE.Mesh(geometry, material);
            mesh.userData = that;
            mesh.position.set(pos.x, pos.y, pos.z);

            that.add(mesh);
        });
    }
}