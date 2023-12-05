<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

 
/* $db_host = 'sql304.infinityfree.com';
$db_username = 'if0_34579916';
$db_name = 'if0_34579916_bookshelf';
$db_password = 'KsngM63Bs1FMTX'; */

$db_host = 'localhost';
$db_username = 'database_movie';
$db_name = 'database_movie';
$db_password = 'LietyBZsAHEI-D[v';

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

if ($mysqli->connect_error) {
  die('Error : (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}