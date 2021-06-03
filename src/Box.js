import * as THREE from '../libs/three.module.js';
import {sound} from './MyScene.js';
export class Box extends THREE.Scene {
    constructor(lado, pointX, pointY, pointZ, f,c){
        super();

        //Geometria
        this.boxGeometry = new THREE.BoxGeometry(lado,lado,lado);

        //Diferentes materiales que tendrá según acciones
        this.defaultMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});
        this.selectMaterial = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.overMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
        this.overRightMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.overWrongMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

        //Varibles necesarias
        this.tieneBarco=false;
        this.tieneBarcoAlrededor=false;
        this.fila=f;
        this.columna=c;
        this.disparado = false;
        this.barcoContenido = null;
        this.matDefinitivo = this.defaultMaterial;

        this.boxMesh = new THREE.Mesh(this.boxGeometry, this.defaultMaterial);
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

    shoot() {
        if(!this.disparado) {
            this.boxMesh.material = this.blackMaterial;
            this.boxMesh.material.opacity = this.blackMaterial.opacity;
            this.disparado = true;
        }
        return this.tieneBarco;
    }

    shootTocado() {
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( '../sounds/disparo.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setVolume( 0.5 );
            sound.play();
        });
        this.boxMesh.material = this.overRightMaterial;
        //this.boxMesh.material.opacity = this.blackMaterial.opacity;
        this.disparado = true;
        this.matDefinitivo = this.overRightMaterial;
    }
    // see https://threejs.org/docs/#api/en/audio/Audio
    shootAgua() {
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( '../sounds/agua.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setVolume( 0.5 );
            sound.play();
        });
        this.boxMesh.material = this.overWrongMaterial;
        //this.boxMesh.material.opacity = this.blackMaterial.opacity;
        this.disparado = true;
        this.matDefinitivo = this.overWrongMaterial;
    }

    rotateBox(event){
        this.boxMesh.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
    }

    cambiarMaterial() {
        if( !this.tieneBarco ){
            this.boxMesh.material = new THREE.MeshPhongMaterial({color: 0xCF0000});
            this.boxMesh.material.opacity = 1.0;
        }
    }

    resetMaterial() {
        this.boxMesh.material = this.matDefinitivo;
        this.boxMesh.material.opacity = this.matDefinitivo.opacity;
        this.boxMesh.material.transparent = true;
    }

    /**
     * Posiciona y almacena el barco que posee la casilla
     * @param barco tamaño del barco (num. casillas que ocupa).
     */
    posicionarBarco(barco) {
        this.boxMesh.material = this.selectMaterial;
        this.boxMesh.material.opacity = this.selectMaterial.opacity;
        this.tieneBarco = true;
        this.barcoContenido = barco;
        this.matDefinitivo = this.selectMaterial;
    }

    deselect() {
        this.boxMesh.material = this.defaultMaterial;
        this.boxMesh.material.opacity = this.defaultMaterial.opacity;
        this.tieneBarco = false;
    }

    over() {
        if(this.disparado) {
            this.overWrong();
        } else {
            this.boxMesh.material = this.overMaterial;
            //this.boxMesh.material.transparent= this.overMaterial.transparent;
            this.boxMesh.material.opacity = this.overMaterial.opacity;
        }

    }

    // Colocando el barco y no hay sitio
    overWrong() {
        this.boxMesh.material = this.overWrongMaterial;
        this.boxMesh.material.transparent= false;
        this.boxMesh.material.opacity = this.overWrongMaterial.opacity;
    }

    overRight() {
        this.boxMesh.material = this.overRightMaterial;
        this.boxMesh.material.transparent= false;
        this.boxMesh.material.opacity = this.overRightMaterial.opacity;
    }

    marcarCasillaAlrededor(){
        this.boxMesh.material = this.overWrongMaterial;
        this.boxMesh.material.transparent = true;
        this.boxMesh.material.opacity = 0.3;
        this.tieneBarcoAlrededor = true;
        this.matDefinitivo = this.overWrongMaterial;
        //this.matDefinitivo.material.transparent = true;
        this.matDefinitivo.opacity = 0.3;
    }

    update() {

    }
}

