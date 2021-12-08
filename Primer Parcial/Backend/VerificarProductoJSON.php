<?php

    include "./clases/Producto.php";
    
    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "No se encontro el producto en el listado de productos ";
    
    $producto = new Producto($_POST["nombre"],$_POST["origen"]);

    $verificacion = json_decode(Producto::VerificarProductoJson($producto));

    $retorno->mensaje .= $verificacion->mensaje;

    if($verificacion->exito == true)
    {
        $mensaje = date("His")." ".$verificacion->mensaje;
        setcookie($_POST["nombre"]."_".$_POST["origen"],$mensaje);

        $retorno->exito = true;
        $retorno->mensaje = "Se creo una coockie con el nombre, origen, fecha y mensaje del producto " . $verificacion->mensaje;
    }

    echo json_encode($retorno);
?>