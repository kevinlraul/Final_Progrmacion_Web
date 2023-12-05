
<?php
 /*
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata);
	$id = trim($request->user_id);
	$sql = "SELECT COUNT(c.user_id) as cantidad ,titulo_pelicula,imagen_pelicula, c.detalles_peliculas_id FROM comentarios as c where c.user_id =" . intval($id) . " GROUP BY c.detalles_peliculas_id;";
	if ($result = mysqli_query($mysqli, $sql)) {
	  $rows = [];
	  while ($row = mysqli_fetch_assoc($result)) {
		$rows[] = $row;
	  }
	  echo json_encode($rows);
	} else {
	  http_response_code(404);
	}
}
 */
 
 include_once "database.php";

if (isset($_GET['user_id'])) {
    $id = intval($_GET['user_id']);  // Obten el user_id de la solicitud GET
    $sql = "SELECT COUNT(c.user_id) as cantidad, titulo_pelicula, imagen_pelicula, c.detalles_peliculas_id FROM comentarios as c WHERE c.user_id = $id GROUP BY c.detalles_peliculas_id;";
    
    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    } else {
        http_response_code(404);
    }
} else {
    http_response_code(400);  // No se proporcionó el parámetro user_id
    echo json_encode(["error" => "Parámetro user_id faltante en la solicitud"]);
}

?>
