var modulo = new Modulo();
var arrayModulos = [];

$(document).ready(function() {

    consultoModulosActivos();
    dibujoModulos(arrayModulos);
    //
    //var botonModulo = $('.btn-configurar-modulo');
    //var botonAgregarModulo = $('#btn-agregar-modulo');
    //agregoListeners(botonModulo, botonAgregarModulo);



    //
});


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


function dibujoModulos(arrayModulos) {
    var htmlToAppend = "";
    const imagen = "assets/img/plc.png";
    for (var i = 0; i < arrayModulos.length; i++) {
        htmlToAppend +=
            `<tr>
                <td><img class="rounded-circle me-2" width="30" height="30" src="` + imagen + `">` + arrayModulos[i].id_modulo + `</td>
                <td>` + arrayModulos[i].tipo + `</td>
                <td>` + arrayModulos[i].lectura + `</td>
                <td>` + arrayModulos[i].valorObjetivo + `</td>
                <td>` + arrayModulos[i].accion + `</td>
                <td>
                    <button type="button" class="btn-configurar-modulo btn btn-primary" value="` + arrayModulos[i].id_modulo + `">configurar</button>
                </td>
            </tr>`;

    }
    $('#tabla-modulos-activos').html(htmlToAppend)

    $(".btn-configurar-modulo").click(function() {
        consultomodulo(this);
        dibujoPanelConfigurarModulo(modulo);
        $('#exampleModalCenter').modal('show');
    });

}
//

//
function consultomodulo(variable) {
    var moduloID = variable.value;
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










function dibujoPanelConfigurarModulo(modulo) {
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
                <h1 class="uk-heading-bullet" value="` + modulo.id_modulo + `">Cofigurar Modulo</h1>
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
                <button class="uk-button uk-button-primary uk-button-small">ACEPTAR</button>  
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