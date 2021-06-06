import * as THREE from '../libs/three.module.js';
import {FormaOvalada} from "./FormaOvalada.js";
import {Materiales} from "./Materiales.js";
import {Texto} from "./Texto.js";

export class Cartel extends THREE.Object3D {
    constructor(pos, sizeX, sizeY, text, textSize, textPosition, materialExterior, materialInterior, materialTexto ){
        super();

        this._over = false;

        //this.pos = pos;
        //this.sizeX = sizeX;
        //this.sizeY = sizeY;
        //this.text = text;

        this.materialExterior = materialExterior;
        this.materialInterior= materialInterior;
        this.materialTexto = materialTexto;

        this.cartelObj = new THREE.Object3D();

        let positionExterna = new THREE.Vector3(-sizeX/2,0,0);
        console.log("cartel x :"+sizeX);
        let formaExterna  = new FormaOvalada(positionExterna, sizeX, sizeY, sizeY/5, 1.5, materialExterior);

        formaExterna.userData = this;

        let positionInterna = new THREE.Vector3(-sizeX/2+2.5, 2.5,0.5);
        this.formaInterna = new FormaOvalada(positionInterna, sizeX-5, sizeY-5, sizeY/5, 1.5, materialInterior);

        this.formaInterna.userData = this;

        this.fontURL = '../fonts/helve.json';
        //let textPosition = new THREE.Vector3(-sizeX/3, textSize/3,4.0);
        this.textoText = new Texto(textPosition, text, textSize,materialTexto, this.fontURL);

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
            if ( child.material ) child.material = this.materialInterior;
        });

        //this.formaInterna.children[0].material = Materiales.blanco;
        this.formaInterna.traverse( child => {
            if ( child.material ) child.material =  this.materialTexto;
        });

        this._over = true;
    }

    overOut() {
        //this.textoText.children[0].material  =  Materiales.blanco;
        this.textoText.traverse( child => {
            if ( child.material ) child.material =   this.materialTexto;
        });

        //this.formaInterna.children[0].material = Materiales.Matnegro;
        this.formaInterna.traverse( child => {
            if ( child.material ) child.material =   this.materialInterior;
        });
        this._over = false;
    }


}