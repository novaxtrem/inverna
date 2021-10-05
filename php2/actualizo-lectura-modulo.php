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
    //$query = "SELECT * FROM `configuraciones` WHERE `id_modulo`='$id';";
    $query = "SELECT configuraciones.*, modulos.tipo, modulos.lectura FROM   
    `configuraciones` INNER  JOIN `modulos` ON modulos.id_modulo = configuraciones.id_modulo
    WHERE modulos.id_modulo = '$id';";

    $result = mysqli_query($conn, $query);

    while ($row = $result->fetch_assoc()) {

      
        
        $id_configuracion = $row['id_configuracion'];
        $id_modulo = $row['id_modulo'];
        $valor_objetivo = $row['valor_objetivo'];
        $accion = $row['accion'];
        $estado = $row['estado'];
        $tipo = $row['tipo'];
        $lectura = $row['lectura'];
    }

    $age = array('lectura' =>$lectura, 'id_modulo'=> $id_modulo);
    //$age = '{"lectura":'.$lectura.', "valor_objetivo":'.$valor_objetivo.'}';
    //echo json_encode($age);
    //$string_version = implode(',', $age);
    //echo $string_version;
    //echo print_r($age, true);
    //$json_array = json_encode($arr);
    //echo $json_array;
    echo ('{"lectura": ' .$lectura. ', "id_modulo": ' .$id_modulo. '}');
    //$age = array("respuesta" => "ok", "valor_objetivo" => "$valor_objetivo");
    //echo json_encode($age);
} else {
    var_dump(mysqli_error($return_arr));
    echo $query;
}
$conn->close();
