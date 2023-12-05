<?php
/*
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = trim($request->id);

$sql ="SELECT u.id, u.name, u.password, u.email, u.rol, u.avatar FROM usuarios u  where u.id =  " . intval($id) . ";";
if ($result = mysqli_query($mysqli, $sql)) {
  $rows = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
  }
  echo json_encode($rows);
} else {
  http_response_code(404);
}
*/

include_once "database.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);  // Obten el valor del parámetro "id" desde la solicitud GET
    $sql = "SELECT u.id, u.name, u.password, u.email, u.rol, u.avatar FROM usuarios u WHERE u.id = $id;";
    
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
    http_response_code(400);  // No se proporcionó el parámetro "id"
    echo json_encode(["error" => "Parámetro 'id' faltante en la solicitud"]);
}


?>
