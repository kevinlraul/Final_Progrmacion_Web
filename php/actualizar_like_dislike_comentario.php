<?php
include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata); 
	$pelicula_id = trim($request->pelicula_id) ? mysqli_real_escape_string($mysqli, trim($request->pelicula_id)) : '';
    $comentario_id = isset($request->comentario_id) ? mysqli_real_escape_string($mysqli, trim($request->comentario_id)) : '';
    $user_id = isset($request->user_id) ? mysqli_real_escape_string($mysqli, trim($request->user_id)) : '';
	$me_gusta = isset($request->like) ? mysqli_real_escape_string($mysqli, trim($request->like)) : '';
	$no_gusta = isset($request->dislike) ? mysqli_real_escape_string($mysqli, trim($request->dislike)) : '';

	if (!empty($pelicula_id) && !empty($user_id) && !empty($me_gusta) && !empty($no_gusta)) {
		// Construye la consulta SQL
		$sql = "UPDATE like_comentarios SET me_gusta = '$me_gusta', no_megusta = '$no_gusta' WHERE comentario_id =" . intval($comentario_id) . "  AND user_id = " . intval($user_id) . " AND pelicula_id =" . intval($pelicula_id) ." ";

		// Ejecuta la consulta
		if (mysqli_query($mysqli, $sql)) {
			http_response_code(204);
		} else {
			// Manejo de errores
			http_response_code(422);
			echo "Error en la consulta: " . mysqli_error($mysqli);
		}
	} else {
		http_response_code(400); // Bad Request
		echo "Datos incompletos o inválidos.";
	}
}
?>
