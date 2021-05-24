import * as THREE from '../libs/three.module.js';

export class Box extends THREE.Scene {
    constructor(lado, pointX, pointY, pointZ, f,c){
        super();

        //Geometria
        this.boxGeometry = new THREE.BoxGeometry(lado,lado,lado);

        //Diferentes materiales que tendrá según acciones
        this.boxMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});
        this.defaultMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});
        this.selectMaterial = new THREE.MeshPhongMaterial({color: 0xCF0000});
        this.overMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
        this.overRightMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.overWrongMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

        //Varibles necesarias
        this.seleccionado=false;
        this.fila=f;
        this.columna=c;


        this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
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

    rotateBox(event){
        this.boxMesh.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
    }

    cambiarMaterial() {
        //console.log("cambiar material")

        //let cambio = new THREE.MeshPhongMaterial({color: 0xCF0000});
        //console.log(cambio)
        //this.material.flatShading = false;
        //this.boxMesh.material.needsUpdate = true;
        //this.boxMesh = new THREE.Mesh(this.boxGeometry,cambio);

        //this.boxMaterial = new THREE.MeshPhongMaterial({color: 0xCF0000});
        //this.boxMaterial.needsUpdate = true;
        //this.boxMaterial.flatShading = false;
        //this.boxMaterial.needsUpdate = true;
        if( !this.seleccionado ){
            this.boxMesh.material = new THREE.MeshPhongMaterial({color: 0xCF0000});
            this.boxMesh.material.opacity = 1.0;
        }
        //console.log(this.boxMaterial);
    }

    resetMaterial() {
        if( !this.seleccionado ) {
            this.boxMesh.material = this.defaultMaterial;
            this.boxMesh.material.opacity = this.defaultMaterial.opacity;
        }
        else{
            this.boxMesh.material = this.selectMaterial;
            this.boxMesh.material.opacity = this.selectMaterial.opacity;
        }
    }

    select() {
        this.boxMesh.material = this.selectMaterial;
        this.boxMesh.material.opacity = this.selectMaterial.opacity;
        this.seleccionado = true;
    }

    deselect() {
        this.boxMesh.material = this.defaultMaterial;
        this.boxMesh.material.opacity = this.defaultMaterial.opacity;
        this.seleccionado = false;
    }

    over() {
        this.boxMesh.material = this.overMaterial;
        this.boxMesh.material.opacity = this.overMaterial.opacity;
    }

    overWrong() {
        this.boxMesh.material = this.overWrongMaterial;
        this.boxMesh.material.opacity = this.overWrongMaterial.opacity;
    }

    overRight() {
        this.boxMesh.material = this.overRightMaterial;
        this.boxMesh.material.opacity = this.overRightMaterial.opacity;
    }

    update(selected) {
        if(selected == true){
            this.boxMesh.material.transparent = true;
            this.boxMesh.material.opacity = 0.35;
        }

        else{
            this.boxMesh.material.transparent = false;
        }
    }
}

