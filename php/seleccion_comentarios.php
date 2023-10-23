<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sql = "SELECT
		c.id,
		u.name,
		u.avatar,
		u.id AS user_id,
		c.text,
		c.detalles_peliculas_id,
		c.fecha_hora,
		COUNT(rp.id) AS respuesta_comentario
	FROM comentarios AS c
	LEFT JOIN respuesta_comentario AS rp ON c.id = rp.comentario_id
	LEFT JOIN usuarios AS u ON c.user_id = u.id
	LEFT JOIN usuarios AS uu ON rp.user_id = uu.id
	GROUP BY c.id, u.name, u.avatar, u.id, c.text, c.detalles_peliculas_id, c.fecha_hora;";
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
