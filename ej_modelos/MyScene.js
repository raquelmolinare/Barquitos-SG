/**
 * Práctica 1. Sistemas Gráficos 2020-2021
 * 
 * Autor: Raquel Molina Reche
 * 
 */

// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto


import { Box } from './Box.js'

import { BarcoPescador } from '../src/barcos/BarcoPescador.js'
import { Submarino } from '../src/barcos/Submarino.js'
import { BarcoGuerra } from '../src/barcos/BarcoGuerra.js'
import {BarcoPirata} from "../src/barcos/BarcoPirata.js";
import {BarcoBote} from "../src/barcos/BarcoBote.js";

/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
    
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    
    //barcoBote
    this.barcoBote = new BarcoBote(this.gui, "Controles barco");
    this.barcoBote.position.set(1,0,0);
    this.add (this.barcoBote );

    //barcoPescador
    this.barcoPescador = new BarcoPescador(this.gui, "Controles barco");
    this.barcoPescador.position.set(1.5,0,3.0);
    this.add (this.barcoPescador);

    //Submarino
    this.submarino = new Submarino(this.gui, "Controles barco");
    this.submarino.position.set(2.0,0.0,6.0);
    this.add (this.submarino);

    //barcoPirata
    this.barcoPirata = new BarcoPirata(this.gui, "Controles barco");
    this.barcoPirata.position.set(3.0,0,12.0);
    //.position.set(3.0,0,12.0);
    this.add (this.barcoPirata );

    //barcoGuerra
    this.barcoGuerra = new BarcoGuerra(this.gui, "Controles barco");
    this.barcoGuerra.position.set(2.5,0,9.0);
    this.add (this.barcoGuerra );



    //-----CAJAS-------------------

    //cajas2
    this.caja21 = new Box(this.gui, "Controles caja1");
    this.caja21.position.x=0.5;
    this.caja21.position.z=0.0;
    this.add (this.caja21);

    this.caja22 = new Box(this.gui, "Controles caja2");
    this.caja22.position.x=1.5;
    this.caja22.position.z=0.0;
    this.add (this.caja22);

    //cajas3
    this.caja31 = new Box(this.gui, "Controles caja1");
    this.caja31.position.x=0.5;
    this.caja31.position.z=3.0;
    this.add (this.caja31);

    this.caja32 = new Box(this.gui, "Controles caja2");
    this.caja32.position.x=1.5;
    this.caja32.position.z=3.0;
    this.add (this.caja32);

    this.caja33= new Box(this.gui, "Controles caja3");
    this.caja33.position.x=2.5;
    this.caja33.position.z=3.0;
    this.add (this.caja33);

    //cajas4
    this.caja41 = new Box(this.gui, "Controles caja1");
    this.caja41.position.x=0.5;
    this.caja41.position.z=6.0;
    this.add (this.caja41);

    this.caja42 = new Box(this.gui, "Controles caja2");
    this.caja42.position.x=1.5;
    this.caja42.position.z=6.0;
    this.add (this.caja42);

    this.caja43= new Box(this.gui, "Controles caja3");
    this.caja43.position.x=2.5;
    this.caja43.position.z=6.0;
    this.add (this.caja43);

    this.caja44 = new Box(this.gui, "Controles caja4");
    this.caja44.position.x=3.5;
    this.caja44.position.z=6.0;
    this.add (this.caja44);

    //cajas5
    this.caja51 = new Box(this.gui, "Controles caja1");
    this.caja51.position.x=0.5;
    this.caja51.position.z=9.0;
    this.add (this.caja51);

    this.caja52 = new Box(this.gui, "Controles caja2");
    this.caja52.position.x=1.5;
    this.caja52.position.z=9.0;
    this.add (this.caja52);

    this.caja53= new Box(this.gui, "Controles caja3");
    this.caja53.position.x=2.5;
    this.caja53.position.z=9.0;
    this.add (this.caja53);

    this.caja54 = new Box(this.gui, "Controles caja4");
    this.caja54.position.x=3.5;
    this.caja54.position.z=9.0;
    this.add (this.caja54);

    this.caja55 = new Box(this.gui, "Controles caja4");
    this.caja55.position.x=4.5;
    this.caja55.position.z=9.0;
    this.add (this.caja55);

    //cajas6
    this.caja61 = new Box(this.gui, "Controles caja1");
    this.caja61.position.x=0.5;
    this.caja61.position.z=12.0;
    this.add (this.caja61);

    this.caja62 = new Box(this.gui, "Controles caja2");
    this.caja62.position.x=1.5;
    this.caja62.position.z=12.0;
    this.add (this.caja62);

    this.caja63= new Box(this.gui, "Controles caja3");
    this.caja63.position.x=2.5;
    this.caja63.position.z=12.0;
    this.add (this.caja63);

    this.caja64 = new Box(this.gui, "Controles caja4");
    this.caja64.position.x=3.5;
    this.caja64.position.z=12.0;
    this.add (this.caja64);

    this.caja65 = new Box(this.gui, "Controles caja4");
    this.caja65.position.x=4.5;
    this.caja65.position.z=12.0;
    this.add (this.caja65);

    this.caja66 = new Box(this.gui, "Controles caja4");
    this.caja66.position.x=5.5;
    this.caja66.position.z=12.0;
    this.add (this.caja66);
    
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (12, 6, 12);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
      this.giroOnOff = false;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Se actualiza el resto del modelo

    //barcoGerra
    this.barcoGuerra.update();
    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
