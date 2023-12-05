<?php

include_once "database.php";

if (isset($_GET['pelicula_id'])) {
    $pelicula_id = intval($_GET['pelicula_id']);

    $sql = "SELECT COALESCE(SUM(CASE WHEN no_megusta = 'V' THEN 1 ELSE 0 END), 0) AS total_dislike
            FROM like_pelicula
            WHERE pelicula_id = $pelicula_id;"; // Usar la variable $pelicula_id en lugar de un valor fijo

    // Reemplaza $mysqli con tu conexión válida a la base de datos	 
    $result = mysqli_query($mysqli, $sql);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        http_response_code(500); // Cambiado a un código de error interno del servidor
        echo json_encode(["error" => "Hubo un error en la consulta: " . mysqli_error($mysqli)]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Parámetro 'pelicula_id' faltante en la solicitud"]);
}

?>
