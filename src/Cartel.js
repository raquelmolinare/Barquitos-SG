import * as THREE from '../libs/three.module.js';
import {FormaOvalada} from "./FormaOvalada.js";
import {Materiales} from "./Materiales.js";
import {Texto} from "./Texto.js";

export class Cartel extends THREE.Object3D {
    constructor(pos, sizeX, sizeY, text, textPosition ){
        super();

        this._over = false;

        this.pos = pos;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.text = text;

        this.cartelObj = new THREE.Object3D();

        let positionExterna = new THREE.Vector3(0,0,0);
        let formaExterna  = new FormaOvalada(positionExterna, sizeX, sizeY, sizeY/5, 0.5, Materiales.default);

        formaExterna.userData = this;

        let positionInterna = new THREE.Vector3(0.25, 0.25,0.125);
        this.formaInterna = new FormaOvalada(positionInterna, sizeX-0.5, sizeY-0.5, sizeY/5, 0.5, Materiales.Matnegro);

        this.formaInterna.userData = this;

        this.fontURL = '../fonts/helve.json';
        this.textoText = new Texto(textPosition, text, sizeY/2, Materiales.blanco, this.fontURL);

        this.textoText.userData = this;

        this.cartelObj.add(formaExterna);
        this.cartelObj.add(this.formaInterna);
        this.cartelObj.add(this.textoText);

        this.cartelObj.scale.set(0.2,0.2,0.2);
        this.cartelObj.position.set(pos.x,pos.y,pos.z);
        this.cartelObj.visible = true;
        this.add(this.cartelObj);
    }

    over() {
        //this.textoText.children[0].material  = Materiales.Matnegro;

        // cambio material a todos los hijos...
        this.textoText.traverse( child => {
            if ( child.material ) child.material = Materiales.Matnegro;
        });

        //this.formaInterna.children[0].material = Materiales.blanco;
        this.formaInterna.traverse( child => {
            if ( child.material ) child.material = Materiales.blanco;
        });

        this._over = true;
    }

    overOut() {
        //this.textoText.children[0].material  =  Materiales.blanco;
        this.textoText.traverse( child => {
            if ( child.material ) child.material =  Materiales.blanco;
        });

        //this.formaInterna.children[0].material = Materiales.Matnegro;
        this.formaInterna.traverse( child => {
            if ( child.material ) child.material =  Materiales.Matnegro;
        });
        this._over = false;
    }


}