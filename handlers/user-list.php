<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

$con = new pdo_db('stocks');

$userObjs = $con->getData("SELECT * FROM `stocks`");

echo json_encode($userObjs);


?>