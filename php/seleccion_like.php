<?php
include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata); 
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);	
	$me_gusta = trim($request->like);
	$no_gusta = trim($request->dislike);

	// Verifica si ya existe una fila con el mismo número de película y usuario
	$checkSql = "SELECT COUNT(*) as count FROM like_pelicula WHERE pelicula_id = " . intval($pelicula_id) . " AND user_id = " . intval($user_id) . ";";

	$result = mysqli_query($mysqli, $checkSql);

	if ($result) {
		$row = mysqli_fetch_assoc($result);
		$count = $row['count'];

		if ($count == 0) {
			// No existe una fila con estos valores, por lo que puedes insertar
			$insertSql = "INSERT INTO like_pelicula (pelicula_id,user_id,me_gusta,no_megusta) VALUES (" . intval($pelicula_id) . " ," . intval($user_id) . ",'$me_gusta','$no_gusta');";

			if ($mysqli->query($insertSql) === true) {
				$authdata = [
					'pelicula_id' => $pelicula_id,
					'user_id' => $user_id,
					'me_gusta' => $me_gusta,
					'no_megusta' => $no_gusta,
					'Id' => mysqli_insert_id($mysqli),
				];
				echo json_encode($authdata);
			}
		}
	} 
}
?>
