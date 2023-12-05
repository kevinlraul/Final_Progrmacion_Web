<?php
include_once "database.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    // Escapa el valor para evitar inyección SQL (asegúrate de que $mysqli esté definido en "database.php")
    $id = $mysqli->real_escape_string($id);
	
	// Primero, elimina los registros de "respuesta_comentario"
	$sql1 = "DELETE FROM respuesta_comentario WHERE comentario_id = $id";

	if ($mysqli->query($sql1) === true) {
		// Luego, elimina el registro de "comentarios"
		$sql2 = "DELETE FROM comentarios WHERE id = $id";
		
		if ($mysqli->query($sql2) === true) {
			$authdata = [
				'id' => $id
			];
			echo json_encode($authdata);
		} else {
			// Maneja errores en la segunda consulta
			echo "Error al eliminar el Comentario: " . $mysqli->error;
		}
	} else {
		// Maneja errores en la primera consulta
		echo "Error al eliminar RespuestaComentario: " . $mysqli->error;
	}
} else {
    echo "ID no proporcionado en la solicitud.";
}
?>
