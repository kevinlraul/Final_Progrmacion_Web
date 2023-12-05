<?php
include_once "database.php";
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
	$request = json_decode($postdata); 
    $pelicula_id = trim($request->pelicula_id);
    $user_id = trim($request->user_id);
	$me_gusta = trim($request->like);
	$no_gusta = trim($request->dislike);

$sql = "INSERT INTO like_pelicula (pelicula_id,user_id,me_gusta,no_megusta,fecha_hora) VALUES (" . intval($pelicula_id) . " ," . intval($user_id) . ",'$me_gusta','$no_gusta',CURRENT_TIMESTAMP);";

	if ($mysqli->query($sql) === true) {
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
?>


