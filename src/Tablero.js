import * as THREE from '../libs/three.module.js';

import {Box} from './Box.js';
export class Tablero extends THREE.Object3D {
    constructor() {
        super();
        this.FILAS = 10;
        this.COLS = 8;
        this.raycaster = new THREE.Raycaster();
        let matCuadrados = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});

        let lado = 5;

        this.tablero = new THREE.Object3D();

        //Se guardan las cajas
        this.boxesArray = [];


        for (let i = 0; i < this.FILAS; i++) {
            for (let j = 0; j < this.COLS; j++) {

                //let posicion = new THREE.Vector3(lado / 2 + lado * j, lado / 2 + lado * i, 0);

                //let box = new THREE.Mesh(new THREE.BoxGeometry(lado, lado, lado), matCuadrados);
                let box = new Box(lado,lado / 2 + lado * j,lado / 2 + lado * i,0 ,i,j);

                //situarlo en el tablero
                //box.position.set(posicion.x, posicion.y, posicion.z);
                //let geo = new THREE.EdgesGeometry(box.geometry);
                //let mat = new THREE.LineBasicMaterial({color: 0x0001110, linewidth: 6});
                //let wireframe = new THREE.LineSegments(geo, mat);
                //wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
                //box.add(wireframe);

                this.boxesArray.push(box);
                this.tablero.add(box);

            }
        }

        this.add(this.tablero);

    }

    cambaiarColor(f,c){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        this.boxesArray[(f*this.COLS)+c].over();
    }

    overX(f,c,n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        var wrong = false;

        //1.Mirar si se salen del tablero
        if(c+n > this.COLS ){  //Si se sale del tablero
            for(let i = 0; i < this.COLS-c; i++) {
                this.boxesArray[(f * this.COLS) + c + i].overWrong();
            }
        }
        else{
            //2.Mirar si ya están seleccionadas
            for(let i = 0; i < n && !wrong ; i++) {
                if( this.boxesArray[(f * this.COLS) + (c+i)].seleccionado ){
                    wrong=true;
                }
            }

            if(wrong){
                for (let i = 0; i < n; i++) {
                    this.boxesArray[(f * this.COLS) + c + i].overWrong();
                }
            }else{
                for (let i = 0; i < n; i++) {
                    this.boxesArray[(f * this.COLS) + c + i].overRight();
                }
            }
        }


    }


    resetOverX(f,c,n){
        for (let i = 0; i < this.boxesArray.length; i++) {
            if(this.boxesArray[i].fila != f){ //Si no pertenecen a la misma fila
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].fila == f) && (this.boxesArray[i].columna < c) ){ //Si pertenecen a la misma fila y son anteriores
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].fila == f) && (this.boxesArray[i].columna > c+n-1) ){ //Si pertenecen a la misma fila y son posteriores
                this.boxesArray[i].resetMaterial();
            }

        }
    }

    overY(f,c,n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        if(f+n > this.FILAS ){
            for(let i = 0; i < this.FILAS-f; i++) {
                this.boxesArray[( (f+i) * this.COLS) + c].overWrong();
            }
        }
        else{
            for(let i = 0; i < n; i++) {
                this.boxesArray[((f+i) * this.COLS) + c].overRight();
            }
        }

        var wrong = false;

        //1.Mirar si se salen del tablero
        if(f+n > this.FILAS ){ //Si se sale del tablero
            for(let i = 0; i < this.FILAS-f; i++) {
                this.boxesArray[( (f+i) * this.COLS) + c].overWrong();
            }
        }
        else{
            //2.Mirar si ya están seleccionadas
            for(let i = 0; i < n && !wrong ; i++) {
                if( this.boxesArray[( (f+i) * this.COLS) + c].seleccionado ){
                    wrong=true;
                }
            }

            if(wrong){
                for(let i = 0; i < n; i++) {
                    this.boxesArray[( (f+i) * this.COLS) + c].overWrong();
                }
            }
            else{
                for(let i = 0; i < n; i++) {
                    this.boxesArray[((f+i) * this.COLS) + c].overRight();
                }
            }
        }
    }


    resetOverY(f,c,n){
        for (let i = 0; i < this.boxesArray.length; i++) {
            if(this.boxesArray[i].columna != c){ //Si no pertenecen a la misma columna
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].columna == c) && (this.boxesArray[i].fila < f) ){ //Si pertenecen a la misma columna y son anteriores
                this.boxesArray[i].resetMaterial();
            }
            else if( (this.boxesArray[i].columna == c) && (this.boxesArray[i].fila > (f+n-1)) ){ //Si pertenecen a la misma columna y son posteriores
                this.boxesArray[i].resetMaterial();
            }
        }
    }


    selectX(f,c,n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        //Mirar si se pueden seleccionar
        var seleccionables=true;

        //1.Mirar si se salen del tablero
        if(c+n > this.COLS ) {
            seleccionables=false;
        }
        //2.Mirar si ya están seleccionadas
        console.log("--f:"+f+" c="+c+" n="+n)
        for(let i = 0; i < n && seleccionables; i++) {
            console.log("compruebo: f="+f+" c="+(c+i))
            if( this.boxesArray[(f * this.COLS) + (c+i)].seleccionado ){
                seleccionables=false;
            }
        }

        //2. Mirar si se salen del tablero y si no seleccionar
        if( seleccionables ){
            for(let i = 0; i < n; i++) {
                //console.log("compruebo: f="+f+" c="+(c+i))
                this.boxesArray[(f * this.COLS) + c + i].select();
            }
        }

    }

    selectY(f,c,n){
        //(fila a la que se quiere acceder * número de columnas de la matriz ) + columna a la que se quiere acceder

        //Mirar si se pueden seleccionar
        var seleccionables=true;

        //1.Mirar si se salen del tablero
        if(f+n > this.FILAS ) {
            seleccionables=false;
        }
        //2.Mirar si ya están seleccionadas
        for(let i = 0; i < n && seleccionables; i++) {
            console.log("compruebo: f="+f+i+" c="+c)
            if( this.boxesArray[( (f+i) * this.COLS) + c].seleccionado ){
                seleccionables=false;
                //console.log("no se puede: f="+(f+i)+" c="+c)
            }
        }

        //3. seleccionar
        if(seleccionables){
            for(let i = 0; i < n; i++) {
                //console.log("compruebo: f="+(f+i)+" c="+c)
                this.boxesArray[( (f+i) * this.COLS) + c].select();
            }
        }
    }


    /*
    onDocumentMouseDown(e) {
        alert('hola')
    }
    /**
     * It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
     * @param event - Mouse information
     * @return A Vector2 with the normalized mouse position
     */
    getMouse(event) {
        var mouse = new THREE.Vector2 ();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
        return mouse;
    }

    update() {

    }
}