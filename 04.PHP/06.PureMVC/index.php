<?php //フロントコントローラ

require_once __DIR__ . '/controllers/HomeController.php';

// リクエストメソッドの種類
$requestMethod = $_SERVER['REQUEST_METHOD'];
if($requestMethod != 'GET' && $requestMethod != 'POST') {
    // GETでもPOSTでもない場合に行うエラー処理
}


// リクエストがGETならtrue、POSTならfalse、それ以外ならnull
$isExistsPathInGet = isset($_GET['path']);
$isExistsPathInPost = isset($_POST['path']);

$path = !$isExistsPathInGet &&  !$isExistsPathInPost ? null :
        ($isExistsPathInGet ?  $_GET['path'] : $_POST['path']);

if (is_null($path)) {
    // ホームコントローラ操作
    $homeController = new HomeController();
    $homeController->index();
}