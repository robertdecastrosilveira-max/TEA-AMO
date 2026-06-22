<?php
// Permite acesso de qualquer origem (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Erro de conexão."]);
    exit();
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["message" => "ID inválido."]);
    exit();
}

$sql = "SELECT nome_completo, grau_parentesco, codigo_acesso FROM assistidos WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();
$assistido = $resultado->fetch_assoc();

if ($assistido) {
    echo json_encode($assistido);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Assistido não encontrado."]);
}

$stmt->close();
$conn->close();
?>