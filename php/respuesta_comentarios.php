<?php
include_once "database.php";

$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $comentario_id = mysqli_real_escape_string($mysqli, trim($request->nrocomentario));
  $user_comentado = mysqli_real_escape_string($mysqli, trim($request->usercomentado));
  $user_comenta = mysqli_real_escape_string($mysqli, trim($request->usuario));
  $texto = mysqli_real_escape_string($mysqli, trim($request->texto)); 

  $sql = "INSERT INTO respuesta_comentario (comentario_id,user_id,user_coment,texto,fecha_hora) VALUES (" . intval($comentario_id) . " ," . intval($user_comenta) . "," . intval($user_comentado) . ",'$texto',CURRENT_TIMESTAMP);";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'comentario_id' => $comentario_id,
      'user_id' => $user_comenta,
      'user_coment' => $user_comentado,
	  'texto' => $texto,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }   
}
?>