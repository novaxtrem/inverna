var listaInvernaderos = [];

var listaControladoras = [];

$(document).ready(function() {

    $("#test").click(function() {
        variable = $("#dato").text();

        inserto(variable);
    });


    // cargoArrayInvernaderos();
    cargoArrayControladoras();
    // //
    //
    // dibujoTablaInvernaderos();
    dibujoControladoras();
    //

    $('.btn-configuracion').click(function() {
        configurarInvernadero(this);
    });
    $('#btn-agregar-invernadero').click(function() {
        var nombreInventario = $('#input-agrego-invernadero').val();
        agregoInvernaderos(nombreInventario);
        $('#input-agrego-invernadero').val("");
    });


});


function configurarInvernadero(btnConfiguracion) {
    /* Remove row from DOM and recalc cart total */
    var invernaderoRow = $(btnConfiguracion).parent().parent();
    var id_invernadero = parseInt(invernaderoRow.children('td[name="id-invernadero"]').text());
    var nombreInvernadero = invernaderoRow.children('td[name="nombre"]').text();

    alert(nombreInvernadero);

}



function agregoInvernaderos(variable) {

    $.ajax({
        url: AGREGO_INVERNADEROS,
        type: "post",
        data: { id: "DEFAULT", nombre: variable },
        success: function(data) {
            console.log(data);
        }
    });

};









function cargoArrayInvernaderos() {
    return $.ajax({
        url: CONSULTO_INVERNADEROS,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var invernadero = new Invernadero(data[i].id_invernadero, data[i].nombre);
                listaInvernaderos.push(invernadero);
            }
        }
    });
};

function cargoArrayControladoras() {
    return $.ajax({
        url: CONSULTO_CONTROLADORAS,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var controladora = new Controladora(data[i].id_controladora, data[i].id_invernadero, data[i].nombre);
                listaControladoras.push(controladora);
            }
        }
    });
};





function dibujoTablaInvernaderos() {
    var htmlContentToAppend = "";
    for (var i = 0; i < listaInvernaderos.length; i++) {
        htmlContentToAppend += `
                <tr>
                    <td name="id-invernadero" data-label="id">` + listaInvernaderos[i].id_invernadero + `</td>
                    <td name="nombre" data-label="nombre">` + listaInvernaderos[i].nombre + `</td>
                    <td data-label="configuracion"> 
                        <button class="ui basic button btn-configuracion"><i class="sliders horizontal"></i>
                            Configurar
                        </button>
                    </td>
                </tr>`
        document.getElementById("tabla-invernaderos-tbody-container").innerHTML = htmlContentToAppend;
    }
}


function dibujoControladoras() {
    var htmlContentToAppend = "";
    for (var i = 0; i < listaControladoras.length; i++) {
        htmlContentToAppend += `
        <option value="">` + listaControladoras[i].nombre + `</option>
        `
            //variante// <option value="">` + listaControladoras[i].id_controladora + " " + listaControladoras[i].id_invernadero + " " + listaControladoras[i].nombre + `</option>`

        document.getElementById("controladoras-container").innerHTML = htmlContentToAppend;
    }
}