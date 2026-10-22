<?php

class practiceController
{
    public function form() 
    {
        require_once __DIR__ . '/../views/form.phtml';
    }

    public function result() 
    {
        $Message = $_GET['sendText'];
        require_once __DIR__ . '/../views/result.phtml';
    }
}