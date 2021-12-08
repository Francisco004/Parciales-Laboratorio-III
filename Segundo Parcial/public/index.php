<?php
use \Slim\Routing\RouteCollectorProxy;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;

require __DIR__ . '/../vendor/autoload.php';
require "../src/poo/AccesoDatos.php";
require "../src/poo/auto.php";
require "../src/poo/usuario.php";
require "../src/poo/MW.php";

  $scaloneta = AppFactory::create();

  $twig = Twig::create('../src/views', ['cache' => false]);

  $scaloneta->add(TwigMiddleware::create($scaloneta, $twig));

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////Login
  $scaloneta->get('/front-end-login', function (Request $request, Response $response, array $args) : Response {  

      $view = Twig::fromRequest($request);
    
      return $view->render($response, 'login.html');
      
    });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////Registro
  $scaloneta->get('/front-end-registro', function (Request $request, Response $response, array $args) : Response {  

    $view = Twig::fromRequest($request);

    return $view->render($response, 'registro.html');

  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////Indice
  $scaloneta->get('/front-end-principal', function (Request $request, Response $response, array $args) : Response {  

    $view = Twig::fromRequest($request);

    return $view->render($response, 'principal.php');
    
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////Verbos
  $scaloneta->post('/usuarios', \Usuario::class . ':AltaUsuario') -> add(\MW::class . '::NoEstanDB') -> add(\MW::class . '::EstanVacios');
  $scaloneta->get('/', Usuario::class . ':ListarUsuarios');

  $scaloneta->post('/', \Auto::class . ':AltaAuto');
  $scaloneta->get('/autos', Auto::class . ':ListarAutos');

  $scaloneta->post('/login', Usuario::class . ':LoginUsuarioJson') -> add(\MW::class . '::EstanDB') -> add(\MW::class . '::EstanVacios');


  $scaloneta->group('/cars', function (\Slim\Routing\RouteCollectorProxy $cars) {   

      $cars->delete('/{id_auto}',\Auto::class . ':BorrarAuto');
      $cars->put('/{auto}',\Auto::class . ':ModificarAuto');
  });

  $scaloneta->group('/users', function (\Slim\Routing\RouteCollectorProxy $cars) {   

      $cars->post('/delete',\Usuario::class . ':BorrarUsuario');
      $cars->post('/edit',\Usuario::class . ':ModificarUsuario');
  });

  $scaloneta->group('/tablas', function (\Slim\Routing\RouteCollectorProxy $tablas) {   

      $tablas->get('/usuarios',\Usuario::class . ':ListarUsuarios') -> add(\MW::class . '::TablaUsuarios');
      $tablas->post('/usuarios',\Usuario::class . ':ListarUsuarios') -> add(\MW::class . '::UsuarioPDF');
      $tablas->get('/autos',\Usuario::class . ':ListarAutos') -> add(\MW::class . '::TablaAutos');
  });

  $scaloneta->run();