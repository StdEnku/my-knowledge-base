<?php
/*-----------------------------------------------------------------
[リフレクションでコンストラクタの解析をする例]

クラス::classスタティック変数で名前空間こみのクラス名を取得可能

$refClass = new ReflectionClass(クラス名);　//リフレクションクラス取得可能
$refMethod = $refClass->getConstructor(); // コンストラクタを取得可能



*///---------------------------------------------------------------

class Add {
    private int $_lhf;
    private int $_rhf;

    public function __construct(int $lhf, int $rhf) {
        $this->_lhf = $lhf;
        $this->_rhf = $rhf;
    }

    public function Result() : int {
        return $this->_lhf + $this->_rhf;
    }
}

echo "クラス名 = " . Add::class . "\n";

$refClass = new ReflectionClass(Add::class);
$refMethod = $refClass->getConstructor();

if ($refMethod === null) {
    //コンストラクタがない場合の処理
}

$params = $refMethod->getParameters();

echo "---------------------------------\n";
echo "ここからコンストラクタ引数解析↓\n";
foreach($params as $param) {
    $name = $param->getName();
    
    $type = $param->getType();
    $typeName = $type->getName();

    $isOptional = $param->isOptional() ? "はい" : "いいえ";

    echo "型 = {$typeName}, 名前 = {$name}, オプショナルか? = {$isOptional}\n";
}

echo "---------------------------------\n";
$args = [2,3];

// リフレクションで実体化
$add = $refClass->newInstanceArgs($args);

$result = $add->Result();
echo "{$lhf} + {$rhf} = {$result}";