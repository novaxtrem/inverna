<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//
$id = $_POST['id'];
$query = "SELECT * FROM `modulos` WHERE `id_modulo`='$id';";
$result = mysqli_query($conn, $query);
//
if ($result) {
    while ($row = mysqli_fetch_array($result)) {
        $id = $row['id_modulo'];
        $tipo = $row['tipo'];
        $lectura = $row['lectura'];
        $estado = $row['estado'];
        //
        $return_arr[] = array(
            "id_modulo" => $id,
            "tipo" => $tipo,
            "lectura" => $lectura,
            "estado" => $estado
        );
        echo json_encode($return_arr);
    }
} else {
    var_dump(mysqli_error($conn));
    echo $consulta;
}
$conn->close();

