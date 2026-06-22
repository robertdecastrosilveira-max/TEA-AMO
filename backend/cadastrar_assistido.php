<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro de conexão."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_responsavel) || !isset($data->nome_completo) || !isset($data->data_nascimento) || !isset($data->grau_parentesco)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados obrigatórios ausentes."]);
    exit();
}

$sql = "INSERT INTO assistidos (id_responsavel, nome_completo, data_nascimento, genero, grau_parentesco, informacoes_adicionais) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param("isssss",
    $data->id_responsavel,
    $data->nome_completo,
    $data->data_nascimento,
    $data->genero,
    $data->grau_parentesco,
    $data->informacoes_adicionais
);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Assistido cadastrado com sucesso."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>