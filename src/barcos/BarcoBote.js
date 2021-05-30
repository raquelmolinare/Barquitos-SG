
import * as THREE from '../../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'
import {GLTFLoader} from '../../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../../libs/tween.esm.js'
import {Object3D} from "../../libs/three.module.js";

class BarcoBote extends THREE.Object3D {
    constructor(lado) {
        super();

        var that = this;

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        this.nodo = new Object3D();
        var modelo;

        materialLoader.load( '../models/barco_bote/materiales.mtl',
            function (materials){
                objectLoader.setMaterials(materials);
                objectLoader.load( '../models/barco_bote/modelo.obj',
                    function(object){
                        modelo = object;
                        that.nodo.add(modelo);
                    },
                    null,
                    null
                );
            },null,null
        );

        //Posicionar
        this.nodo.scale.set(0.24 * lado,0.3 * lado,0.3 * lado);
        this.nodo.rotation.x = Math.PI / 2;
        this.nodo.position.x = lado / 2 + 2.3;
        this.nodo.position.z = lado / 2;
        this.nodo.position.y += lado / 2;
        this.lado = lado;
        this.add(this.nodo);
    }

    hundir() {
        this.nodo.position.z -= this.lado / 2;
    }


}

export { BarcoBote }
