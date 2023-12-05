
<?php
/*
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sender = mysqli_real_escape_string($mysqli, trim($request->sender));
$receiver = mysqli_real_escape_string($mysqli, trim($request->receiver));

$sql = "SELECT c.sender_id, c.receiver_id, c.message, c.fecha_hora FROM chat c WHERE c.sender_id = " . intval($sender) . " AND c.receiver_id = " . intval($receiver) . " OR c.sender_id = " . intval($receiver) . " AND c.receiver_id = " . intval($sender) . ";";

if ($result = mysqli_query($mysqli, $sql)) {
  $rows = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
  }
  echo json_encode($rows);
} else {
  http_response_code(404);
}*/

 
include_once "database.php";

if (isset($_GET['sender']) && isset($_GET['receiver'])) {
    $sender = intval($_GET['sender']);
    $receiver = intval($_GET['receiver']);
    $sql = "SELECT c.sender_id, c.receiver_id, c.message, c.fecha_hora FROM chat c WHERE (c.sender_id = $sender AND c.receiver_id = $receiver) OR (c.sender_id = $receiver AND c.receiver_id = $sender);";

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
    http_response_code(400);
    echo json_encode(["error" => "Parámetros 'sender' y 'receiver' faltantes en la solicitud"]);
}
  
?>
