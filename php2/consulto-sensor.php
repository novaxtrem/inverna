<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//
$id = $_POST['id'];
$query = "SELECT * FROM sensores WHERE `id_sensor`='$id';";
$result = mysqli_query($conn, $query);
//
if ($result) {
    while ($row = mysqli_fetch_array($result)) {
        $id = $row['id_sensor'];
        $nombre = $row['nombre'];
        $lectura = $row['lectura'];
        $tipo = $row['tipo'];
        $estado = $row['estado'];
        //
        $return_arr[] = array(
            "id_sensor" => $id,
            "nombre" => $nombre,
            "lectura" => $lectura,
            "tipo" => $tipo, "estado" => $estado
        );
        echo json_encode($return_arr);
    }
} else {
    var_dump(mysqli_error($conn));
    echo $consulta;
}
$conn->close();
    //
