<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id=$_GET['id'];
    $query = "SELECT `id_sensor` FROM `sensores` WHERE `id_sensor`='$id';";
    $result = mysqli_query($conn, $query);
    //
    if($result){
       $sensor = mysqli_fetch_assoc($result);
       if(!empty($result)){
        echo json_encode($sensor);
    } else{
        $query = "INSERT INTO `sensores`(`id_sensor`, `nombre`, `lectura`, `tipo`, `estado`) VALUES ('$id','empty',0,'empty','0');";
        $result = mysqli_query($conn, $query);
    }
}
    $conn->close();

?>