<?php
include_once "database.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    // Escapa el valor para evitar inyección SQL (asegúrate de que $mysqli esté definido en "database.php")
    $id = $mysqli->real_escape_string($id);

    $sql = "DELETE FROM respuesta_comentario WHERE id = $id";

    if ($mysqli->query($sql) === true) {
        $authdata = [
            'id' => $id
        ];
        echo json_encode($authdata);
    } else {
        // Maneja errores en la consulta
        echo "Error al eliminar el RespuestaComentario: " . $mysqli->error;
    }
} else {
    echo "ID no proporcionado en la solicitud.";
}


?>