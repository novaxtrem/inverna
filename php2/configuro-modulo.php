<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id = $_POST['id'];
    $objetivo = $_POST['objetivo'];
    $accion =  $_POST['accion'];
    //
    $query = "SELECT * FROM `configuraciones` WHERE `id_modulo`='$id';";
    $result = mysqli_query($conn, $query);
    //
    if ($result->num_rows > 0) {
        $query = "UPDATE `configuraciones` SET `valor_objetivo`='$objetivo', `accion`='$accion', `estado`=DEFAULT WHERE `id_modulo`='$id';";
        $result = mysqli_query($conn, $query);
    } else {
        $query = "INSERT INTO `configuraciones` (`id_configuracion`, `id_modulo`, `valor_objetivo`, `accion`, `estado`)  VALUES(DEFAULT, '$id', '$objetivo', '$accion',DEFAULT);";
        $result = mysqli_query($conn, $query);
    }
    $conn->close();
?>
