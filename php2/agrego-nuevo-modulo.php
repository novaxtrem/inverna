<?php
    require 'coneccion.php';
    require 'constantes.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id = $_POST['id'];
    $tipo = $_POST['tipo'];
    //
    if (is_numeric($id)) {
        $query = "SELECT * FROM `modulos` WHERE `id_modulo`='$id';";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_object($result);
        //
        if (!empty($row)) {
            //echo json_encode($row);
            echo json_encode(constant("DUPLICADO"));
        } else {
            $query = "INSERT INTO `modulos` (`id_modulo`, `tipo`, `lectura`, `estado`) VALUES('$id', '$tipo', '0.0', DEFAULT);";
            $result = mysqli_query($conn, $query);
            //
            if (!empty($result)) {
                echo json_encode(constant("INSERTOK"));
            } else {
                echo json_encode(constant("INSERTFAIL")) . "\n";
            }
        }
    } else {
        echo json_encode(constant("MALFORMATO"));
    }
?>