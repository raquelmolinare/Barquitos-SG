import * as THREE from '../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import {GLTFLoader} from '../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../libs/tween.esm.js'
import {Object3D} from "../libs/three.module.js";

class BarcoPescador extends THREE.Object3D {
    constructor() {
        super();

        var that = this;

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        var nodo = new Object3D();
        var modelo;
        materialLoader.load( '../models/barco_pescador/materiales.mtl',
            function (materials){
                objectLoader.setMaterials(materials);
                objectLoader.load( '../models/barco_pescador/modelo.obj',
                    function(object){
                        modelo = object;
                        nodo.add(modelo);
                    },null,null
                );
            },
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded materials' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened materials' );

            },


        );

        nodo.traverseVisible (function (that) {
            if (that.material) {
                that.material.wireframe = true;
            }
        });


        //Posicionar
        //nodo.position.y= 1;
        //nodo.position.y+= 0.1;
        //nodo.scale.set(0.3,0.4,0.22);
        //nodo.position.x= -0.4;

        nodo.scale.set(0.215,0.315,0.22);
        nodo.position.x=-0.25;
        nodo.position.y+=0.9;

        this.add(nodo);

    }

    update() {

    }

}

export { BarcoPescador }
