<?php
 

include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
	$me_gusta= trim($request->like);
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);
    $sql = "SELECT count(*) FROM `like_pelicula` where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . ";";

    // Reemplaza $mysqli con tu conexión válida a la base de datos
    $result = mysqli_query($mysqli, $sql);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $rows = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            echo json_encode($rows); // Envía la respuesta JSON primero
        } else {            
		  $sql = "INSERT INTO like_pelicula (pelicula_id, user_id, me_gusta, no_megusta) VALUES (" . intval($pelicula_id) . ", " . intval($user_id) . ", '$me_gusta', 'false');";
		  if ($mysqli->query($sql) === true) {
			$authdata = [
			  'pelicula_id' => $pelicula_id,
			  'user_id' => $user_id,
			  'me_gusta' => $me_gusta,
			  'no_megusta' => false,
			  'Id' => mysqli_insert_id($mysqli),
			];
			echo json_encode($authdata);
		  }   
        }
    } else {
        echo "Hubo un error en la consulta: " . mysqli_error($mysqli);
    }
}

?>


