<?php

require_once __DIR__ . '/mod1.php';
require_once __DIR__ . '/mod2.php';

$valueA = \mod1\func();
$valueB = \mod2\func();

echo "valueA = {$valueA}\n";
echo "valueB = {$valueB}\n";