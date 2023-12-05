<?php

 /*
require 'database.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $id = mysqli_real_escape_string($mysqli, (int) $request->id);

  // Construir consulta dinamica
  $sql = "UPDATE usuarios SET";

  if (isset($request->name)) {
    $name = mysqli_real_escape_string($mysqli, trim($request->name));
    $sql .= " name = '$name',";
  }

  if (isset($request->email)) {
    $email = mysqli_real_escape_string($mysqli, trim($request->email));
    $sql .= " email = '$email',";
  }

  if (isset($request->rol)) {
    $rol = mysqli_real_escape_string($mysqli, (int) $request->rol);
    $sql .= " rol = '$rol',";
  }

  if (isset($request->password)) {
    $pwd = md5(mysqli_real_escape_string($mysqli, trim($request->password)));
    $sql .= " password = '$pwd',";
  }

  // Eliminar la coma final y agregar la cláusula WHERE
  $sql = rtrim($sql, ',');
  $sql .= " WHERE id = $id";

  if (mysqli_query($mysqli, $sql)) {
    http_response_code(204);
  } else {
    http_response_code(422);
  }
  
  */
 

require 'database.php';
$patchdata = file_get_contents("php://input");
if (isset($patchdata) && !empty($patchdata)) {
    $request = json_decode($patchdata);
    if (isset($request->id) && isset($request->name) && isset($request->email) && isset($request->rol) && isset($request->password)) {
        $id = mysqli_real_escape_string($mysqli, (int) $request->id);
        $name = mysqli_real_escape_string($mysqli, trim($request->name));
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $pwd = md5(mysqli_real_escape_string($mysqli, trim($request->password)));
        $rol = mysqli_real_escape_string($mysqli, (int) $request->rol);
        
        $sql = "UPDATE usuarios SET name = '$name', email = '$email', rol = '$rol', password = '$pwd' WHERE id = $id";
        
        if (mysqli_query($mysqli, $sql)) {
            http_response_code(204);
        } else {	
            http_response_code(422);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Faltan campos requeridos en la solicitud JSON"]);
    }
}
?>