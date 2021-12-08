<?php

    include "./clases/ProductoEnvasado.php";

    //////////////Parte 1 

    //Producto

    $PRODUCTO = new Producto("Francisco", "Peru");

    //1
    echo $PRODUCTO->GuardarJson("./archivos/productos.json");

    //2
    var_dump(Producto::TraerJSON("./archivos/productos.json"));

    //3
    echo Producto::VerificarProductoJson($PRODUCTO);

    //ProductoEnvasado
    
    $PRODUCTO2 = new ProductoEnvasado("Francisco", "Peru", 456456, 48,  1);

    //4
    $PRODUCTO2->Agregar();

    //5
    var_dump(ProductoEnvasado::Traer());

    //6
    ProductoEnvasado::Eliminar(1);

    //7
    $PRODUCTO2->Modificar();

    //8
    echo ($PRODUCTO2->Existe(Producto::TraerJSON("./archivos/productos.json")));

    //9
    $PRODUCTO2->GuardarEnArchivo();
?>