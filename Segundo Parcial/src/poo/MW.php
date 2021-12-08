<?php
    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use \Firebase\JWT\JWT as JWT;
    use Firebase\JWT\Key;
    use Psr\Log\NullLogger;
    use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
    use Slim\Psr7\Response as ResponseMW;
    use Slim\Factory\AppFactory;
    use \Slim\Routing\RouteCollectorProxy;

    class MW
    {

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Parte 2

        public static function EstanVacios(Request $request, RequestHandler $handler):ResponseMW
        {
            $retorno = new stdClass();
            $retorno -> status  = 409;
            $retorno -> mensaje = "El correo y la clave se encuentran vacios...";

            $datosUsuario = $request->getParsedBody();

            if(isset($datosUsuario['usuario']))
            {
                $json = json_decode($datosUsuario['usuario']);
            }
            else
            {
                $json = json_decode($datosUsuario['user']);
            }
            
            $response = new ResponseMW();

            if($json -> correo == "" && $json -> clave == "")
            {
                $response -> getBody() -> write(json_encode($retorno));
                $response -> withStatus(409);
            }
            else if($json -> correo == "")
            {
                $retorno -> mensaje = "El correo se encuentra vacio...";
                $response -> getBody() -> write(json_encode($retorno));
                $response -> withStatus(409);
            }
            else if($json -> clave == "")
            {
                $retorno -> mensaje = "La clave se encuentra vacia...";
                $response -> getBody() -> write(json_encode($retorno));
                $response -> withStatus(409);
            }
            else
            {
                $response = $handler -> handle($request);
            }

            return $response;
        }

        public function EstanDB(Request $request, RequestHandler $handler):ResponseMW
        {
            $retorno = new stdClass();
            $retorno -> status  = 403;
            $retorno -> mensaje = "Correo y Clave NO estan en la BD..";

            $datosUsuario = $request -> getParsedBody();

            $json = json_decode($datosUsuario['user']);

            $response = new ResponseMW();
		
            if(Usuario::TraerUnUsuario($json -> correo, $json -> clave) == false)
            {
                $response -> getBody() -> write(json_encode($retorno));
                $response -> withStatus(403);
            }
            else
            {
                $response = $handler -> handle($request);
            }
            
            return $response;
        }

        public static function NoEstanDB(Request $request, RequestHandler $handler):ResponseMW
        {
            $retorno = new stdClass();
            $retorno -> status  = 403;
            $retorno -> mensaje = "El correo ya esta en la base de datos..";

            $datosUsuario = $request->getParsedBody();
            $json = json_decode($datosUsuario['usuario']);
            
            $response = new ResponseMW();

            if(Usuario::TraerUnUsuario($json -> correo, $json -> clave))
            {
                $response = $response -> withStatus(403);
        
                $response -> getBody() -> write(json_encode($retorno));
            }
            else
            {
                $response = $handler -> handle($request);
            }

            return $response;
        }

        public static function TablaUsuarios(Request $request, RequestHandler $handler):ResponseMW
        {
            $listado = json_encode(Usuario::TraerTodoLosUsuarios());
            $listado = json_decode($listado);

            $response = new ResponseMW();

            ?>

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>
                    table, th, td 
                    {
                        border: 1px solid black;
                    }
                </style>
            </head>
        
            <?php

            $tabla = "";
            $tabla.= '<table align="center">';
            $tabla.= "<tr>";
            $tabla.= "<th>ID</th>";
            $tabla.= "<th>Nombre</th>";
            $tabla.= "<th>Apellido</th>";
            $tabla.= "<th>Correo</th>";
            $tabla.= "<th>Perfil</th>";
            $tabla.= "<th>Foto</th>";
            $tabla.= "</tr>";
        
            for($i = 0; $i < count($listado); $i++)
            {
                $tabla.= "<tr>";
                $tabla.= "<td>".$listado[$i]->id."</td>";
                $tabla.= "<td>".$listado[$i]->nombre."</td>";
                $tabla.= "<td>".$listado[$i]->apellido."</td>";
                $tabla.= "<td>".$listado[$i]->correo."</td>";
                $tabla.= "<td>".$listado[$i]->perfil."</td>";
                $tabla.= "<td>" .'<img src="'."../src".$listado[$i]->foto.'" width="50" height="50"'. "</td>";
                $tabla.= "</tr>";
            }

            $tabla.= "</table>";

            $response -> getBody() -> write($tabla);
            
            return $response;
        }   

        public function UsuarioPDF(Request $request, RequestHandler $handler):ResponseMW
        {
            header('content-type:application/pdf');
            
            $todosLosUsuarios = Usuario::TraerTodoLosUsuarios();

            $mpdf = new \Mpdf\Mpdf(['orientation' => 'P']);
            
            ob_start();

            $response = new ResponseMW();

            $tabla = "";
            $tabla.= '<table align="center">';
            $tabla.= "<tr>";
            $tabla.= "<th>ID</th>";
            $tabla.= "<th>Nombre</th>";
            $tabla.= "<th>Apellido</th>";
            $tabla.= "<th>Correo</th>";
            $tabla.= "<th>Perfil</th>";
            $tabla.= "<th>Foto</th>";
            $tabla.= "</tr>";

            foreach($todosLosUsuarios as $listado)
            {
                $tabla.= "<tr>";
                $tabla.= "<td>".$listado->id."</td>";
                $tabla.= "<td>".$listado->nombre."</td>";
                $tabla.= "<td>".$listado->apellido."</td>";
                $tabla.= "<td>".$listado->correo."</td>";
                $tabla.= "<td>".$listado->perfil."</td>";
                $tabla .= '<td style="margin: 0 auto; width: 130px"><img src="'."../src"."$listado->foto".'" width="90" height="90"></td>';
                $tabla.= "</tr>";
            }
            
            $tabla.= "</table>";

            ob_end_clean();

            $mpdf->WriteHTML($tabla);
            
            $mpdf->Output();

            return $response;
        }   

        public function TablaAutos(Request $request, RequestHandler $handler):ResponseMW
        {
            $listado = json_encode(Auto::TraerTodosLosAutos());
            $listado = json_decode($listado);

            $response = new ResponseMW();
            ?>

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>
                    table, th, td 
                    {
                        border: 1px solid black;
                    }
                </style>
            </head>
        
            <?php
            $tabla = "";
            $tabla.= '<table align="center" style="border: 1px solid black;">';
            $tabla.= "<tr>";
            $tabla.= "<th>ID</th>";
            $tabla.= "<th>Color</th>";
            $tabla.= "<th>Marca</th>";
            $tabla.= "<th>Precio</th>";
            $tabla.= "<th>Modelo</th>";
            $tabla.= "</tr>";
        
            for($i = 0; $i < count($listado); $i++)
            {
                $tabla.= '<tr>';
                $tabla.= "<td>".$listado[$i]->id."</td>";
                $tabla.= "<td>".$listado[$i]->color."</td>";
                $tabla.= "<td>".$listado[$i]->marca."</td>";
                $tabla.= "<td>".$listado[$i]->precio."</td>";
                $tabla.= "<td>".$listado[$i]->modelo."</td>";
                $tabla.= "</tr>";
            }

            $tabla.= "</table>";

            $response -> getBody() -> write($tabla);
            
            return $response;
        }   
    }
?>