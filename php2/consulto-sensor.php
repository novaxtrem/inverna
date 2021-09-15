<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//
$id = $_POST['id'];
$query = "SELECT id_sensor, nombre, lectura, tipo, estado FROM sensores WHERE `id_sensor`='$id';";
$result = mysqli_query($conn, $query);


//
$rows = array();



if ($result) {

    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
        echo json_encode($rows);
    }



  
} else {
    var_dump(mysqli_error($conn));
    echo $consulta;
}
$conn->close();
    //
