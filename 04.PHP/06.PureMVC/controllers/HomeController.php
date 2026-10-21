<?php

class HomeController 
{
    //ホーム画面を表示するメソッド（GET /home）
    public function index() 
    {
        // 置換作業で使用する変数を用意して呼び出し
        $Message = "Hello MVC!!!";
        require_once __DIR__ . '/../views/Home.phtml';
    }
}