import * as THREE from '../../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'
import {GLTFLoader} from '../../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../../libs/tween.esm.js'
import {Object3D} from "../../libs/three.module.js";

class BarcoPescador extends THREE.Object3D {
    constructor(lado) {
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
            null,
            null


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

        nodo.scale.set(0.215*lado,0.315*lado,0.22*lado);
        nodo.rotation.x = Math.PI / 2;
        //nodo.position.x =- 0.25;
        nodo.position.y = lado/2;
        nodo.position.z = 0.9 * lado;
        nodo.position.x = lado + 1.2;
        this.lado = lado;
        this.add(nodo);

    }

    hundir() {
        this.position.z -= this.lado / 2;
    }

}

export { BarcoPescador }
