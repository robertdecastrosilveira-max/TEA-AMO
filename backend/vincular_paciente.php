<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

$conn = new mysqli("localhost", "root", "", "app_cadastro");
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id_profissional) && !empty($data->codigo_acesso)) {
    
    // 1. Acha o assistido pelo código
    $sql_busca = "SELECT id FROM assistidos WHERE codigo_acesso = ?";
    $stmt = $conn->prepare($sql_busca);
    $stmt->bind_param("s", $data->codigo_acesso);
    $stmt->execute();
    $res = $stmt->get_result();
    
    if ($res->num_rows > 0) {
        $assistido = $res->fetch_assoc();
        $id_assistido = $assistido['id'];
        
        // 2. Cria o vínculo
        $sql_vinculo = "INSERT INTO vinculos_profissionais (id_profissional, id_assistido) VALUES (?, ?)";
        $stmt_v = $conn->prepare($sql_vinculo);
        $stmt_v->bind_param("ii", $data->id_profissional, $id_assistido);
        
        if ($stmt_v->execute()) {
            echo json_encode(["success" => true, "message" => "Vínculo criado com sucesso!"]);
        } else {
            // Erro 1062 = Duplicado (já vinculado)
            if ($conn->errno == 1062) {
                echo json_encode(["success" => false, "message" => "Você já está vinculado a este assistido."]);
            } else {
                echo json_encode(["success" => false, "message" => "Erro ao vincular."]);
            }
        }
    } else {
        echo json_encode(["success" => false, "message" => "Código de acesso inválido."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
}
$conn->close();
?>