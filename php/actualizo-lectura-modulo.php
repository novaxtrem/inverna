<?php
    require 'coneccion.php';
    header('Access-Control-Allow-Origin: *');
    //
    $id_modulo = $_POST['id_modulo'];
    $lectura = $_POST['lectura'];
    //
    $array = [];
    $query = "UPDATE `modulos` SET `lectura`='$lectura' WHERE `id_modulo`='$id_modulo';";
    $result = mysqli_query($conn, $query);
    //
    //$query = "SELECT * FROM `configuraciones` WHERE `id_modulo`='$id_modulo';";
    $query = "SELECT `configuraciones`.*, `modulos`.tipo, `modulos`.lectura FROM   
        `configuraciones` INNER  JOIN `modulos` ON `modulos`.id_modulo = `configuraciones`.id_modulo
        WHERE `modulos`.id_modulo = '$id_modulo';";
    //
    $id_configuracion;
    $valor_objetivo;
    $accion;
    $estado;
    $tipo;
    $lectura;
    //
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
    $age = array('id_configuracion' => $id_configuracion, 'id_modulo' => $id_modulo, 'valor_objetivo' => $valor_objetivo, 'accion' => $accion, 'tipo' => $tipo, 'lectura' => $lectura);
    //$age = '{"lectura":'.$lectura.', "valor_objetivo":'.$valor_objetivo.'}';
    echo json_encode($age);
    //
    $conn->close();
?>