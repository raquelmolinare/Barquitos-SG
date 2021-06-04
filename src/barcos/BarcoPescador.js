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
        this.objectLoader = new OBJLoader();

        this.nodo = new Object3D();
        this.modelo;
        materialLoader.load( '../models/barco_pescador/materiales.mtl',
            function (materials){
                that.objectLoader.setMaterials(materials);
                that.objectLoader.load( '../models/barco_pescador/modelo.obj',
                    function(object){
                        that.modelo = object;
                        that.nodo.add(that.modelo);
                       /* nodo.traverse( child => {

                            if ( child.material ) child.material =new THREE.MeshNormalMaterial({transparent: true, opacity: 1.0})

                        } );*/
                    },null,null
                );
            },
            null,
            null


        );

        //Posicionar
        //nodo.position.y= 1;
        //nodo.position.y+= 0.1;
        //nodo.scale.set(0.3,0.4,0.22);
        //nodo.position.x= -0.4;

        this.nodo.scale.set(0.215*lado,0.315*lado,0.22*lado);
        this.nodo.rotation.x = Math.PI / 2;
        //nodo.position.x =- 0.25;
        this.nodo.position.y = lado/2;
        this.nodo.position.z = 0.9 * lado;
        this.nodo.position.x = lado + 1.2;
        this.lado = lado;
        this.add(this.nodo);

    }

    hundir() {
        //this.position.z -= this.lado / 2;
        var that = this;

        this.objectLoader.load( '../models/barco_pescador/modelo.obj',  ( object ) => {
            object.traverse( child => {

                if ( child.material ) child.material =new THREE.MeshNormalMaterial({transparent: true, opacity: 1.0})

            });
            that.nodo.remove(that.modelo);
            that.nodo.add( object );
        }, null, null );
    }

}

export { BarcoPescador }
