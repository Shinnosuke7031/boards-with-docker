<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Boards;
use App\Users;
use App\Define;
use phpDocumentor\Reflection\DocBlock\Tags\Uses;
use Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer;

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

  public function login(Request $request) {
    $data = Users::where('user_id', $request->input('userID'))->first();
    if ($data['password'] == $request->input('pass')) {
      return response()->json(['status'=>'OK', 'name'=>$data['name']]);
    }
    
    return response()->json(['status'=>'Error']);
  }

  public function new_user(Request $request) {
    $user_id = substr(bin2hex(random_bytes(8)), 0, 8);
    $urltoken = substr(bin2hex(random_bytes(48)), 0, 48);
    $time = date("Y-m-d H:i:s");
    $emailAddress = $request->input('email');

    $url = 'http://localhost:3000/signup-complete?token=' . $urltoken;
    $message = "ココスペースインターン掲示板に仮登録ありがとうございます。\r\n以下のURLをクリックして本登録を完了してください。\r\n" . $url;
    $title = "[ココスペース インターン 掲示板]仮登録が完了しました";

    $mail = new PHPMailer\PHPMailer();
    $mail->isSMTP(); 
    // $mail->SMTPDebug  = 1;
    $mail->SMTPAuth   = true;
    $mail->Host       = env('MAIL_HOST');       // メインのSMTPサーバーを指定する
    $mail->Port       = env('MAIL_PORT');       // 接続するTCPポート
    $mail->Username   = env('MAIL_USERNAME');   // SMTPユーザー名
    $mail->Password   = env('MAIL_PASSWORD');   // SMTPパスワード
    $mail->SMTPSecure = env('MAIL_ENCRYPTION'); // TLS暗号化

    // メール内容設定
    $mail->CharSet  = "UTF-8";
    $mail->Encoding = "base64";
    //FROM用メールアドレスと宛先名
    $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
    // TO用メールアドレスと宛先名
    $mail->addAddress($request->input('email'), $request->input('name'));

    $mail->Subject = $title;
    $mail->Body = $message;
    // $mail->send();
    if ($mail->send() === false) {
      echo "Mail sending failed!! Mailer Error: {$mail->ErrorInfo}";
    }

    return response()->json(Users::create([
      'user_id'=> $user_id,
      'isTemporary'=> 1,
      'name'=> $request->input('name'),
      'password'=> $request->input('password'),
      'time_temporary'=> $time,
      'urltoken'=> $urltoken
    ]));
    // return response()->json(["status"=>"OK"]);
  }

  public function tokenCheck(Request $request) {
    $data = Users::where('urltoken', $request->input('token'))->first();
    if ($data['isTemporary'] == 1) {
      $res = Users::where('urltoken', $request->input('token'))
      ->update([
        'isTemporary'=> 0,
        'urltoken'=>'none'
        ]);
      $res0 = Users::find($data['id']);
      return response()->json(['data'=>$res0, 'status'=>'OK']);
    } else {
      return response()->json(['data'=>[], 'status'=>'Error']);
    }
  }

}