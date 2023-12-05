<?php

include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata); 
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);	
	
	$sql = "SELECT  COUNT(COALESCE(me_gusta, '0')) as result FROM like_pelicula where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . " ; ";

    // Reemplaza $mysqli con tu conexión válida a la base de datos	 
    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    } else {
        http_response_code(500); // Cambiado a un código de error interno del servidor
        echo "Hubo un error en la consulta: " . mysqli_error($mysqli); // Muestra el mensaje de error
    }
}

?>

 