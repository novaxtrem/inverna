<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id = $_POST['id'];
    $tipo = $_POST['tipo'];
    $lectura = $_POST['lectura'];
    $estado = $_POST['estado'];

    //
    //$query = "UPDATE `sensores` SET `nombre`='$nombre',`lectura`='$lectura',`tipo`='$tipo',`estado`='$estado' WHERE `id_sensor`='$id';";

    $query = "INSERT INTO `modulos` (`id_modulo`, `tipo`, `lectura`, `estado`) VALUES('$id', '$tipo', '$lectura', DEFAULT) ON DUPLICATE KEY UPDATE `tipo`='$tipo', `lectura`='$lectura', `estado`='$estado';";
    $result = mysqli_query($conn, $query);
    //
    if ($result) {
        echo json_encode("ok");
    } else {
        var_dump(mysqli_error($conn));
        echo $query;
    }
    $conn->close();
?>