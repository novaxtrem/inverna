<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//
$id_modulo = $_POST['id_modulo'];
$lectura = $_POST['lectura'];

//
$array=[];
$query = "UPDATE `modulos` SET `lectura`='$lectura' WHERE `id_modulo`='$id_modulo';";
$result = mysqli_query($conn, $query);
//
//$query = "SELECT * FROM `configuraciones` WHERE `id_modulo`='$id_modulo';";

$query = "SELECT `configuraciones`.*, `modulos`.tipo, `modulos`.lectura FROM   
    `configuraciones` INNER  JOIN `modulos` ON `modulos`.id_modulo = `configuraciones`.id_modulo
    WHERE `modulos`.id_modulo = '$id_modulo';";


//$result = mysqli_query($conn, $query);


if($result = mysqli_query($conn, $query)){
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          
           //echo  json_encode(array( 'id_configuracion'=> $row['id_configuracion'], 'accion'=> $row['accion'] ));
           echo  json_encode(array($age = '{"accion":'.$row['accion'] .', "valor_objetivo":'.$row['id_configuracion'].'}'));
       
        }
 
        mysqli_free_result($result);
    } else{
        echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 


$conn->close();
