<?php

namespace Sandbox;

// オブザーバーパターンで監視される側のインターフェース
interface ISubject {
    public function Notify($arg = null) : void;
}

// オブザーバーパターンの監視者
class Observer {
    private array $_subjects;

    public function __construct(){
        $this->_subjects = [];
    }

    public function AddSubject(ISubject $subject) {
        $this->_subjects[] = $subject;
    }

    public function RemoveSubject(ISubject $subject) {
        $index = array_search($subject, $this->_subjects, true);

        $isInt = is_int($index);
        if ($isInt == false) {
            // 未登録の要素が検索された際の処理
        }

        unset($this->_subjects[$index]);
    }

    public function Notify($arg = null) {
        foreach($this->_subjects as $element)
            $element->Notify($arg);
    }
}