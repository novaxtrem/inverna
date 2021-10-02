var moduloID;
var modulo = new Modulo();
var arrayModulos = [];

$(document).ready(function() {




    consultoModulosActivos();
    dibujoModulos(arrayModulos);
    //
    var botonModulo = $('.btn-configurar-modulo');
    agregoListeners(botonModulo);
    //
});



//
function consultoModulosActivos() {
    $.ajax({
        url: GET_CONSULTO_MODULOS,
        timeout: 1000,
        method: 'GET',
        async: false,
        dataType: "JSON",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                modulo = {
                    id_modulo: data[i].id_modulo,
                    tipo: data[i].tipo,
                    lectura: data[i].lectura,
                    estado: data[i].estado
                };
                arrayModulos.push(modulo);
            }
        },
        fail: function(data) {
            if (jQuery.isEmptyObject(data)) {
                alert("Empty Object");
            }
        }
    });
}
//
function consultomodulo(moduloID) {
    $.ajax({
        url: CONSULTO_MODULO,
        method: 'POST',
        async: false,
        data: { id: moduloID },
        dataType: "JSON",
        success: function(data) {
            modulo = {
                id_modulo: data[0].id_modulo,
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
    return modulo;
};



//


function dibujoModulos(arrayModulos) {
    var htmlToAppend = "";
    for (var i = 0; i < arrayModulos.length; i++) {
        htmlToAppend += `
        <button class="uk-button uk-button-default btn-configurar-modulo" value="` + arrayModulos[i].id_modulo + `">` + arrayModulos[i].id_modulo + `</button>`;
    }
    $('#contenedor-modulos-activos').html(htmlToAppend)
}



function dibujoConfiguracionmodulo(modulo) {

    var tipomodulo;
    var nombremodulo;
    var estadomodulo;
    var lecturamodulo;
    //
    console.log(modulo);

    tipomodulo = `
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
    var configurarmodulo = `
    <div class="uk-container uk-container-small">
        <div class="uk-section uk-section-muted">
            <div class="uk-container">
                <h3>ID_modulo : ` + modulo.id_modulo + `</h3>
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
                            <label class="uk-form-label" for="form-horizontal-text">Estado del modulo</label>
                            <div class="uk-form-controls">
                                <div class="uk-margin">
                                    <input class="uk-input uk-form-success uk-form-width-large" type="text" placeholder="en linea" value="en linea" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-horizontal-select">Tipo de modulo</label>` + modulo.tipo + `
                        
                    </div>
                    <div class="uk-grid-small" uk-grid>

                        <div class="uk-width-1-3@s">
                            <label class="uk-form-label" for="form-stacked-text">Lectura actual</label>
                            <input class="uk-input uk-form-width-large" type="text" placeholder="" value="` + +`" readonly>
                        </div>
                        
                        <div class="uk-width-1-3@s">
                            <label class="uk-form-label" for="form-stacked-text">Valor deseado</label>
                            <input class="uk-input uk-form-width-large" type="text" placeholder="ingrese valor" value="">
                        </div>
                        <div class="uk-width-1-3@s">
                            <label class="uk-form-label" for="form-stacked-text">Accion</label>
                            <select class="uk-select" id="form-horizontal-select">
                                <option>Seleccionar</option>
                                <option>Encender</option>
                                <option>Apagar</option>
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

    $('#configurar-modulo-container').html(configurarmodulo)

    /*if (typeof modulo.tipo != 'undefined' || modulo.tipo != null) {
        var options = document.getElementById('form-horizontal-select').options;
        for (let i = 0; i < options.length; i++) {
            if (modulo.tipo == options[i].value) {
                document.getElementById("form-horizontal-select").options[i].selected = 'selected';
            }
        }
        $('#form-horizontal-select').prop('disabled', true);
    }*/
};



















function agregoListeners(botonModulo) {

    botonModulo.click(function() {


        dibujoConfiguracionmodulo((consultomodulo($(this).attr("value"))));
    });



}