<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $query = "SELECT * FROM `modulos`;";
    $result = mysqli_query($conn, $query);
    //
    if ($result->num_rows > 0) {
        while ($modulo = mysqli_fetch_assoc($result)) {
            $arrayModulos[] = array_map('utf8_encode', $modulo);
        }
        echo json_encode($arrayModulos);
    } else {
        //echo json_encode("respuesta: no hay modulos activos");
    }
    $conn->close();
?>