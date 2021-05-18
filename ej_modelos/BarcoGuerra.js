
import * as THREE from '../libs/three.module.js'

//Imports para los modelos
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import {GLTFLoader} from '../libs/GLTFLoader.js'

//Imports para la animacion
import * as TWEEN from '../libs/tween.esm.js'
import {Object3D} from "../libs/three.module.js";

class BarcoGuerra extends THREE.Object3D {
  constructor() {
    super();

      var that = this;

      var materialLoader = new MTLLoader();
      var objectLoader = new OBJLoader();

      var nodo = new Object3D();
      var modelo;
      materialLoader.load( '../models/barco_guerra/materiales.mtl',
          function (materials){
              objectLoader.setMaterials(materials);
              objectLoader.load( '../models/barco_guerra/modelo.obj',
                  function(object){
                      modelo = object;
                      nodo.add(modelo);
                  },
                  null,
                  null
              );
          },null,null
      );

      //Posicionar
      nodo.scale.set(0.6,0.47,0.47);
      nodo.rotation.y=-Math.PI/2;
      nodo.position.x=-0.6;
      nodo.position.y=0.6;
      nodo.position.z=0.1;


      this.add(nodo);

  }
  
  update() {

  }

}

export { BarcoGuerra }
