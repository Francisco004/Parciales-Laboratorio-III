<?php

    include "./clases/Producto.php";

    $producto = new Producto($_POST["nombre"],$_POST["origen"]);

    echo $producto->GuardarJson('./archivos/productos.json');

?>