<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $query = "SELECT * FROM sensores;";
    $result = mysqli_query($conn, $query);
    //
    if($result){
        while ($sensor = mysqli_fetch_array($result)) {
            $arraySensores[] = array_map('utf8_encode', $sensor);
        }
    }
    echo json_encode($arraySensores);
    $conn->close();
?>