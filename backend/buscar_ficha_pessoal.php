<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Conexão com o Banco
$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([]);
    exit();
}
// Pega o ID do assistido da URL
$id_assistido = isset($_GET['id_assistido']) ? intval($_GET['id_assistido']) : 0;
// Se não tiver ID, retorna lista vazia para não quebrar o app
if ($id_assistido <= 0) {
    echo json_encode([]);
    exit();
}

// 1 junta todas as características da tabela 'caracteristicas_ficha' (cf) com as respostas da tabela 'respostas_ficha' (rf)
// 2 O 'LEFT JOIN' garante que a característica apareça mesmo se o usuário NUNCA tiver respondido (o valor virá null)
$sql = "SELECT 
            cf.id, 
            cf.texto_caracteristica, 
            cf.tipo_resposta, 
            rf.valor_resposta 
        FROM 
            caracteristicas_ficha cf 
        LEFT JOIN 
            respostas_ficha rf ON cf.id = rf.id_caracteristica AND rf.id_assistido = ? 
        ORDER BY 
            cf.ordem";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_assistido);

if ($stmt->execute()) {
    $resultado = $stmt->get_result();
    $ficha = $resultado->fetch_all(MYSQLI_ASSOC);
    echo json_encode($ficha);
} else {
    http_response_code(500);
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>