<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([]);
    exit();
}

$sql = "SELECT id, texto_pergunta FROM perguntas WHERE categoria = 'casa' ORDER BY id";
$result = $conn->query($sql);

$perguntas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['resposta'] = false; 
        $perguntas[] = $row;
    }
}

echo json_encode($perguntas);
$conn->close();
?>