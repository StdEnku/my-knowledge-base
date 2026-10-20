<?php

namespace Sandbox;

class MySingleton {
    private static ?MySingleton $INSTANCE = null;

    private function __construct() {}

    public static function Create() : MySingleton {
        $instanceIsNull = is_null(self::$INSTANCE);

        if ($instanceIsNull)
            self::$INSTANCE = new MySingleton();

        return self::$INSTANCE;
    }
}