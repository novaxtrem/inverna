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
    var imagen = "assets/img/plc.png";
    for (var i = 0; i < arrayModulos.length; i++) {
        htmlToAppend +=
            `<tr>
                <td><img class="rounded-circle me-2" width="30" height="30" src="` + imagen + `">` + arrayModulos[i].id_modulo + `</td>
                <td>` + arrayModulos[i].tipo + `</td>
                <td>` + arrayModulos[i].lectura + `</td>
                <td>` + arrayModulos[i].estado + `</td>
                <td>
                    <button type="button" class="btn-configurar-modulo btn btn-primary" value="` + arrayModulos[i].id_modulo + `" data-toggle="modal" data-target="#myModal">configurar</button>
                </td>
            </tr>`;
    }
    $('#tabla-modulos-activos').html(htmlToAppend)

    $(".btn-configurar-modulo").click(function() {
        alert("Handler for .click() called.");
    });
}
//