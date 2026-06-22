<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 0); 
error_reporting(0);

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erro de conexão: " . $conn->connect_error]);
    exit();
}

$id_assistido = isset($_GET['id_assistido']) ? intval($_GET['id_assistido']) : 0;

if ($id_assistido <= 0) {
    echo json_encode([]);
    exit();
}

// 1 Soma as respostas "1" para calcular a pontuação do dia.
// 2 Formata a data
$sql = "SELECT 
            DATE_FORMAT(s.data_submissao, '%d/%m') as data_formatada,
            SUM(
                CASE 
                    WHEN p.tipo_pontuacao = 'direta' AND r.resposta = 1 THEN 1
                    WHEN p.tipo_pontuacao = 'invertida' AND r.resposta = 0 THEN 1
                    ELSE 0 
                END
            ) as total_pontos
        FROM submissoes s
        JOIN respostas r ON s.id = r.id_submissao
        JOIN perguntas p ON r.id_pergunta = p.id
        WHERE s.id_assistido = ?
        GROUP BY DATE(s.data_submissao)
        ORDER BY s.data_submissao ASC
        LIMIT 30"; // Limita aos últimos 30 registros (dias)

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na preparação do SQL: " . $conn->error]);
    exit();
}

$stmt->bind_param("i", $id_assistido);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na execução do SQL: " . $stmt->error]);
    exit();
}

$resultado = $stmt->get_result();
$dados = [];

while ($row = $resultado->fetch_assoc()) {
    $row['total_pontos'] = (int)$row['total_pontos']; //garante q o int é int
    $dados[] = $row;
}

echo json_encode($dados);

$stmt->close();
$conn->close();
?>