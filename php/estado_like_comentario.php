<?php
include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata); 
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);	
	
	$sql = "SELECT me_gusta,no_megusta,comentario_id,user_id FROM like_comentarios where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . "  ; ";

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
			$rows[] = ['no_megusta' => 'N'];
        }

        echo json_encode($rows);
    } else {
        http_response_code(500); // Cambiado a un código de error interno del servidor
        echo "Hubo un error en la consulta: " . mysqli_error($mysqli); // Muestra el mensaje de error
    }
}
?>
