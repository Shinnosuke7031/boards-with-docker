<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return "Hello Lumen World!";
});

$router->get('hello', function () use ($router) {
    return "Hello Lumen World!";
});

$router->group(['prefix' => 'api/v1'], function() use ($router)
{
  //掲示板情報
  $router->get('boards', 'BoardsController@index');
  $router->get('boards/{id}', 'BoardsController@showById');
  $router->post('store', 'BoardsController@store');
  $router->post('delete/{id}', 'BoardsController@delete'); 
  //ユーザー情報
  $router->get('users', 'BoardsController@users');
});