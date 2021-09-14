var sensorID;

$(document).ready(function() {

    var botonSensor = $('.btn-configurar-sensor');


    botonSensor.click(function() {
        sensorID = ($(this).attr("value"));

        generoHTMLConfiguracionSensor(sensorID);


    });






});


function generoHTMLConfiguracionSensor(sensorID) {
    var configurarSensor = `
    <div class="uk-container uk-container-small">
        <div class="uk-section uk-section-muted">
            <div class="uk-container">
                <h3>ID_Sensor : ` + sensorID + `</h3>
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
                            <input class="uk-input" id="form-horizontal-text" type="text" placeholder="ingrese nombre">
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-select">Tipo de sensor</label>
                        <div class="uk-form-controls">
                            <select class="uk-select" id="form-horizontal-select">
                                <option>Seleccionar tipo</option>
                                <option>Humedad</option>
                                <option>Temperatura</option>
                            </select>
                        </div>
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
                            <label class="uk-form-label" for="form-stacked-text">Salida</label>
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label><input class="uk-checkbox" type="checkbox"> 1</label>
                                <label><input class="uk-checkbox" type="checkbox"> 2</label>
                                <label><input class="uk-checkbox" type="checkbox"> 3</label>
                                <label><input class="uk-checkbox" type="checkbox"> 4</label>
                                <label><input class="uk-checkbox" type="checkbox"> 5</label>
                                <label><input class="uk-checkbox" type="checkbox"> 6</label>
                            </div>
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
    $('#configurar-sensor-container').html(configurarSensor);
};