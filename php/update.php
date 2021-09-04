<?php
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

      $name = $_POST['name'];
      $lastname = $_POST['last_name'];
      $age= $_POST['age'];
      $imgProfile = $_POST['image_profile'];
      $phoneNum = $_POST['phone_num'];
      $email = $_POST['email'];
      $pass = $_POST['password'];
    //
      $q = "UPDATE `usuarios` SET `name`='$name',`last_name`='$lastname',`age`='$age',`image_profile`='$imgProfile',`phone_num`='$phoneNum',`password`='$pass' WHERE `email`='$email';";
      $query = mysqli_query($conn, $q);
    
    if($query){
        $query="SELECT * FROM usuarios WHERE `email`='$email';";
        $resultado = mysqli_query($conn, $query);
        if(!$resultado) {
            var_dump(mysqli_error($conn));
            exit;
        } else {
            $rows=[];
            while ($row = mysqli_fetch_assoc($resultado)) {
            $rows = $row;
              echo json_encode($rows);
            }
      
        }
    }else {
        var_dump(mysqli_error($conn));
        echo $query;
    }
?>