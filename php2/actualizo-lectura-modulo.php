<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id = $_POST['id'];
    $lectura = $_POST['lectura'];
    //
    $query = "UPDATE `modulos` SET `lectura`='$lectura' WHERE `id_modulo`='$id';";
    $result = mysqli_query($conn, $query);
    //
    if ($result) {
        echo json_encode("respuesta: ok");
    } else {
        var_dump(mysqli_error($conn));
        echo $query;
    }
    $conn->close();
?>