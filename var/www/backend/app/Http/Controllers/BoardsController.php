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
    return response()->json($posts);
  }

  public function showById($id) {
    $posts = Boards::find($id);
    return response()->json($posts);
  }

  public function store (Request $request) {
    return response()->json(Boards::create($request->all()));
  }

  public function delete ($id) {
    return Boards::where('id', $id)->delete();
  }


  public function users() {
    $users = Users::all();
    return response()->json($users);
  }
}