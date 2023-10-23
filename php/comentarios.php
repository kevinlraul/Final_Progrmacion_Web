<?php
include_once "database.php";

$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $usuario = mysqli_real_escape_string($mysqli, trim($request->usuario));
  $detalle_pelicula_id = mysqli_real_escape_string($mysqli, trim($request->pelicula_id));
  $texto = mysqli_real_escape_string($mysqli, trim($request->texto));
  $imagen = mysqli_real_escape_string($mysqli, trim($request->imagen));
  $titulo = mysqli_real_escape_string($mysqli, trim($request->titulo));

  $sql = "INSERT INTO comentarios (user_id,text,detalles_peliculas_id,titulo_pelicula,imagen_pelicula,fecha_hora) VALUES (" . intval($usuario) . " ,'$texto','$detalle_pelicula_id','$titulo','$imagen',CURRENT_TIMESTAMP);";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'text' => $texto,
      'user_id' => $usuario,
      'detalles_peliculas_id' => $detalle_pelicula_id,
	  'imagen_pelicula' => $imagen,
	  'titulo_pelicula' => $titulo,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }   
}
?>