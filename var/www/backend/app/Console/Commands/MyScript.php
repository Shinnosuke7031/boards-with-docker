<?php
namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use App\Users;

class MyScript extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'my_script_signature';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description.';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return mixed
   */
  protected function time_diff($d1, $d2){ 
    //初期化
    $diffTime = array();  
    //タイムスタンプ
    $timeStamp1 = strtotime($d1);
    $timeStamp2 = strtotime($d2);  
    //タイムスタンプの差を計算
    $difSeconds = $timeStamp2 - $timeStamp1;  
    //秒の差を取得
    $diffTime['seconds'] = $difSeconds % 60;  
    //分の差を取得
    $difMinutes = ($difSeconds - ($difSeconds % 60)) / 60;
    $diffTime['minutes'] = $difMinutes % 60;  
    //時の差を取得
    $difHours = ($difMinutes - ($difMinutes % 60)) / 60;
    $diffTime['hours'] = $difHours;  
    //結果を返す
    return $diffTime;
   }

  protected function now() {
    return date("Y-m-d H:i:s");
  }
  
  public function handle()
  {
    // ここに処理を書く
    // echo "HELLO!\n";
    $users = Users::all();
    for ($i=0; $i < count($users); $i++) { 
      if ($users[$i]->isTemporary != 0) {
        $diffTimeOutPut = array();
        $diffTimeOutPut = $this->time_diff($users[$i]->time_temporary, $this->now());
        // echo $diffTimeOutPut['hours'].'時間<br/>';
        // echo $diffTimeOutPut['minutes'].'分<br/>';
        // echo $diffTimeOutPut['seconds'].'秒<br/>';
        if ($diffTimeOutPut['hours']>=1) {
          // echo '時間オーバーで削除<br/>';
          Users::where('id', $users[$i]->id)->delete();
        }
      }

    }
    // echo count($users) . `\n`;

  }

}