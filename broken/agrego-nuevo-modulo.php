<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//
$id=$_POST['id'];

$query = "SELECT * FROM `modulos` WHERE `id_modulo`='$id';";
$result = mysqli_query($conn, $query);
//

$row = mysqli_fetch_array($result);

if (empty($row)) {
    echo $query . "\n";
}else {
    //var_dump(mysqli_error($conn)). "\n";
    $row = mysqli_fetch_array($result);
    echo json_encode($row);
  
}
