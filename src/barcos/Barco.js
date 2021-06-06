
import * as THREE from '../../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../../libs/MTLLoader.js'
import { OBJLoader } from '../../libs/OBJLoader.js'
import {GLTFLoader} from '../../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../../libs/tween.esm.js'
import {Object3D} from "../../libs/three.module.js";
import {Materiales} from "../Materiales.js";

class Barco extends THREE.Object3D {
    constructor(tam,lado) {
        super();


        var that = this;

        var materialLoader = new MTLLoader();
        this.objectLoader = new OBJLoader();

        this.nodo = new Object3D();
        var modelo;
        materialLoader.load( '../models/yate/materiales.mtl',
            function (materials){
                that.objectLoader.setMaterials(materials);
                that.objectLoader.load( '../models/yate/modelo.obj',
                    function(object){
                        /*object.traverse( child => {

                            if ( child.material ) child.material =new THREE.MeshNormalMaterial({transparent: true, opacity: 1.0})

                        });*/
                        modelo = object;
                        that.nodo.add(modelo);
                    },null,null
                );
            },null,null
        );

        this.nodo.rotation.x = Math.PI / 2;

        switch (tam){
            case 2:
                this.nodo.scale.set(1.5,2.5,3.0);
                this.nodo.position.x = 4.2;
                break;
            case 3:
                this.nodo.scale.set(2.3,2.5,3.0);
                this.nodo.position.x = 6.2;
                break;
            case 4:
                this.nodo.scale.set(3.2,2.5,3.0);
                this.nodo.position.x = 8.5;
                break;
            case 5:
                this.nodo.scale.set(3.9,3.5,3.0);
                this.nodo.position.x = 10.5;
                break;
            case 6:
                this.nodo.scale.set(4.7,3.5,3.0);
                this.nodo.position.x = 12.5;
                break;
        }

        this.nodo.position.z = 1.5+lado/2;
        this.nodo.position.y = 0.1+lado/2;

        this.add(this.nodo);
    }

    hundir() {
        //this.position.z -= this.lado / 2;

        let that = this;

        this.objectLoader.load( '../models/yate/modelo.obj',  ( object ) => {
            object.traverse( child => {

                if ( child.material ) child.material =  new THREE.MeshNormalMaterial({transparent: false, opacity: 1.0})

            });
            that.nodo.remove(that.modelo);
            that.nodo.add( object );
        }, null, null );
    }

}

export { Barco }
