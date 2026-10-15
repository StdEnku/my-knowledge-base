
<?php
try {
    // データベースに接続
    //第一引数 : 接続文字列
    //第二引数 : ユーザー
    //第三引数 : パスワード
    $pdo = new PDO(
        'mysql:host=localhost;port=3306;dbname=book;charset=utf8mb4',
        'root',
        ''
    );


    // SQLを実行
    // stmtは結果を一行ずつ取得するためのオブジェクト
    $stmt = $pdo->query('SELECT * FROM books');

    // 結果を1行ずつ取得
    // ::は静的メンバを取得するための演算子
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo htmlspecialchars(
            print_r($row, true),
            ENT_QUOTES,
            'UTF-8'
        );
        echo "<br>";
    }

} catch (PDOException $e) {
    echo "データベースエラーが発生しました。";
}

$pdo = null;