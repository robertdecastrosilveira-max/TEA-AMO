<?php
// mostra as CARACTERÍSTICAS e as RESPOSTAS já dadas
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "app_cadastro");
if ($conn->connect_error) { /*(erro) */ }

$id_assistido = isset($_GET['id_assistido']) ? intval($_GET['id_assistido']) : 0;
if ($id_assistido <= 0) { /*(erro 400) */ }

// Este SQL busca TODAS as características da tabela caracteristicas_ficha
// e junta (LEFT JOIN) com as respostas que o assistido já deu da tabela respostas_ficha
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
$stmt->execute();
$resultado = $stmt->get_result();
$ficha = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($ficha);
$stmt->close();
$conn->close();
?>