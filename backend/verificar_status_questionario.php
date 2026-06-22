<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set('America/Sao_Paulo'); // evita erros de HTML e coloca o horário de brasília
ini_set('display_errors', 0);
error_reporting(0);

$conn = new mysqli("localhost", "root", "", "app_cadastro");

$id_responsavel = isset($_GET['id_responsavel']) ? intval($_GET['id_responsavel']) : 0;
$id_assistido = isset($_GET['id_assistido']) ? intval($_GET['id_assistido']) : 0;

if ($id_responsavel <= 0 || $id_assistido <= 0) {
    echo json_encode(['pode_responder' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

$sql = "SELECT data_submissao FROM submissoes 
        WHERE id_responsavel = ? AND id_assistido = ? 
        ORDER BY data_submissao DESC LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_responsavel, $id_assistido);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $linha = $resultado->fetch_assoc();
    $ultima = new DateTime($linha['data_submissao']);
    $agora = new DateTime();
    $diferenca = $agora->getTimestamp() - $ultima->getTimestamp();

    if ($diferenca < 86400) { // 24 horas
        $horas = floor((86400 - $diferenca) / 3600);
        $minutos = floor(((86400 - $diferenca) % 3600) / 60);
        echo json_encode(['pode_responder' => false, 'mensagem' => "Volte em {$horas}h e {$minutos}min."]);
    } else {
        echo json_encode(['pode_responder' => true]);
    }
} else {
    echo json_encode(['pode_responder' => true]);
}
?>