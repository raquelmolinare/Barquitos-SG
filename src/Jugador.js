

export class Jugador {
    constructor(name) {
        this.name = name;
        this.puntos = 0; // barco derribado 1 punto
    }

    barcoTocado() {
        this.puntos++;
    }

    ganador() {
        return this.puntos == 20;
    }
}