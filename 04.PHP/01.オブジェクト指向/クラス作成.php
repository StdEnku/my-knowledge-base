<?php
/*
    [メモ]
    メンバにアクセスするには$this->var
*/
class Add
{
    private int $_lhf;
    private int $_rhf;

    public function __construct(int $lhf, int $rhf)
    {
        $this->_lhf = $lhf;
        $this->_rhf = $rhf;
    }

    public function result() : int
    {
        return $this->_lhf + $this->_rhf;
    }
}

$add = new Add(1,2);
echo $add->result();