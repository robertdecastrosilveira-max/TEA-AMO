<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([]); // Retorna array vazio em caso de erro
    exit();
}

// Pega o ID do responsável enviado via URL (GET)
$id_responsavel = isset($_GET['id_responsavel']) ? intval($_GET['id_responsavel']) : 0;

if ($id_responsavel <= 0) {
    http_response_code(400);
    echo json_encode([]); // Retorna array vazio se o ID for inválido
    exit();
}

$sql = "SELECT id, nome_completo, grau_parentesco FROM assistidos WHERE id_responsavel = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_responsavel);
$stmt->execute();
$resultado = $stmt->get_result();
$assistidos = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($assistidos);

$stmt->close();
$conn->close();
?>