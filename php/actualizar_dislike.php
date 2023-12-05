<?php
include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata); 
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);	
	$me_gusta = trim($request->like);
	$no_gusta = trim($request->dislike);
 
	// Aquí puedes realizar acciones cuando se encuentran registros
	$sql= "SELECT DISTINCT no_megusta  FROM like_pelicula where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . " LIMIT  1 ; ";

	// revisamos que me_gusta tiene el string F 
	if ($result = mysqli_query($mysqli, $sql)) {
		$row = mysqli_fetch_assoc($result);
		$valor_like = $row['me_gusta'];	
		if ($valor_like == 'V') {
			// La columna 'me_gusta' contiene la cadena 'F'
			$sql = "update like_pelicula set me_gusta= '$no_gusta' , no_megusta = '$no_gusta' where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . " ; ";
			if (mysqli_query($mysqli, $sql)) {
				http_response_code(204);
			} else {
				return http_response_code(422);
			}
		}else{
			$sql = "update like_pelicula set me_gusta= '$me_gusta' , no_megusta = '$no_gusta' where pelicula_id= " . intval($pelicula_id) . " and user_id= " . intval($user_id) . " ; ";
			if (mysqli_query($mysqli, $sql)) {
				http_response_code(204);
			} else {
				return http_response_code(422);
			}	
		}	
	}  
}			
?>