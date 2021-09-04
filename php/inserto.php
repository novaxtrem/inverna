<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $valor = $_POST['valor'];
    $q = "INSERT INTO `test`(`ID`, `valor`) VALUES ('DEFAULT', '$valor');";
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
?>