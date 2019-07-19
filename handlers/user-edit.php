<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

$con = new pdo_db('stocks');

$edit = $con->getData("SELECT * FROM stocks WHERE id = ".$_POST['id']);

echo json_encode($edit[0]);

?>