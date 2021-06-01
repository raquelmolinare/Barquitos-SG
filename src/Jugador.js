import {MaxEquation} from "../libs/three.module";


export class Jugador {
    constructor(name) {
        this.MAX_BARCOS = 6;
        this.name = name;
        this.puntos = 0; // barco derribado 1 punto
        this.barcosColocados = 0;
    }

    barcoColocado() {
        this.barcosColocados++;
    }

    terminadaColocacion() {
        return this.barcosColocados == this.MAX_BARCOS;
    }

    barcoTocado() {
        this.puntos++;
    }

    ganador() {
        return this.puntos == 20;
    }
}