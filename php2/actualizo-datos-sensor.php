<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $lectura = $_POST['lectura'];
    $tipo = $_POST['tipo'];
    $estado = $_POST['estado'];
    //
    $query = "UPDATE `sensores` SET `nombre`='$nombre',`lectura`='$lectura',`tipo`='$tipo',`estado`='$estado' WHERE `id_sensor`='$id';";
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