<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

$sql = "SELECT id, texto_pergunta FROM perguntas WHERE categoria = 'escola' ORDER BY id";
$result = $conn->query($sql);

$perguntas = [];
while ($row = $result->fetch_assoc()) {
    $row['resposta'] = false;
    $perguntas[] = $row;
}

echo json_encode($perguntas);
$conn->close();
?>