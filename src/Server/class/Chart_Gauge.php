<?php

class Chart_Gauge extends ECData
{
  public $max;
  function init(){
    $this->option->set("tooltip",'
    {
        formatter: "{a} <br/>{b} : {c}%"
    }
    ');
    $this->option->set("series","
    [
        {
            name: '百分比',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: [0]
        }
    ]
    ");

  }
  function add($d){
    if (isset($d[1])){
      $this->d1[]=array(
        'name'=>$d[0],
        'value'=>$d[1],
        'data'=>(isset($d[2]))?$d[2]:'',
      );
      $this->max=($d[1]<=100)?"100":ceil($d[1]/10)*10;
    }

  }
  function make_data(){

    $this->data=array(
      'series'=>array(
        array(
          "max"=>$this->max,
          "data"=>$this->d1,
        )
      )
    );
  }
}

 ?>
