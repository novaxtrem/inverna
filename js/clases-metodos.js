class Sensor {
    constructor(id, estado, temperatura, humedad) {
        this.id = id;
        this.estado = estado;
        this.temperatura = temperatura;
        this.humedad = humedad;
    }
}

class Invernadero {
    constructor(id_invernadero, nombre) {
        this.id_invernadero = id_invernadero;
        this.nombre = nombre;
    }
}

class Controladora {
    constructor(id_controladora, id_invernadero, nombre) {
        this.id_controladora = id_controladora;
        this.id_invernadero = id_invernadero;
        this.nombre = nombre;
    }
}