<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            table, th, td 
            {
                padding-inline: 50px;
                text-align: center;
                border: 1px solid black;
                border-collapse: collapse;
            }
        </style>
    </head>
    <body>
        <table align="center">
        <tr>
            <th>Nombre</th>
            <th>Origen</th>
            <th>Codigo</th>
            <th>Id</th>
            <th>Precio</th>
            <th>Foto</th>
        </tr>
    </body>
</html>

<?php
    include "./clases/ProductoEnvasado.php";

    $contador = 0;

    $array = ProductoEnvasado::Traer();
    
    if(isset($_POST["origen"]) && isset($_POST["nombre"]))
    {
        $nombre = $_POST["nombre"];
        $origen = $_POST["origen"];
        foreach ( $array as $prod ) 
        {
            if ($nombre == $prod->nombre && $origen == $prod->origen) 
            {
                echo "<tr>";
                    echo "<td>".$prod->nombre."</td>";
                    echo "<td>".$prod->origen."</td>";
                    echo "<td>".$prod->codigoBarra."</td>";
                    echo "<td>".$prod->id."</td>";
                    echo "<td>".$prod->precio."</td>";
                    echo "<td>" . "<img src='./Backend".$prod->pathFoto."';width='50' height='50'>" . "</td>";
                echo "</tr>";

                $contador++;
            }
        }
    }
    else if(isset($_POST["origen"]))
    {
        $origen = $_POST["origen"];
        foreach ( $array as $prod ) 
        {
            if ($origen == $prod->origen) 
            {
                echo "<tr>";
                    echo "<td>".$prod->nombre."</td>";
                    echo "<td>".$prod->origen."</td>";
                    echo "<td>".$prod->codigoBarra."</td>";
                    echo "<td>".$prod->id."</td>";
                    echo "<td>".$prod->precio."</td>";
                    echo "<td>" . "<img src='./Backend".$prod->pathFoto."';width='50' height='50'>" . "</td>";
                echo "</tr>";
                $contador++;
            }
        }
    }
    else if(isset($_POST["nombre"]))
    {
        $nombre = $_POST["nombre"];
        foreach ( $array as $prod ) 
        {
            if ($nombre == $prod->nombre) 
            {
                echo "<tr>";
                    echo "<td>".$prod->nombre."</td>";
                    echo "<td>".$prod->origen."</td>";
                    echo "<td>".$prod->codigoBarra."</td>";
                    echo "<td>".$prod->id."</td>";
                    echo "<td>".$prod->precio."</td>";
                    echo "<td>" . "<img src='./Backend".$prod->pathFoto."';width='50' height='50'>" . "</td>";
                echo "</tr>";
                $contador++;
            }
        }
    }

    if($contador==0)
    {
        echo ("No existen datos coincidentes...");
    }

    echo '</table>';
?>