$(document).ready(function() {

    $("#test").click(function() {
        variable = $("#dato").text();

        inserto(variable);
    });

    function inserto(variable) {

        $.ajax({
            url: INSERT_POST,
            type: "post",
            data: { ID: "", valor: variable },
            success: function(data) {
                console.log(data);
                alert(CORRECTO_MSJ);
            }
        });

    };
})