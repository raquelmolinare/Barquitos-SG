import * as THREE from '../../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'
import {GLTFLoader} from '../../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../../libs/tween.esm.js'
import {Object3D} from "../../libs/three.module.js";

class Submarino extends THREE.Object3D {
    constructor(lado) {
        super();


        var that = this;
        var loader = new GLTFLoader();

        var nodo = new Object3D();

        // Load a glTF resource
        loader.load(
            // resource URL
            '../models/submarino/CUPIC_SUBMARINE.gltf',
            // called when the resource is loaded
            function ( gltf ) {

              nodo.add( gltf.scene );

              gltf.animations; // Array<THREE.AnimationClip>
              gltf.scene; // THREE.Group
              gltf.scenes; // Array<THREE.Group>
              gltf.cameras; // Array<THREE.Camera>
              gltf.asset; // Object

            },null,null
        );

        //Posicionar
        nodo.scale.set(0.007 * lado,0.007* lado,0.0055*lado);
        nodo.rotation.y = Math.PI/2;
        nodo.rotation.x = Math.PI/2;
        nodo.position.x = lado + 5;
        nodo.position.y = lado / 2;
        nodo.position.z = lado - 1;
        this.lado = lado;
        this.add(nodo);
    }

    hundir() {
        this.position.z -= this.lado / 2;
    }

}

export { Submarino }
