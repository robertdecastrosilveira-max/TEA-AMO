<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

$conn = new mysqli("localhost", "root", "", "app_cadastro");
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id_responsavel) && !empty($data->id_assistido) && !empty($data->respostas)) {
    
    // cria a submissao com o id assistido
    $stmt = $conn->prepare("INSERT INTO submissoes (id_responsavel, id_assistido) VALUES (?, ?)");
    $stmt->bind_param("ii", $data->id_responsavel, $data->id_assistido);
    
    if ($stmt->execute()) {
        $id_submissao = $conn->insert_id;
        $stmt->close();

        // salva as respostas
        $stmt_resp = $conn->prepare("INSERT INTO respostas (id_submissao, id_pergunta, resposta) VALUES (?, ?, ?)");
        
        foreach ($data->respostas as $item) {
            $resp_bool = $item->resposta ? 1 : 0;
            $id_pergunta = isset($item->id) ? $item->id : $item->id_pergunta;
            
            $stmt_resp->bind_param("iii", $id_submissao, $id_pergunta, $resp_bool);
            $stmt_resp->execute();
        }
        $stmt_resp->close();

        echo json_encode(["success" => true, "message" => "Salvo com sucesso!"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erro ao criar submissão."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
}
$conn->close();
?>