<?php

namespace main;

require_once __DIR__ . './sandbox.php';

// #region Sandbox.phpのクラスの使用例
/*
$karasu = new \Sandbox\Karasu();
$niwatori = new \Sandbox\Niwatori();

$karasu->Say();
$niwatori->Say();
*/
// #endregion

$list = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
];

foreach($list as $row) {
    foreach($row as $col) {
        echo $col . ",";
    }
    echo "\n";
}