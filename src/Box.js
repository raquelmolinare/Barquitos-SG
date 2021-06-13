import * as THREE from '../libs/three.module.js';
import {sound} from './MyScene.js';
import { Materiales } from "./Materiales.js";

export class Box extends THREE.Object3D {
    constructor(lado, pointX, pointY, pointZ, f,c){
        super();

        //Geometria
        this.boxGeometry = new THREE.BoxGeometry(lado,lado,lado);

        //Varibles necesarias
        this.tieneBarco=false;
        this.tieneBarcoAlrededor=false;
        this.fila=f;
        this.columna=c;
        this.disparado = false;
        this.barcoContenido = null; //integer
        this.matDefinitivo =  Materiales.default; // para evitar el reset

        this.boxMesh = new THREE.Mesh(this.boxGeometry, Materiales.default);
        this.boxMesh.position.x = pointX;
        this.boxMesh.position.y = pointY;
        this.boxMesh.position.z = pointZ;

        let geo = new THREE.EdgesGeometry(this.boxMesh.geometry);
        let mat = new THREE.LineBasicMaterial({color: 0x0001110, linewidth: 6});
        let wireframe = new THREE.LineSegments(geo, mat);
        wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
        this.boxMesh.add(wireframe);

        this.add(this.boxMesh);
    }

    getPosition() {
        return this.boxMesh.position;
    }

    /**
     * Dispara a una caja, es invocado desde el tablero original (no fake)
     * @returns si tiene barco para saber si ha sido tocado el barco.
     */
    shoot() {
        if(!this.disparado) {
            this.boxMesh.material = Materiales.negro;
            this.boxMesh.material.opacity = Materiales.negro.opacity;
            this.boxMesh.material.transparent = Materiales.negro.transparent;
            this.disparado = true;
        }
        return this.tieneBarco;
    }

    /**
     * (invocado en el tablero espejo)
     * @returns devuelve si se ha ejecutado el interior del método.
     * Útil para cambiar de turno.
     */
    shootTocado() {
        if(!this.disparado) {
            const audioLoader = new THREE.AudioLoader();
            audioLoader.load('../sounds/disparo.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setVolume(0.5);
                sound.play();
            });
            this.boxMesh.material = Materiales.correcto;
            this.boxMesh.material.transparent = Materiales.correcto.transparent;
            this.boxMesh.material.opacity = Materiales.correcto.opacity;
            this.disparado = true;
            this.matDefinitivo = Materiales.correcto;
            this.matDefinitivo.opacity = Materiales.correcto.opacity;
            this.matDefinitivo.transparent = Materiales.correcto.transparent;
            return true;
        }
        return false;
    }
    /**
     *
     * @returns devuelve si se ha ejecutado el interior del método.
     */
    shootAgua() {
        if(!this.disparado) {
            const audioLoader = new THREE.AudioLoader();
            audioLoader.load('../sounds/agua.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setVolume(0.5);
                sound.play();
            });
            this.boxMesh.material = Materiales.incorrecto;
            this.boxMesh.material.transparent = Materiales.incorrecto.transparent;
            this.boxMesh.material.opacity = Materiales.incorrecto.opacity;
            this.disparado = true;
            this.matDefinitivo = Materiales.incorrecto;
            this.matDefinitivo.opacity = Materiales.incorrecto.opacity;
            this.matDefinitivo.transparent = Materiales.incorrecto.transparent;
            return true
        }
        return false;
    }
/*
    rotateBox(event){
        this.boxMesh.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
    }*/

    /**
     *
     */
    resetMaterial() {
        this.boxMesh.material = this.matDefinitivo;
        this.boxMesh.material.opacity = this.matDefinitivo.opacity;
        this.boxMesh.material.transparent = this.matDefinitivo.transparent;
    }

    /**
     * Cambia los materiales al definitivo para indicar que hay barco
     * y almacena el barco que posee la casilla. NO POSICIONA DIRECTAMENTE EL BARCO
     * @param barco tamaño del barco (num. casillas que ocupa).
     */
    posicionarBarco(barco) {
        this.boxMesh.material = Materiales.seleccion;
        this.boxMesh.material.opacity = Materiales.seleccion.opacity;
        this.boxMesh.material.transparent =  Materiales.seleccion.transparent;
        this.tieneBarco = true;
        this.barcoContenido = barco;
        this.matDefinitivo = Materiales.seleccion;
        this.matDefinitivo.opacity = Materiales.seleccion.opacity;
        this.matDefinitivo.transparent = Materiales.seleccion.transparent;
    }

    deselect() {
        this.boxMesh.material = Materiales.default;
        this.boxMesh.material.opacity = Materiales.default.opacity;
        this.tieneBarco = false; // desde que hay material definitivo no hace falta
        this.boxMesh.material.transparent =  Materiales.default.transparent;
    }

    over() {
        if(this.disparado) {
            this.overWrong();
        } else {
            this.boxMesh.material = Materiales.over;
            this.boxMesh.material.opacity = Materiales.over.opacity;
            this.boxMesh.material.transparent =  Materiales.over.transparent;
        }

    }

    // Colocando el barco y no hay sitio
    overWrong() {
        this.boxMesh.material = Materiales.incorrecto;
        this.boxMesh.material.transparent= Materiales.incorrecto.transparent;
        this.boxMesh.material.opacity = Materiales.incorrecto.opacity;
    }

    overRight() {
        this.boxMesh.material = Materiales.correcto;
        this.boxMesh.material.transparent= Materiales.correcto.transparent;
        this.boxMesh.material.opacity = Materiales.correcto.opacity;
    }

    marcarCasillaAlrededor(){
        this.boxMesh.material = Materiales.alrededor;
        this.boxMesh.material.transparent = Materiales.alrededor.transparent;
        this.boxMesh.material.opacity = Materiales.alrededor.opacity;
        this.tieneBarcoAlrededor = true;
        this.matDefinitivo = Materiales.alrededor;
        this.matDefinitivo.opacity = Materiales.alrededor.opacity;
        this.matDefinitivo.transparent = Materiales.alrededor.transparent;
    }

    marcarCasillasHundido(){
        this.boxMesh.material = Materiales.negroTransparente;
        this.matDefinitivo = Materiales.negroTransparente;
    }

    update() {

    }
}

