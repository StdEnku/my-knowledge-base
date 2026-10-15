<?php

declare(strict_types=1);

interface IBird {
    function Say() : void;
}

class Karasu implements IBird {
    public function Say() : void {
        echo "カーカー\n";
    }
}

class Uguisu implements IBird {
    public function Say() : void {
        echo "ホーホケキョ\n";
    }
}

$karasu = new Karasu();
$uguisu = new Uguisu();

$karasu->Say();
$uguisu->Say();