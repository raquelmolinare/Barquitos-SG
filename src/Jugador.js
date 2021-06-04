
export class Jugador {
    constructor(name) {
        this.MAX_BARCOS = 6;
        this.name = name;
        this.puntos = 0; // barco derribado 1 punto
        this.barcoActual = 0;
        this.MAX_PUNTOS = 20;
    }

    getBarcoActual() {
        return this.barcoActual + 2;
    }

    barcoColocado() {
        this.barcoActual++;
    }

    terminadaColocacion() {
        return this.barcoActual == this.MAX_BARCOS - 1;
    }

    barcoTocado() {
        this.puntos++;
    }

    ganador() {
        return this.puntos == this.MAX_PUNTOS;
    }
}