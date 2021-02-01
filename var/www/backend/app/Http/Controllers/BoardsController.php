<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Boards;
use App\Users;

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

  public function upload () {
    /*
      return response()->json(Boards::create(
        [
          'user_id' => $_POST["user_id"],
          'name' => $_POST["name"],
          'comment'=>'not text',
          'isFile'=>$isFile,
          'time'=>$time,
          'fname'=>$_FILES["file"]["name"],
          'extension'=>$extension,
          'raw_data'=>$raw_data,
        ]
      ));
    }*/
    return response()->json(['file'=>$_FILES["file"], "user_id"=>$_POST["user_id"], "name"=>$_POST["name"]], 200, array('Content-Type'=>'application/json; charset=utf-8' ));

  }


  public function users() {
    $users = Users::all();
    return response()->json($users);
  }

  public function new_user(Request $request) {
    $user_id = substr(bin2hex(random_bytes(8)), 0, 8);
    $urltoken = substr(bin2hex(random_bytes(48)), 0, 48);
    $time = date("Y-m-d H:i:s");
    return response()->json(Users::create([
      'user_id'=> $user_id,
      'isTemporary'=> 1,
      'name'=> $request->input('name'),
      'password'=> $request->input('password'),
      'time_temporary'=> $time,
      'urltoken'=> $urltoken
    ]));
  }

}