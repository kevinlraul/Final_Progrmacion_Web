<?php
/*
include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata); 
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);	
	
	$sql = "SELECT DISTINCT no_megusta FROM like_pelicula where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . "  LIMIT 1; ";

    // Reemplaza $mysqli con tu conexión válida a la base de datos	 
    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = [];
        
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        } else {
            // Cuando no se encuentran resultados, asigna 'N' directamente a $rows
            $rows[] = ['no_megusta' => 'N'];
        }

        echo json_encode($rows);
    } else {
        http_response_code(500); // Cambiado a un código de error interno del servidor
        echo "Hubo un error en la consulta: " . mysqli_error($mysqli); // Muestra el mensaje de error
    }
}*/

include_once "database.php";

// Comprueba si los parámetros están presentes en la URL
if (isset($_GET['pelicula_id']) && isset($_GET['user_id'])) {
    $pelicula_id = intval($_GET['pelicula_id']);
    $user_id = intval($_GET['user_id']);

    $sql = "SELECT DISTINCT no_megusta FROM like_pelicula WHERE pelicula_id = $pelicula_id AND user_id = $user_id LIMIT 1";

    // Reemplaza $mysqli con tu conexión válida a la base de datos	 
    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = [];
        
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        } else {
            // Cuando no se encuentran resultados, asigna 'N' directamente a $rows
            $rows[] = ['me_gusta' => 'N'];
        }

        echo json_encode($rows);
    } else {
        http_response_code(500); // Cambiado a un código de error interno del servidor
        echo "Hubo un error en la consulta: " . mysqli_error($mysqli); // Muestra el mensaje de error
    }
} else {
    // Manejo de error si los parámetros no están presentes en la URL
    http_response_code(400); // Código de error de solicitud incorrecta
    echo "Parámetros 'pelicula_id' y 'user_id' faltantes en la solicitud.";
}


?>
