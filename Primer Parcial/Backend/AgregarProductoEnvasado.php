<?php

    include "./clases/ProductoEnvasado.php";

    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "Error al agregar el producto";

    $codigo = $_POST["codigoBarra"];
    $nombre = $_POST["nombre"];
    $origen = $_POST["origen"];
    $precio = $_POST["precio"];

    $extension = $_FILES["foto"]["name"];
    $tmpsNames = $_FILES["foto"]["tmp_name"];
    $tiposArchivo = pathinfo($extension, PATHINFO_EXTENSION);

    $hoy = date("H:i:s"); 
    $hoy = str_replace(":","",$hoy);
    $destino = $nombre.".".$origen.".".$hoy.".".$tiposArchivo;

    $producto = new ProductoEnvasado($nombre,$origen,$codigo,$precio,1,$destino);

    if(($producto->Existe(ProductoEnvasado::Traer())))
    {
        move_uploaded_file($tmpsNames, "./productos/imagenes/"."/".$destino);

        $producto->Agregar();
        
        $retorno->exito = true;
        $retorno->mensaje = "Exito al agregar el producto";
    }

    echo json_encode($retorno);
    
?>