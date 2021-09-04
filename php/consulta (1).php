<?php
    //require("conexion.php");
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
$rows = array();
//$query = "SELECT * FROM usuarios";

$username=$_GET['username'];
$password=$_GET['password'];

$query="SELECT * FROM usuarios WHERE email='$username' AND password='$password'";
//echo $query;


$resultado = mysqli_query($conn, $query);
// Inserta este if
if(!$resultado) {
    var_dump(mysqli_error($conn));
    exit;
}
while ($row = mysqli_fetch_assoc($resultado)) {
    $rows[] = $row;
 // printf ("%s (%s)\n", $row["name"], $row["email"]);
   // printf ($row["name"]. " ");
}
    
     //Send the array back as a JSON object
    echo json_encode($rows);
?>