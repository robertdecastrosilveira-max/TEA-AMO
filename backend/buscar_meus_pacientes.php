<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");
$id_profissional = isset($_GET['id_profissional']) ? intval($_GET['id_profissional']) : 0;

if ($id_profissional <= 0) { echo json_encode([]); exit(); }

// Busca assistidos através da tabela de VÍNCULOS
$sql = "SELECT a.id, a.nome_completo, a.grau_parentesco, a.data_nascimento 
        FROM assistidos a
        JOIN vinculos_profissionais vp ON a.id = vp.id_assistido
        WHERE vp.id_profissional = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_profissional);
$stmt->execute();
$resultado = $stmt->get_result();
$pacientes = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($pacientes);
$conn->close();
?>