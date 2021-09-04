<?php

    //Create connection
 
 header('Access-Control-Allow-Origin: *');

     $dbhost = 'remotemysql.com:3306';
        $dbuser = 'nN3gpTO4n0';
        $dbpass = '2gkHaxV7Xr';
        $dbname = 'nN3gpTO4n0';
        $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

        if (!$conn) {
            die('Could not connect: '.mysqli_error());
            echo ('fallo');
        } else {
         //   echo('Connected successfully');
        }

      $email = $_POST['email'];
      $ordenCompra = $_POST['orden_compra'];
      $total= $_POST['total'];
      
      $q = "INSERT INTO `compras`(`id_compra`, `email`, `orden_compra`, `total`) VALUES  
      (DEFAULT, '$email', '$ordenCompra', '$total');";
      $query = mysqli_query($conn, $q);

    if($query){
        echo json_encode("ok");
        //echo json_encode("Data Inserted Successfully");
    }else {
        var_dump(mysqli_error($conn));
        echo $query;
    }
     
?>