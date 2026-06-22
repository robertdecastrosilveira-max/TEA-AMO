<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro de conexão."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id_profissional) && !empty($data->id_assistido) && !empty($data->observacao)) {
    
    // verifica o ID, não os IDs separados.
    $sql_vinculo = "SELECT id FROM vinculos_profissionais WHERE id_profissional = ? AND id_assistido = ?";
    $stmt_v = $conn->prepare($sql_vinculo);
    $stmt_v->bind_param("ii", $data->id_profissional, $data->id_assistido);
    $stmt_v->execute();
    $res_v = $stmt_v->get_result();
    
    if ($res_v->num_rows > 0) {
        $row = $res_v->fetch_assoc();
        $id_vinculo = $row['id'];
        
        // Insere a análise usando o id_vinculo encontrado
        $titulo = isset($data->titulo) ? $data->titulo : 'Observação Clínica';
        
        $sql = "INSERT INTO analises_profissionais (id_vinculo, titulo, observacao, data_analise) VALUES (?, ?, ?, NOW())";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iss", $id_vinculo, $titulo, $data->observacao);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Análise salva com sucesso!"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        http_response_code(403);
        echo json_encode(["success" => false, "message" => "Erro: Você não tem vínculo com este paciente."]);
    }
    $stmt_v->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
}
$conn->close();
?>