
import * as THREE from '../../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'
import {GLTFLoader} from '../../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../../libs/tween.esm.js'
import {Object3D} from "../../libs/three.module.js";

class BarcoPirata extends THREE.Object3D {
    constructor(lado) {
        super();

        var that = this;

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        var nodo = new Object3D();
        var modelo;
        materialLoader.load( '../models/barco_pirata/materiales.mtl',
            function (materials){
                objectLoader.setMaterials(materials);
                objectLoader.load( '../models/barco_pirata/modelo.obj',
                    function(object){
                        modelo = object;
                        nodo.add(modelo);
                    },
                    null,
                    null
                );
            },
            null,
            null
        );

        //Posicionar
        nodo.scale.set(0.12* lado,0.12* lado,0.12*lado);
        nodo.rotation.x = Math.PI / 2;
        nodo.position.x = -lado/4;
        nodo.position.z = 1.45;
        nodo.position.y = -lado + 0.5;
        this.lado = lado;
        this.add(nodo);

    }

    hundir() {
        this.position.z -= this.lado / 2;
    }


}

export { BarcoPirata }
