import * as THREE from '../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import {GLTFLoader} from '../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../libs/tween.esm.js'
import {Object3D} from "../libs/three.module.js";

class Submarino extends THREE.Object3D {
    constructor() {
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
        nodo.scale.set(0.007,0.007,0.0055);
        nodo.rotation.y=Math.PI/2;
        nodo.position.x=0.1;
        nodo.position.y=0.1;

        this.add(nodo);

        /*
        var that = this;

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        var modelo;

        materialLoader.load( '../models/submarino2/materiales.mtl',
            function (materials){
                objectLoader.setMaterials(materials);
                objectLoader.load( '../models/submarino2/modelo.obj',
                    function(object){
                        modelo = object;

                        that.add(modelo);
                    },
                    null,
                    null
                );
            },
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        );*/

    }

    update() {

    }

}

export { Submarino }
