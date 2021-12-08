<?php
    include "./clases/ProductoEnvasado.php";

    $retorno = "({})";
    
    if(isset($_POST["obj_producto"]))
    {
        $array = ProductoEnvasado::Traer();

        $json = json_decode($_POST["obj_producto"]);

        for($i = 0; $i < count($array); $i++)
        {
            if($array[$i]->nombre == $json->nombre && $array[$i]->origen == $json->origen)
            {
                $retorno = $array[$i]->ToJson();
            }
        }
    }

    echo json_encode($retorno);
?>