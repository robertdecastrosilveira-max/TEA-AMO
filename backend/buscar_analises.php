<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

$id_assistido = isset($_GET['id_assistido']) ? intval($_GET['id_assistido']) : 0;

if ($id_assistido <= 0) { 
    echo json_encode([]); 
    exit(); 
}
$sql = "SELECT 
            a.id, 
            a.titulo, 
            a.observacao, 
            DATE_FORMAT(a.data_analise, '%d/%m/%Y às %H:%i') as data_formatada, 
            u.nome as nome_profissional
        FROM analises_profissionais a
        JOIN vinculos_profissionais vp ON a.id_vinculo = vp.id
        JOIN usuarios u ON vp.id_profissional = u.id
        WHERE vp.id_assistido = ?
        ORDER BY a.data_analise DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_assistido);
$stmt->execute();
$result = $stmt->get_result();

$analises = [];
while ($row = $result->fetch_assoc()) {
    $analises[] = $row;
}

echo json_encode($analises);
$conn->close();
?>