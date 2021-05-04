import * as THREE from '../libs/three.module.js';
import TWEEN from "../libs/tween.esm.js";
import {ThreeBSP} from "../libs/ThreeBSP.js";

export class Examen1 extends THREE.Object3D {
    constructor(gui) {
        super();
        let geoBola = new THREE.SphereGeometry(2, 32.0, 32.0,0,Math.PI);
        let geoBola2 = new THREE.SphereGeometry(2, 32.0, 32.0,0,Math.PI);
        let matBola = new THREE.MeshPhongMaterial({color: 0xf6e961});
        matBola.side = THREE.DoubleSide;
        this.bola = new THREE.Mesh(geoBola, matBola);
        this.bola2 = new THREE.Mesh(geoBola2, matBola);
        this.bola.rotateX(Math.PI*3 + Math.PI / 2);
        //geoBola.translate(0, 2, 0)
        this.bola2.rotateX(-1.5* Math.PI);
        //this.bola2.rotateX(-1.5* Math.PI);

        this.cilindro = new THREE.CylinderGeometry(0.2, 0.2, 4.0, 20.0);
        this.cilindro.rotateZ(Math.PI / 2)
        this.cilindro.translate(0, 1.1, 1.2)
        let cilindrobsp = new ThreeBSP(this.cilindro);
        let bolaT = new ThreeBSP(this.bola);

        let finalResult = bolaT.subtract(cilindrobsp);
        this.bolaf = finalResult.toMesh(matBola);


        this.crearSpline();

        this.crearMovimientos();
        this.unionBolas = new THREE.Object3D();
        this.unionBolas.add(this.bolaf)
        this.unionBolas.add(this.bola2)

        this.nodoTodo = new THREE.Object3D();
        this.nodoTodo.add(this.unionBolas)
        this.nodoTodo.add(this.splineObject)

        this.add(this.nodoTodo);

        /*
        /*let geoBoca = new THREE.SphereGeometry(1, 32.0, 32.0);
        geoBoca.translate(0, 0.8, 0)
        this.boca = new THREE.Mesh(geoBola, matBola);
        let bocabsp = new ThreeBSP(this.boca);*/

/*



        */
    }

    crearSpline() {
        this.splineCurve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 2, 20),
            new THREE.Vector3( -10,2, -10 ),
            new THREE.Vector3( 7,2, -10 ),
            new THREE.Vector3( 7,2, 1 ),
            new THREE.Vector3( 7,2, 3),
            new THREE.Vector3( -5,2, 3),
            new THREE.Vector3( -5,2, 10),
            new THREE.Vector3( -5,2, 20),
            new THREE.Vector3( -5,2, 20),
            new THREE.Vector3( -10, 2, 20),
        ] );
        let points = this.splineCurve.getPoints( 50 );
        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        let material = new THREE.LineBasicMaterial({ color : 0xff000f0 });
        this.splineObject = new THREE.Line(geometry, material);
    }


    crearMovimientos() {
        let origen1 = {x: 0}
        let target1 = {x: 0.6}
        let auxiliar = 0;

        this.movimiento1 = new TWEEN.Tween(origen1).to(target1, 6000);
        this.movimiento1.easing(TWEEN.Easing.Cubic.InOut);

        let that = this;
        this.movimiento1.onUpdate(() => {
            //that.bolaf.geometry=new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(2, 32.0, 32.0, 0,  Math.floor((Math.random() * 5) + 1) ));
            auxiliar = origen1.x;
            let nuevaPosicion = that.splineCurve.getPointAt(auxiliar);
            that.unionBolas.position.copy(nuevaPosicion);

            let tan = that.splineCurve.getTangentAt(auxiliar);
            nuevaPosicion.add(tan);
            that.unionBolas.lookAt(nuevaPosicion);
        });

        let origen2 = {x: 0.6}
        let target2 = {x: 1}
        this.movimiento2 = new TWEEN.Tween(origen2).to(target2, 4000);
        this.movimiento2.easing(TWEEN.Easing.Cubic.InOut);

        this.movimiento2.onUpdate(() => {
            auxiliar = origen2.x;
            let nuevaPosicion = that.splineCurve.getPointAt(auxiliar);

            that.unionBolas.position.copy(nuevaPosicion);

            let tan = that.splineCurve.getTangentAt(auxiliar);
            nuevaPosicion.add(tan);
            that.unionBolas.lookAt(nuevaPosicion);
        });

        let origen3 = {orientacion: 0}
        let target3 = {orientacion: 3}
        this.movimiento3 = new TWEEN.Tween(origen3).to(target3, 8000);
        this.movimiento3.easing(TWEEN.Easing.Cubic.InOut);

        this.movimiento3.onUpdate(() => {
            that.bola2.rotateX(origen3.orientacion);
        }).repeat(Infinity);

        this.movimiento1.chain(this.movimiento2);
        this.movimiento2.chain(this.movimiento1);
        this.movimiento2.start();
        this.movimiento3.start();
    }

    update() {
        TWEEN.update()
    }
}