<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id');
            $table->string('name');
            $table->string('password');
            $table->boolean('isTemporary');
            $table->string('urltoken');
            $table->string('time_temporary');
            $table->timestamps();
        });
        Schema::create('boards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id');
            $table->string('name');
            $table->string('comment');
            $table->boolean('isFile');
            $table->string('fname');
            $table->string('extension');
            $table->dateTime('time');
            $table->binary('raw_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boards');
        Schema::dropIfExists('users');
    }
}

