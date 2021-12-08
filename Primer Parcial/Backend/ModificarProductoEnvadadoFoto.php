<?php

    include "./clases/ProductoEnvasado.php";

    $retorno = new stdClass();
    $retorno->mensaje = "Error al modificar el producto en la base de datos...";
    $retorno->retorno = false;

    $modificar = json_decode($_POST["producto_json"],true);

    $extension = $_FILES["foto"]["name"];
    $tmpsNames = $_FILES["foto"]["tmp_name"];
    $tiposArchivo = pathinfo($extension, PATHINFO_EXTENSION);

    $hoy = date("H:i:s"); 
    $hoy = str_replace(":","",$hoy);

    $destino = $modificar["nombre"].".".$modificar["origen"]."."."modificado.".$hoy.".".$tiposArchivo;

    $producto = new ProductoEnvasado($modificar["nombre"],$modificar["origen"],$modificar["codigoBarra"],$modificar["precio"],$modificar["id"],$destino);

    if($producto->Modificar())
    {
        copy($tmpsNames,"./productos/imagenes/".$destino);
        move_uploaded_file($tmpsNames,"./ProductosModificados/".$destino);
        
        $retorno->mensaje = "Exito al modificar el producto en la base de datos!!";
        $retorno->retorno = true;
    }

    echo json_encode($retorno);
?>