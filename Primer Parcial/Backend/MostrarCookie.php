<?php

    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "No se encontro una coockie con este nombre y origen";

    if(isset($_COOKIE[$_GET["nombre"]."_".$_GET["origen"]]))
    {
        $retorno->exito = true;
        $retorno->mensaje = "Coockie:".$_COOKIE[$_GET["nombre"]."_".$_GET["origen"]];
    }

    echo json_encode($retorno);
?>