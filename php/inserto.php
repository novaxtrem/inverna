<?php

    //Create connection
 
 header('Access-Control-Allow-Origin: *');

     $dbhost = 'localhost:3306';
        $dbuser = 'epicoTest';
        $dbpass = 'inverna';
        $dbname = 'invernadero';
        $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

        if (!$conn) {
            die('Could not connect: ' .mysqli_error());
            echo ('fallo');
        } else {
         //   echo('Connected successfully');
        }

      $valor = $_POST['valor'];
     
      
      $q = "INSERT INTO `test`(`ID`, `valor`) VALUES  
      (DEFAULT, '$valor');";
      $query = mysqli_query($conn, $q);

    if($query){
        echo json_encode("ok");
        //echo json_encode("Data Inserted Successfully");
    }else {
        var_dump(mysqli_error($conn));
        echo $query;
    }
    function mysqli_error(){
         
    }
?>