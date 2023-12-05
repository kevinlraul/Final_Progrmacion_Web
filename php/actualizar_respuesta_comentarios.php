<?php

require 'database.php';
$patchdata = file_get_contents("php://input");
if (isset($patchdata) && !empty($patchdata)) {
    $request = json_decode($patchdata);
    if (isset($request->nrocomentario) && isset($request->texto)) {
        $nrocomentario = mysqli_real_escape_string($mysqli, (int) $request->nrocomentario);
        $texto = mysqli_real_escape_string($mysqli, trim($request->texto));
         
        
        $sql = "UPDATE respuesta_comentario SET texto = '$texto'  WHERE id = $nrocomentario";
        
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