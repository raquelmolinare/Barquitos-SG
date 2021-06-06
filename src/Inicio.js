
import * as THREE from '../libs/three.module.js';
import {Titulo} from "./Titulo.js";
import {Cartel} from "./Cartel.js";
import { Materiales } from "./Materiales.js";

export class Inicio extends THREE.Object3D {
    constructor() {
        super();

        //TITULO
        let tamLetra = 15.0;
        let posTitulo = new THREE.Vector3(-tamLetra*5,10.0,0);
        this.titulo = new Titulo(posTitulo,tamLetra);

        let xBoton = 100.0;
        let yBoton = 30.0;

        let posBoton = new THREE.Vector3(0,-20.0,50.0);
        let posTextBoton = new THREE.Vector3(0-xBoton/3, yBoton/6,4.0);
        this.botonPlay = new Cartel(posBoton, xBoton,yBoton, 'START', yBoton/2, posTextBoton, Materiales.arcoiris, Materiales.negro, Materiales.blanco );

        this.add(this.titulo);
        this.add(this.botonPlay);
    }
    update() {
        this.titulo.update();
    }
}