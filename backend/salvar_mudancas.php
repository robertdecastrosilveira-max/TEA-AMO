<?php
//salva as alterações feitas na ficha
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

$conn = new mysqli("localhost", "root", "", "app_cadastro");
if ($conn->connect_error) { /*erro*/ }

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->id_assistido) || !is_array($data->respostas)) { /*erro 400*/ }

$id_assistido = $data->id_assistido;
$respostas = $data->respostas;

// O comando "INSERT VALUES ON DUPLICATE KEY UPDATE" usa a chave primária (id_assistido, id_caracteristica) do SQL.
// Se a resposta não existe, ele insere.
// Se já existe, ele atualiza (UPDATE).
$sql = "INSERT INTO respostas_ficha (id_assistido, id_caracteristica, valor_resposta) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE valor_resposta = VALUES(valor_resposta)";

$stmt = $conn->prepare($sql);

foreach ($respostas as $resposta) {
    // Só salva se o valor não for nulo (para evitar campos vazios)
    if (isset($resposta->valor_resposta)) {
        $stmt->bind_param("iis", $id_assistido, $resposta->id, $resposta->valor_resposta);
        $stmt->execute();
    }
}

if ($stmt->error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $stmt->error]);
} else {
    echo json_encode(["success" => true, "message" => "Ficha salva com sucesso."]);
}
$stmt->close();
$conn->close();
?>