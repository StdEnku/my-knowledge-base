<?php 

require_once __DIR__ . '/Controllers/WeatherGetterController.php';

$requestMethod = $_SERVER['REQUEST_METHOD']; //httpメソッドの種類取得
if($requestMethod != 'GET' && $requestMethod != 'POST') {
    ClientError("無効なhttpメソッド");
}

//pathクエリパラメータを取得
$isExistsPathInGet = isset($_GET['path']);
$isExistsPathInPost = isset($_POST['path']);
$path = !$isExistsPathInGet &&  !$isExistsPathInPost ? null :
        ($isExistsPathInGet ?  $_GET['path'] : $_POST['path']);

//ここからコントローラを生成
$weatherGetterController = new WeatherGetterController();

if($path === null)              ClientError("無効なパスが設定されました。");
else if($path == "selctRegion") $weatherGetterController->SelectRegion();
else if($path == "result")      $weatherGetterController->Result();

function ClientError(string $msg) {
    require_once __DIR__ . "/views/ErrorPage.phtml";
}