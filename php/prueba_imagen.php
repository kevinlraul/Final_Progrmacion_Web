<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $user_id = mysqli_real_escape_string($mysqli, trim($request->usario_id));
  $image = mysqli_real_escape_string($mysqli, trim($request->imagen)); 
  $text = mysqli_real_escape_string($mysqli, trim($request->texto)); 

$sql = "INSERT INTO subida_imagen (user_id, imagen, texto, fecha_hora) VALUES (" . intval($user_id) . " ,'$image','$text', CURRENT_TIMESTAMP);";

  if ($mysqli->query($sql) === true) {
    $authdata = [
      'user_id' => $user_id,
      'imagen' => $image,
	  'texto' => $text,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }   
}
?>