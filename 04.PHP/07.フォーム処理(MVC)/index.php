<?php //フロントコントローラ

require_once __DIR__ . '/controllers/PracticeController.php';

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

$practiceController = new PracticeController();

if (is_null($path)) {
    // 設計としてはindex.phpで直接表示させたくないのでエラー処理
} else if($path == "form") { //http://localhost/my-site/?path=form
    $practiceController->form();
} else if($path == "result") {
    $practiceController->result();
}