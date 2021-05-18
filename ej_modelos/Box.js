/**
 * Práctica 1. Sistemas Gráficos 2020-2021
 *
 * Autor: Raquel Molina Reche
 *
 */

import * as THREE from '../libs/three.module.js'

class Box extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        // El material se usa desde varios métodos. Por eso se alamacena en un atributo
        this.material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});

        //Cambiamos el shading a flat, tras el cambio ser requiere actualización del material
        this.material.flatShading = true;
        this.material.needsUpdate = true;

        //Se crea el objeto box con las medidas y su material
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), this.material);

        this.add(this.box);
    }


    createGUI (gui,titleGui) {

        // Controles para las dimensiones
        this.guiControls = new function () {
            this.valorX = 1.0; //Se pone el valor que tiene o por defecto al empezar
            this.valorY = 1.0;
            this.valorZ = 1.0;
        }
        /*
        var that = this; //Nos será necesaria para referenciar dentro de funciones

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento

        // listen() permite que se actualice el deslizador de la interfaz en el caso de que se cambie el valor de la variable en código
        //Control del valor de X
        folder.add (this.guiControls, 'valorX', 1.0, 15.0, 0.1).name ('Dimensión X : ').listen().onChange(  function(valorX){
            var newGeoBox = new THREE.BoxGeometry(valorX,that.guiControls.valorY,that.guiControls.valorZ);
            that.box.geometry = newGeoBox;
        });

        //Control del valor de Y
        folder.add (this.guiControls, 'valorY', 1.0, 15.0, 0.1).name ('Dimensión Y : ').listen().onChange( function(valorY){
            var newGeoBox = new THREE.BoxGeometry(that.guiControls.valorX,valorY,that.guiControls.valorZ);
            that.box.geometry = newGeoBox;
        });

        //Control del valor de Z
        folder.add (this.guiControls, 'valorZ', 1.0, 15.0, 0.1).name ('Dimensión Z : ').listen().onChange( function(valorZ){
            var newGeoBox = new THREE.BoxGeometry(that.guiControls.valorX, that.guiControls.valorY, valorZ);
            that.box.geometry = newGeoBox;
        });
*/
    }

    update (flatShading) {

        //Control del sombreado o shading
        if( this.material.flatShading != flatShading ){ //Si el sombreado cambia se cambia tambien en el material del modelo
            this.material.flatShading = flatShading;
            this.material.needsUpdate = true;
        }

        //Para el movimiento continuo se incrementa la rotación en cada frame
        this.box.rotation.y += 0.01;
        this.box.rotation.x += 0.01;

    }
}

export { Box }
