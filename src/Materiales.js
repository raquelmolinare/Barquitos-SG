import * as THREE from "../libs/three.module.js";

export const Materiales = {
    default   : new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7}),
    seleccion : new THREE.MeshBasicMaterial({transparent: false, color: 0xCF0000, opacity: 1.0}),
    over      : new THREE.MeshBasicMaterial({transparent: false, color: 0xffff00, opacity: 1.0}),
    correcto  : new THREE.MeshBasicMaterial({transparent: false, color: 0x00ff00, opacity: 1.0}),
    incorrecto: new THREE.MeshBasicMaterial({transparent: false, color: 0xff0000, opacity: 1.0}),
    alrededor : new THREE.MeshBasicMaterial({transparent: true, color: 0xff0000, opacity: 0.3}),

    blanco    : new THREE.MeshBasicMaterial({transparent: false, color: 0xffffff, opacity: 1.0}),
    negro     : new THREE.MeshBasicMaterial({transparent: false, color: 0x000000, opacity: 1.0}),
    rojo     : new THREE.MeshBasicMaterial({transparent: false, color: 0xff0000, opacity: 1.0}),
    verde     : new THREE.MeshBasicMaterial({transparent: false, color: 0x00ff00, opacity: 1.0}),
    azul     : new THREE.MeshBasicMaterial({transparent: false, color: 0x0000ff, opacity: 1.0}),
    arcoiris : new THREE.MeshNormalMaterial({transparent: false, opacity: 1.0}),


}