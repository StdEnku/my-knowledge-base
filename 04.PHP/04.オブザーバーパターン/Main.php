<?php

namespace main;

require_once __DIR__ . './sandbox.php';

class MySubject implements \Sandbox\ISubject {
    public function Notify($arg = null) : void {
        var_dump($arg);
    }
}

$myObserver = new \Sandbox\Observer();

$mySubject1 = new MySubject();
$mySubject2 = new MySubject();
$mySubject3 = new MySubject();

$myObserver->AddSubject($mySubject1);
$myObserver->AddSubject($mySubject2);
$myObserver->AddSubject($mySubject3);

$myObserver->Notify("通知");

$myObserver->RemoveSubject($mySubject1);
$myObserver->RemoveSubject($mySubject2);
$myObserver->RemoveSubject($mySubject3);

$myObserver->Notify("通知");