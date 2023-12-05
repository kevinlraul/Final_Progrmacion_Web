<?php
include_once "database.php";
$postdata = file_get_contents("php://input");


//if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);  
    $pelicula_id = trim($request->like_pelicula_id);
    $user_id = trim($request->like_user_id);	
	
    // Realiza operaciones y consultas según tus necesidades.
    $sql = "SELECT c.id ,
			u.name,
			u.avatar,
			u.id as respuesta_user_id,
			rp.user_id ,
			uuu.name,
			uuu.avatar ,
			rp.user_coment,
			c.detalles_peliculas_id,
			c.fecha_hora,
			rp.comentario_id respuesta_comentario_id ,
			rp.id comentario_id,
			rp.user_id ,
			uu.name respuesta_usuario ,
			uu.avatar respuesta_avatar ,
			rp.texto respuesta_comentario ,
			rp.fecha_hora fecha_respuesta  	,
            lp.user_id as like_usuario_id , 
            lp.pelicula_id as like_pelicula_id , 
            lp.comentario_id as like_comentarios_id, 
            lp.me_gusta    ,
            lp.no_megusta  
			FROM respuesta_comentario as rp 
			left join comentarios c on c.id = rp.comentario_id  
            left join like_comentarios lp on lp.comentario_id = rp.id
			left JOIN usuarios u on c.user_id = u.id 
			left JOIN usuarios uu on rp.user_id = uu.id 
			left JOIN usuarios uuu on rp.user_coment = uuu.id
            AND lp.user_id  = " . intval($user_id) . "
            AND lp.pelicula_id  = " . intval($pelicula_id) . "  ; ";

    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }

        if (empty($rows)) {
            http_response_code(404);
            echo json_encode(["error" => "No se encontraron resultados"]);
        } else {
            echo json_encode($rows);
        }
    } else {
        http_response_code(500); // Código 500 para errores internos del servidor
        echo json_encode(["error" => "Error en la consulta SQL"]);
    } 
//} else {
//	http_response_code(400);
//	echo json_encode(["error" => "Solicitud no valida"]);
//}  
?>
