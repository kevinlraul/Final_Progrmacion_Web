
<?php
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
}


?>
