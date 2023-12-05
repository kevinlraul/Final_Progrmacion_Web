<?php


/*
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $id = trim($request->id);

  $sql = "DELETE from usuarios where id = $id;";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'id' => $id,
    ];
    echo json_encode($authdata);
  }
}
*/
/*
include_once "database.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    // Escapa el valor para evitar inyección SQL (asegúrate de que $mysqli esté definido en "database.php")
    $id = $mysqli->real_escape_string($id);

    $sql = "DELETE FROM usuarios WHERE id = $id";
	

    if ($mysqli->query($sql) === true) {
        $authdata = [
            'id' => $id
        ];
        echo json_encode($authdata);
    } else {
        // Maneja errores en la consulta
        echo "Error al eliminar el usuario: " . $mysqli->error;
    }
} else {
    echo "ID no proporcionado en la solicitud.";
}
*/

include_once "database.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    // Escapa el valor para evitar inyección SQL (asegúrate de que $mysqli esté definido en "database.php")
    $id = $mysqli->real_escape_string($id);

    $success = true;
    $errors = [];

    // Elimina el registro de "usuarios"
    $sql = "DELETE FROM usuarios WHERE id = $id";

    if (!$mysqli->query($sql)) {
        $success = false;
        $errors[] = "Error al eliminar el usuario: " . $mysqli->error;
    }

    // Intenta eliminar registros de "chat" donde el usuario sea el remitente o el destinatario
    $sql1 = "DELETE FROM chat WHERE sender_id = $id OR receiver_id = $id";
    $sql2 = "DELETE FROM respuesta_comentario WHERE user_coment = $id"; 
    $sql3 = "DELETE FROM comentarios WHERE user_id = $id";
    $sql4 = "DELETE FROM subida_imagen WHERE user_id = $id";
    $sql5 = "DELETE FROM like_pelicula WHERE user_id = $id"; 

    if (!$mysqli->query($sql1) && $mysqli->errno != 1091) {
        $success = false;
        $errors[] = "Error al eliminar registros de chat: " . $mysqli->error;
    }

    if (!$mysqli->query($sql2) && $mysqli->errno != 1091) {
        $success = false;
        $errors[] = "Error al eliminar registros de respuesta_comentario: " . $mysqli->error;
    }

    if (!$mysqli->query($sql3) && $mysqli->errno != 1091) {
        $success = false;
        $errors[] = "Error al eliminar registros de comentarios: " . $mysqli->error;
    }

    if (!$mysqli->query($sql4) && $mysqli->errno != 1091) {
        $success = false;
        $errors[] = "Error al eliminar registros de subida_imagen: " . $mysqli->error;
    }

    if (!$mysqli->query($sql5) && $mysqli->errno != 1091) {
        $success = false;
        $errors[] = "Error al eliminar registros de like_pelicula: " . $mysqli->error;
    }

    if ($success) {
        $authdata = [
            'id' => $id
        ];
        echo json_encode($authdata);
    } else {
        // Maneja errores generales
        echo json_encode(['errors' => $errors]);
    }
} else {
    echo "ID no proporcionado en la solicitud.";
}




?>


 

 
