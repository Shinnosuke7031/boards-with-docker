<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Users;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use PHPMailer\PHPMailer;
use Symfony\Component\HttpFoundation\Cookie;

class UsersController extends Controller
{

  public function users() {
    $users = Users::all();
    return response()->json($users);
  }

  public function logout(Request $request) {
    $request->cookie('token');
    return response()->json()->withCookie(new Cookie('token', 'none'));;
  }

  public function new_user(Request $request) {
    $user_id = substr(bin2hex(random_bytes(8)), 0, 8);
    $urltoken = substr(bin2hex(random_bytes(48)), 0, 48);
    $time = date("Y-m-d H:i:s");

    $url = 'http://localhost:3100/signup-complete?token=' . $urltoken;
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

  // JWTによる認証 //

  private function jwt(Users $users){
    $signer = new Sha256();
    $token = (new Builder())->setIssuer('http://localhost:8080')
        ->setAudience('http://localhost:8080')
        ->setId(uniqid(), true)
        ->setIssuedAt(time())
        ->setNotBefore(time() + 60)
        ->setExpiration(time() + 3600)
        ->set('user_id', $users->user_id)
        ->sign($signer, env('JWT_SECRET'))
        ->getToken();
    return $token;
  }
  public function authenticate(Request $request) {
    $this->validate($request, [
        'userID'    => 'required',
        'pass' => 'required'
    ]);
    $users = Users::where('user_id', $request->input('userID'))->first();
    if (!$users) {
        return response()->json(['error' => 'ログインできませんでした(E1)。'], 400);
    }
    if ($request->input('pass') == $users['password']) {
        return response()->json(['token'=>$this->jwt($users)->__toString(), "status"=>'OK', 'name'=>$users['name']], 200)
                         ->withCookie(new Cookie('token', $this->jwt($users)->__toString()));
    }
    return response()->json(['error' => 'ログインできませんでした(E2)。'], 400);
  }

  public function userinfo(Request $request){
    $user = Users::where('user_id', $request->user)->first();
    return response()->json(['userID'=>$user['user_id'], 'name'=>$user['name']]);
  }

}