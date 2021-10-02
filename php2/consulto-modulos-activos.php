<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $query = "SELECT * FROM `modulos`;";
    $result = mysqli_query($conn, $query);
    //
    if($result){
        while ($modulo = mysqli_fetch_array($result)) {
            $arrayModulos[] = array_map('utf8_encode', $modulo);
        }
    }
    echo json_encode($arrayModulos);
    $conn->close();
?>