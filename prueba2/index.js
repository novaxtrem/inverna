var sensorID;

var sensor = new Sensor();
var arraySensores = [];

$(document).ready(function() {




    consultoSensoresConectados();
    dibujoSensores(arraySensores);
    var botonSensor = $('.btn-configurar-sensor');
    var botonConfiguracion = $('#nueva-configuracion');
    var botonAgregarModulo = $('btn-agregar-modulo');



    botonConfiguracion.click(function() {

        dibujoConfiguracion();


    });

    botonSensor.click(function() {
        sensorID = ($(this).attr("value"));

        consultoSensor(sensorID);

        dibujoConfiguracionSensor();

    });





});

function populoOptionsDesplegableSensores() {


    var desplegable = document.getElementById('form-horizontal-select-sensores');
    for (var i = 0; i < arraySensores.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = arraySensores[i].nombre;
        option.value = arraySensores[i].id_sensor;
        desplegable.appendChild(option);
    }

}


function dibujoConfiguracion() {
    var htmlToAppend = "";








    htmlToAppend = `
        <form class="uk-form-horizontal uk-margin-large">
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-select-sensores">Selecciona sensor</label>
                <div class="uk-form-controls">
                    <select class="uk-select" id="form-horizontal-select-sensores">
                    </select>
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">lectura</label>
                <div class="uk-form-controls">
                    <input class="uk-input" id="form-horizontal-text" type="text" placeholder="Some text..." disabled>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-select">condicion</label>
                <div class="uk-form-controls">
                    <select class="uk-select" id="form-horizontal-select">
                        <option value="menor">menor que</option>
                        <option value="mayor">mayor que</option>
                    </select>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">valor deseado</label>
                <div class="uk-form-controls">
                    <input class="uk-input" id="form-horizontal-text" type="text" placeholder="Some text...">
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-select">accion</label>
                <div class="uk-form-controls">
                    <select class="uk-select" id="form-horizontal-select">
                        <option value="encender">encender</option>
                        <option value="apagar">apagar</option>
                    </select>
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-select">seleccionar rele</label>
                <div class="uk-form-controls">
                    <select class="uk-select" id="form-horizontal-select">
                        <option>Option 01</option>
                        <option>Option 02</option>
                    </select>
                </div>
            </div>
        </form>
        <a id="btn-guardar-configuracion" class="uk-button uk-button-default" href="">aceptar</a>
    `
    $('#configuraciones').html(htmlToAppend);
    populoOptionsDesplegableSensores();
}


function consultoSensoresConectados() {

    $.ajax({
        url: GET_CONSULTO_SENSORES,
        timeout: 1000,
        method: 'GET',
        async: false,
        dataType: "JSON",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                sensor = {
                    id_sensor: data[i].id_sensor,
                    nombre: data[i].nombre,
                    lectura: data[i].lectura,
                    tipo: data[i].tipo,
                    estado: data[i].estado
                };
                arraySensores.push(sensor);
            }
        },
        fail: function(data) {
            if (jQuery.isEmptyObject(data)) {
                alert("Empty Object");
            }
        }
    });
}


function dibujoSensores(arraySensores) {
    var htmlToAppend = "";
    for (var i = 0; i < arraySensores.length; i++) {
        htmlToAppend += `
        <a class="uk-button uk-button-default btn-configurar-sensor" value="` + arraySensores[i].id_sensor + `">` + arraySensores[i].nombre + `</a>
        `;
    }
    $('#contenedor-sensores-activos').html(htmlToAppend)
}

function consultoSensor(variable) {
    $.ajax({
        url: CONSULTO_SENSOR,
        method: 'POST',
        async: false,
        data: { id: variable },
        dataType: "JSON",
        success: function(data) {
            sensor = {
                id_sensor: data[0].id_sensor,
                nombre: data[0].nombre,
                lectura: data[0].lectura,
                tipo: data[0].tipo,
                estado: data[0].estado
            };
            if (jQuery.isEmptyObject(data)) {
                alert("Empty Object");
            }
        }
    });
};


function dibujoConfiguracionSensor() {

    var tipoSensor;
    var nombreSensor;
    var estadoSensor;
    var lecturaSensor;
    //
    nombreSensor = sensor.nombre;

    tipoSensor = `
    <div class="uk-form-controls">
        <select class="uk-select" id="form-horizontal-select">
            <option>Seleccionar tipo</option>
            <option>Humedad</option>
            <option>Temperatura</option>
            <option>PH</option>
        </select>
    </div>
    `;
    //
    var configurarSensor = `
    <div class="uk-container uk-container-small">
        <div class="uk-section uk-section-muted">
            <div class="uk-container">
                <h3>ID_Sensor : ` + sensor.id_sensor + `</h3>
                <form class="uk-form-horizontal uk-margin-large">
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <div class="uk-form-label">Enceder/Apagar</div>
                            <div class="uk-form-controls uk-form-controls-text">
                                <div class="uk-margin">
                                    <label class="uk-switch" for="on-1"><input type="checkbox" id="on-1"><div class="uk-switch-slider uk-switch-on-off round"></div></label>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="uk-form-label" for="form-horizontal-text">Estado del sensor</label>
                            <div class="uk-form-controls">
                                <div class="uk-margin">
                                    <input class="uk-input uk-form-success uk-form-width-large" type="text" placeholder="en linea" value="en linea" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-text">Nombre del sensor</label>
                        <div class="uk-form-controls">
                            <input class="uk-input" id="form-horizontal-text" type="text" placeholder="" value="` + nombreSensor + `">
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-select">Tipo de sensor</label>` + tipoSensor + `
                        
                    </div>
                    <div class="uk-grid-small" uk-grid>

                        <div class="uk-width-1-5@s">
                            <label class="uk-form-label" for="form-stacked-text">Lectura actual</label>
                            <input class="uk-input uk-form-width-large" type="text" placeholder="" value="30 variable_name" readonly>
                        </div>
                        <div class="uk-width-1-5@s">
                            <label class="uk-form-label" for="form-stacked-text">Condicion</label>
                            <select class="uk-select" id="form-horizontal-select">
                                <option>Seleccionar</option>
                                <option>menor que</option>
                                <option>mayor que</option>
                            </select>
                        </div>
                        <div class="uk-width-1-5@s">
                            <label class="uk-form-label" for="form-stacked-text">Valor deseado</label>
                            <input class="uk-input uk-form-width-large" type="text" placeholder="ingrese valor" value="">
                        </div>
                        <div class="uk-width-1-5@s">
                            <label class="uk-form-label" for="form-stacked-text">Accion</label>
                            <select class="uk-select" id="form-horizontal-select">
                                <option>Seleccionar</option>
                                <option>Encender</option>
                                <option>Apagar</option>
                            </select>
                        </div>
                        <div class="uk-width-1-5@s">
                            <label class="uk-form-label" for="form-stacked-text">Rele</label>
                            <select class="uk-select" id="form-horizontal-select">
                                <option>Seleccionar</option>
                                <option>Rele 1</option>
                                <option>Rele 2</option>
                                <option>Rele 3</option>
                                <option>Rele 4</option>
                            </select>
                        </div>
                    
                    </div>
                    <p uk-margin>
                        <button class="uk-button uk-button-danger">cancelar</button>
                        <button class="uk-button uk-button-default">aceptar</button>
                    </p>
                </form>
            </div>
        </div>   
    </div>`;

    $('#configurar-sensor-container').html(configurarSensor)

    if (typeof sensor.tipo != 'undefined' || sensor.tipo != null) {
        var options = document.getElementById('form-horizontal-select').options;
        for (let i = 0; i < options.length; i++) {
            if (sensor.tipo == options[i].value) {
                document.getElementById("form-horizontal-select").options[i].selected = 'selected';
            }
        }
        $('#form-horizontal-select').prop('disabled', true);
    }
};

function agregoNuevoSensor(variable) {
    $.ajax({
        url: AGREGO_NUEVO_MODULO,
        method: 'POST',
        async: false,
        data: { id: variable },
        dataType: "JSON",
        success: function(data) {
            sensor = {
                id_sensor: data[0].id_sensor,
                tipo: data[0].tipo,
                lectura: data[0].lectura,
                estado: data[0].estado
            };
            if (jQuery.isEmptyObject(data)) {
                alert("Empty Object");
            }
        }
    });
};