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
        lp.user_id as like_usuario_id , 
        lp.pelicula_id as like_pelicula_id , 
        lp.comentario_id as like_comentarios_id, 
        lp.me_gusta ,
        lp.no_megusta,
		COUNT(rp.id) AS  contador
		FROM comentarios AS c
		LEFT JOIN respuesta_comentario AS rp ON c.id = rp.comentario_id
        LEFT JOIN like_comentarios AS lp ON c.id = lp.comentario_id
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
