import * as THREE from '../libs/three.module.js';
import {Texto} from "./Texto.js";
import {Materiales} from "./Materiales.js";
import {Object3D} from "../libs/three.module.js";
import * as TWEEN from '../libs/tween.esm.js';

export class Titulo extends THREE.Object3D {
    constructor(pos, tamLetra) {
        super();

        this.title = new Object3D();

        this.fontURL = '../fonts/helve.json';

        let positionB = new THREE.Vector3(pos.x, pos.y, pos.z);
        let positionA = new THREE.Vector3(pos.x + (1 * tamLetra) + (tamLetra/10), pos.y, pos.z);
        let positionR = new THREE.Vector3(pos.x + (2 * tamLetra) + (tamLetra/3), pos.y, pos.z);
        let positionQ = new THREE.Vector3(pos.x + (3 * tamLetra)+ (tamLetra/2.5), pos.y, pos.z);
        let positionU = new THREE.Vector3(pos.x + (4 * tamLetra)+ (tamLetra/1.5), pos.y, pos.z);
        let positionI = new THREE.Vector3(pos.x + (5 * tamLetra)+ (tamLetra/1.2), pos.y, pos.z);
        let positionT = new THREE.Vector3(pos.x + (6 * tamLetra)+ (tamLetra/2), pos.y, pos.z);
        let positionO = new THREE.Vector3(pos.x + (7 * tamLetra)+ (tamLetra/1.7), pos.y, pos.z);
        let positionS = new THREE.Vector3(pos.x + (8 * tamLetra)+ (tamLetra/1.2), pos.y, pos.z);

        this.B = new Texto(positionB, 'B', tamLetra, Materiales.negro, this.fontURL);
        this.A = new Texto(positionA, 'A', tamLetra, Materiales.negro, this.fontURL);
        this.R = new Texto(positionR, 'R', tamLetra, Materiales.negro, this.fontURL);
        this.Q = new Texto(positionQ, 'Q', tamLetra, Materiales.negro, this.fontURL);
        this.U = new Texto(positionU, 'U', tamLetra, Materiales.negro, this.fontURL);
        this.I = new Texto(positionI, 'I', tamLetra, Materiales.negro, this.fontURL);
        this.T = new Texto(positionT, 'T', tamLetra, Materiales.negro, this.fontURL);
        this.O = new Texto(positionO, 'O', tamLetra, Materiales.negro, this.fontURL);
        this.S = new Texto(positionS, 'S', tamLetra, Materiales.negro, this.fontURL);


        this.title.add(this.B)
        this.title.add(this.A)
        this.title.add(this.R)
        this.title.add(this.Q)
        this.title.add(this.U)
        this.title.add(this.I)
        this.title.add(this.T)
        this.title.add(this.O)
        this.title.add(this.S)

        this.add(this.title);

        this.animar(tamLetra);
    }

    animar(tamLetra) {

        let origen = {p: 0};
        let destino = {p: -tamLetra/2};
        let that = this;
        let animation = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .onUpdate(() => {
                that.B.position.y = origen.p;
                that.R.position.y = origen.p;
                that.U.position.y = origen.p;
                that.S.position.y = origen.p;
                that.T.position.y = origen.p;
            })
            .repeat(Infinity)
            .yoyo(true);

        //Animaciones con TWEEN
        let origen2 = {p: -tamLetra/2};
        let destino2 = {p: 0};

        let animation2 = new TWEEN.Tween(origen2)
            .to(destino2, 1000) //1 segundo
            .onUpdate(() => {
                that.A.position.y = origen2.p;
                that.Q.position.y = origen2.p;
                that.I.position.y = origen2.p;
                that.O.position.y = origen2.p;
            })
            .repeat(Infinity)
            .yoyo(true);


        animation.start();
        animation2.start();

    }

    update() {
        TWEEN.update();
    }
}