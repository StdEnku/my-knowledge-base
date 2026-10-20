<?php

namespace main;

require_once __DIR__ . './sandbox.php';

$obj1 = \Sandbox\MySingleton::Create();
$obj2 = \Sandbox\MySingleton::Create();

echo $obj1 === $obj2;