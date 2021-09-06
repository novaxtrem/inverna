<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//


$id = $_POST['id'];
$nombre = $_POST['nombre'];


$q = "INSERT INTO `invernaderos`(`id_invernadero`, `nombre`) VALUES ('$id', '$nombre');";
$query = mysqli_query($conn, $q);
//
if ($query) {
    //echo json_encode("ok");
    //echo json_encode("Data Inserted Successfully");
} else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
    //
