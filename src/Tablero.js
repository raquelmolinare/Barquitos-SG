import * as THREE from '../libs/three.module.js';

import {Box} from './Box.js';
export class Tablero extends THREE.Object3D {
    constructor() {
        super();
        this.FILAS = 10;
        this.COLS = 8;
        this.raycaster = new THREE.Raycaster();
        let matCuadrados = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});

        let lado = 5;

        this.tablero = new THREE.Object3D();

        //Se guardan las cajas
        this.boxesArray = [];


        for (let i = 0; i < this.FILAS; i++) {
            for (let j = 0; j < this.COLS; j++) {

                //let posicion = new THREE.Vector3(lado / 2 + lado * j, lado / 2 + lado * i, 0);

                //let box = new THREE.Mesh(new THREE.BoxGeometry(lado, lado, lado), matCuadrados);
                let box = new Box(lado,lado / 2 + lado * j,lado / 2 + lado * i,0 );

                //situarlo en el tablero
                //box.position.set(posicion.x, posicion.y, posicion.z);
                //let geo = new THREE.EdgesGeometry(box.geometry);
                //let mat = new THREE.LineBasicMaterial({color: 0x0001110, linewidth: 6});
                //let wireframe = new THREE.LineSegments(geo, mat);
                //wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
                //box.add(wireframe);

                this.boxesArray.push(box);
                this.tablero.add(box);

            }
        }

        this.add(this.tablero);

    }
    /*
    onDocumentMouseDown(e) {
        alert('hola')
    }
    /**
     * It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
     * @param event - Mouse information
     * @return A Vector2 with the normalized mouse position
     */
    getMouse(event) {
        var mouse = new THREE.Vector2 ();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
        return mouse;
    }

    update() {

    }
}