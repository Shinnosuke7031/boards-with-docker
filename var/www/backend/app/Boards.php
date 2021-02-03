<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Boards extends Model
{
  protected $table = 'posts'; 
  protected $fillable = ['user_id', 'name', 'comment', 'isFile', 'time', 'fname', 'extension', 'raw_data'];
}