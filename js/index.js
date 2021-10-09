var modulo = Modulo();
var arrayModulos = [];

$(document).ready(function() {

    consultoModulosActivos();
    dibujoModulos(arrayModulos);
    //
    var botonModulo = $('.btn-configurar-modulo');
    var botonAgregarModulo = $('#btn-agregar-modulo');
    agregoListeners(botonModulo, botonAgregarModulo);
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
function agregoNuevoModulo() {
    var idModulo = $("#form-stacked-text-id-modulo-nuevo-id").val();
    var tipo = $('#form-stacked-select-nuevo-modulo-tipo option:selected').val();
    //
    $.ajax({
        url: AGREGO_NUEVO_MODULO,
        method: 'POST',
        async: false,
        dataType: "JSON",
        data: { id: idModulo, tipo: tipo },
        success: function(data) {
            /*modulo = {
                id_modulo: data[0].id_modulo,
                tipo: data[0].tipo,
                lectura: data[0].lectura,
                estado: data[0].estado
            };*/
            consultoModulosActivos();
            if (jQuery.isEmptyObject(data)) {
                alert("Empty Object");
            }
        }
    });
};
//
function agregoActualizoConfiguracion(modulo) {

    var objetivo = $("#form-horizontal-text-valor-objetivo").val();
    var accion = $('#form-horizontal-select-configuro-accion option:selected').val();
    //

    if (modulo.tipo == $('#form-horizontal-select-tipo-configuro-modulo option:selected').val()) {
        $.ajax({
            url: "php2/configuro-modulo.php",
            method: 'POST',
            async: false,
            dataType: "JSON",
            data: { id: modulo.id_modulo, objetivo: objetivo, accion: accion },
            success: function(data) {
                /*modulo = {
                    id_modulo: data[0].id_modulo,
                    tipo: data[0].tipo,
                    lectura: data[0].lectura,
                    estado: data[0].estado
                };*/
                //consultoModulosActivos();
                if (jQuery.isEmptyObject(data)) {
                    alert("Empty Object");
                }
            }
        });
    } else {

    }

};


function dibujoModulos(arrayModulos) {
    var htmlToAppend = "";
    for (var i = 0; i < arrayModulos.length; i++) {
        htmlToAppend += `
        <button class="uk-button uk-button-default btn-configurar-modulo" value="` + arrayModulos[i].id_modulo + `">` + arrayModulos[i].id_modulo + `</button>`;
    }
    $('#contenedor-modulos-activos').html(htmlToAppend)
}
//
function dibujoPanelConfigurarModulo(modulo) {

    $("#agregar-modulo-container").empty();
    //
    var tipoModuloToAppend = `
        <select class="uk-select" id="form-horizontal-select-tipo-configuro-modulo">
            <option value="NO">Seleccionar tipo</option>
            <option value="Humedad">Humedad</option>
            <option value="Temperatura">Temperatura</option>
            <option value="PH">PH</option>
        </select>`;
    //
    htmlToAppend = `
        <form class="uk-form-horizontal uk-margin-large">
            <div class="uk-margin">
                <h1 class="uk-heading-bullet" value="ID-CONFIGURACION">Cofigurar Modulo</h1>
                <label class="uk-form-label" for="form-horizontal-text">ID MODULO</label>
                <div class="uk-form-controls">
                    <input class="uk-input" id="form-horizontal-text" type="text" value="` + modulo.id_modulo + `" placeholder="` + modulo.id_modulo + `" disabled>
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-select-tipo">TIPO MODULO</label>
                <div class="uk-form-controls">` + tipoModuloToAppend + `
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">LECTURA</label>
                <div class="uk-form-controls">
                    <input class="uk-input" id="form-horizontal-text" type="text" value="` + modulo.lectura + `" placeholder="` + modulo.lectura + `" disabled>
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-text">OBJETIVO</label>
                <div class="uk-form-controls">
                    <input class="uk-input" id="form-horizontal-text-valor-objetivo" type="text" placeholder="ingrese valor deseado">
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-horizontal-select-accion">ACCION</label>
                <div class="uk-form-controls">
                    <select class="uk-select" id="form-horizontal-select-configuro-accion">
                        <option value="ON">encender</option>
                        <option value="OFF">apagar</option>
                    </select>
                </div>
            </div>
            <p uk-margin>
                <button class="uk-button uk-button-default uk-button-small">CANCELAR</button>
                <button class="uk-button uk-button-primary uk-button-small" onclick="agregoActualizoConfiguracion(modulo)">ACEPTAR</button>  
            </p>
        </form>`;
    //
    $('#configurar-modulo-container').html(htmlToAppend);
    //
    if (typeof modulo.tipo != 'undefined' || modulo.tipo != null) {
        var options = document.getElementById('form-horizontal-select-tipo-configuro-modulo').options;
        for (let i = 0; i < options.length; i++) {
            if (modulo.tipo == options[i].value) {
                document.getElementById("form-horizontal-select-tipo-configuro-modulo").options[i].selected = 'selected';
            }
        }
        //$('#form-horizontal-select-tipo').prop('disabled', true);
    }
};
//
function dibujoPanelAgregarModulo() {

    $("#configurar-modulo-container").empty();
    //
    htmlToAppend = `
        <form class="uk-form-stacked">
            <div class="uk-margin">
            <h1 class="uk-heading-bullet">AGREGAR MODULO</h1>
                <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text-id-modulo-nuevo-id" type="text" placeholder="ingrese id del modulo">
                </div>
            </div>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-select">TIPO DE MODULO</label>
                <div class="uk-form-controls">
                    <select class="uk-select" id="form-stacked-select-nuevo-modulo-tipo">
                        <option value="NO">Seleccionar tipo</option>
                        <option value="Humedad">Humedad</option>
                        <option value="Temperatura">Temperatura</option>
                        <option value="PH">PH</option>
                    </select>
                </div>
            </div>
            <p uk-margin>
                <button class="uk-button uk-button-default uk-button-small" id="btn-cancelar">CANCELAR</button>
                <button class="uk-button uk-button-primary uk-button-small" id="btn-aceptar-agregar-modulo" onclick="agregoNuevoModulo()">ACEPTAR</button>  
            </p>
        </form>`;
    //
    $('#agregar-modulo-container').html(htmlToAppend);
};










function agregoListeners(botonModulo, botonAgregarModulo) {

    botonModulo.click(function() {
        dibujoPanelConfigurarModulo((consultomodulo($(this).attr("value"))));
    });
    //
    botonAgregarModulo.click(function() {
        dibujoPanelAgregarModulo();
    });
}