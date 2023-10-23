<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sql = "SELECT * FROM subida_imagen s left join usuarios u on u.id=s.user_id;";
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