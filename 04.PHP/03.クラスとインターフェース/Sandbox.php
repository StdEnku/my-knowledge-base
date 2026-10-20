<?php

namespace Sandbox;

interface IBird {
    public function Say() : void;
}

class Karasu implements IBird {
    public function Say() : void {
        echo "カーカー!\n";
    }
}

class Niwatori implements IBird {
    public function Say() : void {
        echo "コケコッコー!\n";
    }
}