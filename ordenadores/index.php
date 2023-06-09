<?php
require_once('Database.php');

$database = new database();
$resultado = $database->getAll();


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Ordenadores</title>
</head>

<body>
    <h1>Estamos en el INDEX de ordenadores</h1>
    <table>
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th>Descripción</th>
            </tr>
        </thead>

        <tboby>
            <tr>
                <?php
                foreach ($resultado as $row) {
                    echo "<tr><td>" . $row['MARCA'] . "</td>";
                    echo "<td>" . $row['MODELO'] . "</td>";
                    echo "<td>" . $row['PRECIO'] . "</td>";
                    echo "<td> " .$row['DESCRIPCION'] . "</td></tr>";
                }

                ?>
            </tr>
        </tboby>

    </table>

</body>

</html>