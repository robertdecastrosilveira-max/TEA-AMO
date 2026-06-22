<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Silencia erros HTML
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

// 1 Agrupa primeiro por dia e calcula a soma diária (subquery 'diario').
// 2 Agrupa depois por mês e calcula a MÉDIA das somas diárias.
$sql = "SELECT 
            DATE_FORMAT(diario.dia, '%m/%Y') as mes_ano,
            AVG(diario.pontos_dia) as media_pontos
        FROM (
            SELECT 
                DATE(s.data_submissao) as dia,
                SUM(
                    CASE 
                        WHEN p.tipo_pontuacao = 'direta' AND r.resposta = 1 THEN 1
                        WHEN p.tipo_pontuacao = 'invertida' AND r.resposta = 0 THEN 1
                        ELSE 0 
                    END
                ) as pontos_dia
            FROM submissoes s
            JOIN respostas r ON s.id = r.id_submissao
            JOIN perguntas p ON r.id_pergunta = p.id
            WHERE s.id_assistido = ?
            GROUP BY DATE(s.data_submissao)
        ) as diario
        GROUP BY MONTH(diario.dia), YEAR(diario.dia)
        ORDER BY diario.dia ASC
        LIMIT 12"; // Últimos 12 meses

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Erro SQL: " . $conn->error]);
    exit();
}

$stmt->bind_param("i", $id_assistido);
$stmt->execute();
$resultado = $stmt->get_result();
$dados = [];

while ($row = $resultado->fetch_assoc()) {
    // Arredonda a média para 1 casa decimal (ex: 5.3)
    $row['media_pontos'] = round((float)$row['media_pontos'], 1);
    $dados[] = $row;
}

echo json_encode($dados);

$stmt->close();
$conn->close();
?>