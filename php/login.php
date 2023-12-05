<?php 
/*
include_once "database.php";
include_once "seguridad/autoload.php"; // Incluir la biblioteca JWT

use Firebase\JWT\JWT; // Importar la clase JWT
define ('JWT_KEY', 'muDwxWkIp-Ul');
define ('JWT_ALG', 'HS256');
define ('JWT_EXP', 300); 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
  $pwd = md5(mysqli_real_escape_string($mysqli, trim($request->password)));
  $email = mysqli_real_escape_string($mysqli, trim($request->username));
  $sql = "SELECT * FROM usuarios WHERE email='$email' AND password='$pwd'";
  
    // Imprimir los valores de las variables para depuración
  echo "Password: $pwd<br>";
  echo "Username: $email<br>"; 
  
  if ($result = mysqli_query($mysqli, $sql)) {
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
    }

    if (count($rows) > 0) {
      // Generar el token JWT con todos los datos encriptados
      $secretKey = "tu_clave_secreta"; // Reemplaza esto con tu propia clave secreta
      $jwt = JWT::encode($rows, JWT_KEY, JWT_ALG);

      // Devolver el token JWT en la respuesta
      $response = array(
        "token" => $jwt
      );
      echo json_encode($response);
    } else {
      // No se encontraron usuarios coincidentes
      http_response_code(404);
    }
  } else {
    // Error en la consulta SQL
    http_response_code(500);
  }
}
*/


include_once "database.php";
include_once "seguridad/autoload.php"; // Incluir la biblioteca JWT

use Firebase\JWT\JWT; // Importar la clase JWT

define('JWT_KEY', 'muDwxWkIp-Ul');
define('JWT_ALG', 'HS256');
define('JWT_EXP', 300);

// Retrieve parameters from the URL
$password = isset($_GET['password']) ? md5(mysqli_real_escape_string($mysqli, trim($_GET['password']))) : null;
$username = isset($_GET['username']) ? mysqli_real_escape_string($mysqli, trim($_GET['username'])) : null;
 
if ($password !== null && $username !== null) {
	$sql = "SELECT * FROM usuarios WHERE email='$username' AND password='$password'";
  
    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }

        if (count($rows) > 0) {
            // Generar el token JWT con todos los datos encriptados
            $secretKey = "tu_clave_secreta"; // Reemplaza esto con tu propia clave secreta
            $jwt = JWT::encode($rows, JWT_KEY, JWT_ALG);

            // Devolver el token JWT en la respuesta
            $response = array(
                "token" => $jwt
            );
            echo json_encode($response);
        } else {
            // No se encontraron usuarios coincidentes
            http_response_code(404);
        }
    } else {
        // Error en la consulta SQL
        http_response_code(500);
    }
} else {
    // Invalid or missing parameters
    echo json_encode(array("error" => "Invalid or missing parameters."));
    http_response_code(400);
}


?>