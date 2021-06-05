// Clases de la biblioteca

import * as THREE from '../libs/three.module.js';
import { GUI } from '../libs/dat.gui.module.js';
import { TrackballControls } from '../libs/TrackballControls.js';
import { Tablero } from './Tablero.js';
import { Jugador } from './Jugador.js';
import { actions } from './params.js';
import * as TWEEN from '../libs/tween.esm.js';
/*
 * Variable global para los disparos de los
 * sonidos
 * @type Sound
 */
export let sound = null;

class MyScene extends THREE.Scene {
    constructor(myCanvas) {
        super();

        // Attributes
        this.applicationMode = actions.NO_ACTION;
        this.mouseDown = false;
        this.cameraControl = null;

        // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
        this.renderer = this.createRenderer(myCanvas);

        // Se crea la interfaz gráfica de usuario
        this.gui = this.createGUI();

        // Construimos los distinos elementos que tendremos en la escena
        //this.createGround();
        // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
        // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
        this.createLights();

        // Tendremos una cámara con un control de movimiento con el ratón
        this.createCamera();

        // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
        this.axis = new THREE.AxesHelper(15);
        this.add(this.axis);
        this.jugadores = [];
        this.cargarNombres()

        this.posTab1 = new THREE.Vector3(0, 0, 40);
        this.posTab2 = new THREE.Vector3(0, 0, -40);

        // Tablero
        this.tablero1 = new Tablero();
        this.tablero2 = new Tablero();
        this.tablero1.position.set(this.posTab1.x, this.posTab1.y, this.posTab1.z);
        
        
        this.tablero2.rotation.y = Math.PI;
        //this.tablero2.rotation.y = Math.PI;
        this.tablero2.position.set(this.posTab2.x + 40, this.posTab2.y, this.posTab2.z);
        
        this.primera = true;
        this.siguienteTurno();
        this.add(this.tablero1);
        this.add(this.tablero2);
    }

    /**
     *
     * @param partida indica si estamos colocando barcos o no
     */
    siguienteTurno(partida = true) {
        // la primera vez no cambio la camara
        if (!this.primera) {
            this.moverCamaraTurno();
        } else {
            this.primera = false;
        }

        actions.TURNO = actions.SIG_TURNO;
        if (partida) {
            actions.SIG_TURNO == 0 ? this.tablero = this.tablero1 : this.tablero = this.tablero2;
        } else {
            // Estamos disparando
            if (actions.SIG_TURNO == 0) {
                this.tablero = this.tablero2;
                this.tableroEspejo = this._tab1;
            } else {
                this.tablero = this.tablero1;
                this.tableroEspejo = this._tab2;
            }
        }
        actions.SIG_TURNO == 0 ? actions.SIG_TURNO = 1 : actions.SIG_TURNO = 0;
    }

    moverCamaraTurno() {

        let that = this;

        let origen;
        let mitad;
        let destino;
        console.log(actions.TURNO);
        if (actions.TURNO == 0) {
            origen = { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z };
            mitad = { x: -150, y: 25, z: 0 };
            destino = { x: 20, y: 25, z: -150 };
        } else {
            origen = { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z};
            mitad = { x: -150, y: 25, z: 0 };
            destino = { x: 20, y: 25, z: 150 };
        }

        let animacionCambioTurno1 = new TWEEN.Tween(origen)
            .to(mitad, 300)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                that.camera.position.set(origen.x, origen.y, origen.z);
                // Cambiamos a dónde mira la camara
                that.camera.lookAt(0,25,0);
            }).onComplete(function() {
                
            });

        let animacionCambioTurno2 = new TWEEN.Tween(mitad)
            .to(destino, 200)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                that.camera.position.set(mitad.x, mitad.y, mitad.z);
                // Cambiamos a dónde mira la camara
                that.camera.lookAt(0,25,0);
            });

        animacionCambioTurno1.chain(animacionCambioTurno2)
        animacionCambioTurno1.start();
    }

    cargarNombres() {
        //let person1 = //prompt("Nombre jugador 1", "");
        this.jugadores.push(new Jugador("person1"));
        //let person2 = prompt("Nombre jugador 2", "");
        this.jugadores.push(new Jugador("person2"));
    }

    createCamera() {
        // Para crear una cámara le indicamos
        //   El ángulo del campo de visión en grados sexagesimales
        //   La razón de aspecto ancho/alto
        //   Los planos de recorte cercano y lejano
        // create an AudioListener and add it to the camera
        const listener = new THREE.AudioListener();
        sound = new THREE.Audio(listener);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.add(listener);
        // También se indica dónde se coloca
        this.camera.position.set(20, 25, 150);
        // Y hacia dónde mira
        var look = new THREE.Vector3(0, 25, 0);
        this.camera.lookAt(look);
        this.add(this.camera);

        // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
        this.cameraControl = new TrackballControls(this.camera, this.renderer.domElement);
        // Se configuran las velocidades de los movimientos
        this.cameraControl.rotateSpeed = 5;
        this.cameraControl.zoomSpeed = -2;
        this.cameraControl.panSpeed = 0.5;
        // Debe orbitar con respecto al punto de mira de la cámara
        this.cameraControl.target = look;
        this.cameraControl.enabled = false;
    }

    createGround() {
        // El suelo es un Mesh, necesita una geometría y un material.

        // La geometría es una caja con muy poca altura
        var geometryGround = new THREE.BoxGeometry(50, 0.2, 50);

        // El material se hará con una textura de madera
        var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        var materialGround = new THREE.MeshPhongMaterial({ map: texture });

        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh(geometryGround, materialGround);

        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        ground.position.y = -0.1;

        // Que no se nos olvide añadirlo a la escena, que en este caso es  this
        this.add(ground);
    }

    createGUI() {
        var gui = new GUI();

        this.guiControls = new function () {
            this.lightIntensity = 0.5;
            this.axisOnOff = true;
        }

        var that = this;

        // Se crea una sección para los controles de esta clase
        var folder = gui.addFolder('Luz y Ejes');

        // Se le añade un control para la intensidad de la luz
        folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

        // Y otro para mostrar u ocultar los ejes
        folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes : ');

        return gui;
    }

    createLights() {
        // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
        // La luz ambiental solo tiene un color y una intensidad
        // Se declara como   var   y va a ser una variable local a este método
        //    se hace así puesto que no va a ser accedida desde otros métodos
        var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
        // La añadimos a la escena
        this.add(ambientLight);

        // Se crea una luz focal que va a ser la luz principal de la escena
        // La luz focal, además tiene una posición, y un punto de mira
        // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
        // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
        this.spotLight = new THREE.SpotLight(0xffffff, this.guiControls.lightIntensity);
        this.spotLight.position.set(60, 60, 40);
        this.add(this.spotLight);
    }

    createRenderer(myCanvas) {
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

    getCamera() {
        // En principio se devuelve la única cámara que tenemos
        // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
        return this.camera;
    }

    getCameraControls() {
        return this.cameraControl;
    }

    setCameraAspect(ratio) {
        // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
        // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
        this.camera.aspect = ratio;
        // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
        this.camera.updateProjectionMatrix();
    }

    onWindowResize() {
        // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
        // Hay que actualizar el ratio de aspecto de la cámara
        this.setCameraAspect(window.innerWidth / window.innerHeight);

        // Y también el tamaño del renderizador
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        // Se actualizan los elementos de la escena para cada frame
        // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
        this.spotLight.intensity = this.guiControls.lightIntensity;

        // Se muestran o no los ejes según lo que idique la GUI
        this.axis.visible = this.guiControls.axisOnOff;

        // Se actualiza la posición de la cámara según su controlador
        this.cameraControl.update();

        // Se actualiza el resto del modelo
        this.tablero.update();

        TWEEN.update();

        // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
        this.renderer.render(this, this.getCamera());

        // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
        // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
        // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
        requestAnimationFrame(() => this.update())
    }


    //---------INTERACCIÓN RATON/TECLADO--------------------------

    onMouseDown(event) {
        //console.log( "funciona1" );
        if (event.button === 0) {   // Left button

            if (!this.jugadores[actions.TURNO].terminadaColocacion()) {
                this.mouseDown = true;
                //console.log( "funciona2" );
                //Saber en qué píxel se ha hecho clic
                //Lanzar un rayo Desde la cámara que pase por dicho píxel
                //Obtener los objetos alcanzados por ese rayoNormalmente el seleccionado es el más cercano
                var mouse = new THREE.Vector2();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

                var raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, this.camera);


                var pickableObjects = [];

                //Se añaden las cajas del tablero
                var i = 0;

                for (i; i < this.tablero.boxesArray.length; i++) {
                    pickableObjects.push(this.tablero.boxesArray[i]);
                }

                this.pickedObjects = raycaster.intersectObjects(pickableObjects, true);


                if (this.pickedObjects.length > 0) {
                    this.selectedObject = this.pickedObjects[0].object;

                    let parar = false;
                    for (i = 0; i < this.tablero.boxesArray.length && !parar; i++) {
                        if (this.tablero.boxesArray[i].getPosition().x == this.selectedObject.position.x &&
                            this.tablero.boxesArray[i].getPosition().y == this.selectedObject.position.y &&
                            this.tablero.boxesArray[i].getPosition().z == this.selectedObject.position.z) {
                            this.foundBox = this.tablero.boxesArray[i];  //Hemos encontrado la caja

                            if (actions.IS_HORIZONTAL) {
                                let bien = this.tablero.selectXNewShip(
                                    this.foundBox.fila,
                                    this.foundBox.columna,
                                    this.jugadores[actions.TURNO].getBarcoActual()
                                );
                                if (bien && !this.jugadores[actions.TURNO].terminadaColocacion()) {
                                    this.jugadores[actions.TURNO].barcoColocado();
                                }

                            } else {
                                let bien = this.tablero.selectYNewShip(this.foundBox.fila, this.foundBox.columna, this.jugadores[actions.TURNO].getBarcoActual());
                                if (bien && !this.jugadores[actions.TURNO].terminadaColocacion()) {
                                    this.jugadores[actions.TURNO].barcoColocado();
                                }
                            }
                            parar = true;
                        }
                    }
                }

                if (this.jugadores[0].terminadaColocacion() && this.jugadores[1].terminadaColocacion()) {
                    this.empezarPartida();
                } else if (this.jugadores[actions.TURNO].terminadaColocacion()) {
                    this.siguienteTurno();
                }

            } else {
                if (!actions.FIN_JUEGO) {
                    // Estamos disparando. No colocando barcos.
                    var mouse = new THREE.Vector2();
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

                    var raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(mouse, this.camera);


                    var pickableObjects = [];

                    //Se añaden las cajas del tablero
                    var i = 0;

                    for (i; i < this.tableroEspejo.boxesArray.length; i++) {
                        pickableObjects.push(this.tableroEspejo.boxesArray[i]);
                    }

                    this.pickedObjects = raycaster.intersectObjects(pickableObjects, true);

                    let casillaMarcada = false;
                    if (this.pickedObjects.length > 0) {
                        this.selectedObject = this.pickedObjects[0].object;
                        let parar = false;
                        for (i = 0; i < this.tableroEspejo.boxesArray.length && !parar; i++) {
                            if (this.tableroEspejo.boxesArray[i].getPosition().x == this.selectedObject.position.x &&
                                this.tableroEspejo.boxesArray[i].getPosition().y == this.selectedObject.position.y &&
                                this.tableroEspejo.boxesArray[i].getPosition().z == this.selectedObject.position.z) {
                                this.foundBox = this.tableroEspejo.boxesArray[i];  //Hemos encontrado la caja
                                // comprueba si se ha hundido,
                                let rtado = this.tablero.shoot(this.foundBox.fila, this.foundBox.columna)

                                if (rtado.tocado) {
                                    casillaMarcada = this.foundBox.shootTocado();
                                    this.jugadores[actions.TURNO].barcoTocado();
                                } else {
                                    casillaMarcada = this.foundBox.shootAgua();
                                }

                                parar = true;
                            }
                        }
                    }

                    // Miro si el jugador actual ha ganado
                    if (this.jugadores[actions.TURNO].ganador()) {
                        actions.FIN_JUEGO = true;
                        alert('HA GANADO ' + this.jugadores[actions.TURNO].name)
                    } else {
                        // evito que salte de turno sin marcar una casilla en el correspondiente tab.
                        if (casillaMarcada) this.siguienteTurno(false);
                    }
                }

            }

        } else {
            this.applicationMode = actions.NO_ACTION;
        }
    }

    /**
     * Crea los tableros espejo.
     */
    empezarPartida() {
        this._tab1 = new Tablero();
        this._tab2 = new Tablero();
        this._tab1.position.set(0, 0, 40)
        this._tab2.rotation.y = Math.PI;
        this._tab2.position.set(40, 0, -40)
        
        let escalado = 0.6;
        this.tablero1.scale.set(escalado, escalado, escalado);
        this.tablero2.scale.set(escalado, escalado, escalado);
        this.tablero1.position.set(50, 0, 40);
        this.tablero2.position.set(50 + 24, 0, -40);
        this.add(this._tab1)
        this.add(this._tab2)

        // cambio la referencia del talero usar
        this.siguienteTurno(false);
    }

    onMouseUp(event) {
        if (this.mouseDown) {
            this.mouseDown = false;
        }
    }

    onMouseMove(event) {
        if (this.mouseDown) {

        } else {
            var mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, this.camera);


            var pickableObjects = [];
            if (!this.jugadores[actions.TURNO].terminadaColocacion()) {
                //Se añaden las cajas del tablero
                var i = 0;

                for (i; i < this.tablero.boxesArray.length; i++) {
                    pickableObjects.push(this.tablero.boxesArray[i]);
                }

                this.pickedObjects = raycaster.intersectObjects(pickableObjects, true);


                if (this.pickedObjects.length > 0) {
                    this.selectedObject = this.pickedObjects[0].object;

                    for (i = 0; i < this.tablero.boxesArray.length; i++) {
                        if (this.tablero.boxesArray[i].getPosition().x == this.selectedObject.position.x && this.tablero.boxesArray[i].getPosition().y == this.selectedObject.position.y &&
                            this.tablero.boxesArray[i].getPosition().z == this.selectedObject.position.z) {
                            this.foundBox = this.tablero.boxesArray[i];  //Hemos encontrado la caja

                            if (actions.IS_HORIZONTAL) {
                                this.tablero.overXNewShip(this.foundBox.fila, this.foundBox.columna, this.jugadores[actions.TURNO].getBarcoActual());
                                this.tablero.resetOverX(this.foundBox.fila, this.foundBox.columna, this.jugadores[actions.TURNO].getBarcoActual());
                            } else {
                                this.tablero.overYNewShift(this.foundBox.fila, this.foundBox.columna, this.jugadores[actions.TURNO].getBarcoActual());
                                this.tablero.resetOverY(this.foundBox.fila, this.foundBox.columna, this.jugadores[actions.TURNO].getBarcoActual());
                            }

                        }
                    }
                } else {
                    //Si se esta pasando por fuera del tablero se limpia el over del tablero
                    this.tablero.cleanOver();
                }
            } else {
                var i = 0;

                for (i; i < this.tableroEspejo.boxesArray.length; i++) {
                    pickableObjects.push(this.tableroEspejo.boxesArray[i]);
                }

                this.pickedObjects = raycaster.intersectObjects(pickableObjects, true);

                if (this.pickedObjects.length > 0) {
                    this.selectedObject = this.pickedObjects[0].object;

                    for (i = 0; i < this.tableroEspejo.boxesArray.length; i++) {
                        if (this.tableroEspejo.boxesArray[i].getPosition().x == this.selectedObject.position.x && this.tablero.boxesArray[i].getPosition().y == this.selectedObject.position.y &&
                            this.tableroEspejo.boxesArray[i].getPosition().z == this.selectedObject.position.z) {
                            this.foundBox = this.tableroEspejo.boxesArray[i];  //Hemos encontrado la caja

                            this.foundBox.over();
                            // como tam=1 se puede usar X
                            this.tableroEspejo.resetOverX(this.foundBox.fila, this.foundBox.columna, 1);


                        }
                    }
                } else {
                    //Si se esta pasando por fuera del tablero se limpia el over del tablero
                    this.tableroEspejo.cleanOver();
                }
            }
        }
    }

    onMouseWheel(event) {
        if (event.ctrlKey) {
            // The Trackballcontrol only works if Ctrl key is pressed
            this.getCameraControls().enabled = true;
        } else {
            this.getCameraControls().enabled = false;
        }
    }

    onKeyDown(event) {
        var x = event.which || event.keyCode;
        switch (x) {
            case 17: // Ctrl key
                this.getCameraControls().enabled = true;
                break;
            case 9: // Tab key
                if (actions.IS_HORIZONTAL == 0) {
                    actions.IS_HORIZONTAL = 1;
                } else {
                    actions.IS_HORIZONTAL = 0;
                }

                break;
        }
        //console.log( "hola1" );
    }

    onKeyUp(event) {
        var x = event.which || event.keyCode;
        switch (x) {
            case 17: // Ctrl key
                this.getCameraControls().enabled = false;
                break;
        }
    }
}


/// La función   main
$(function () {

    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");

    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener("resize", () => scene.onWindowResize());
    window.addEventListener("mousedown", (event) => scene.onMouseDown(event), true);
    window.addEventListener("mouseup", (event) => scene.onMouseUp(event), true);
    window.addEventListener("mousewheel", (event) => scene.onMouseWheel(event), true);   // For Chrome an others
    window.addEventListener("mousemove", (event) => scene.onMouseMove(event), true);
    window.addEventListener("keydown", (event) => scene.onKeyDown(event), true);
    window.addEventListener("keyup", (event) => scene.onKeyUp(event), true);
    // Que no se nos olvide, la primera visualización.
    scene.update();
});
