<?php

    include "./clases/ProductoEnvasado.php";

    $retorno = new stdClass();
    $retorno->mensaje = "Error al modificar el producto en la base de datos...";
    $retorno->retorno = false;

    $cadena = json_decode($_POST["producto_json"]);

    $producto = new ProductoEnvasado($cadena->nombre, $cadena->origen, $cadena->codigoBarra, $cadena->precio, $cadena->id);

    if($producto->Modificar())
    {
        $retorno->mensaje = "Exito al modificar el producto en la base de datos!!";
        $retorno->retorno = true;
    }

    echo json_encode($retorno);
?>