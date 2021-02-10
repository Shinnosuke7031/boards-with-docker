<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Boards;
use App\Users;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use PHPMailer\PHPMailer;
use Symfony\Component\HttpFoundation\Cookie;

class BoardsController extends Controller
{
    
  public function index() {
    $posts = Boards::all();
    return response()->json($posts, 200, array('Content-Type'=>'application/json; charset=utf-8' ));
  }

  public function showById($id) {
    $posts = Boards::find($id);
    return response()->json($posts, 200, array('Content-Type'=>'application/json; charset=utf-8' ));
  }

  public function store (Request $request) {
    return response()->json(Boards::create($request->all()));
  }

  public function delete ($id) {
    return Boards::where('id', $id)->delete();
  }

  public function update (Request $request) {
    $id = $request->input('id');
    $comment = $request->input('comment');
    $time = $request->input('time');
    $res = Boards::where('id', $id)
      ->update([
        'comment'=>$comment,
        'time'=>$time
      ]);
    return response()->json($res);
  }

}