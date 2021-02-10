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
  $router->post('auth/login', 'UsersController@authenticate');
  //掲示板情報
  $router->get('boards', 'BoardsController@index');
  $router->get('boards/{id}', 'BoardsController@showById');
  $router->post('store', 'BoardsController@store');
  $router->post('delete/{id}', 'BoardsController@delete'); 
  $router->post('update', 'BoardsController@update');
  //ユーザー情報
  $router->get('users', 'UsersController@users');
  $router->post('users/logout', 'UsersController@logout');
  $router->post('users/new', 'UsersController@new_user');
  $router->post('users/new/check', 'UsersController@tokenCheck');
});

$router->group(
  ['prefix' => 'api/v2', 'middleware' => 'jwt.auth'],
  function () use ($router) {
      $router->post('user', 'UsersController@userInfo');
  }
);

// $router->get('/test', function (\Illuminate\Http\Request $request) {

//   $counter = $request->session()->get('counter') ?: 0;
//   $request->session()->put('counter', ++$counter);

//   return response()->json([
//       'session.counter' => $request->session()->get('counter')
//   ]);
// });

// $router->get('/test100', function (\Illuminate\Http\Request $request) {

//   $counter = $request->session()->get('counter') ?: 0;
//   $request->session()->put('counter', $counter+=100);

//   return response()->json([
//       'session.counter' => $request->session()->get('counter')
//   ]);
// });