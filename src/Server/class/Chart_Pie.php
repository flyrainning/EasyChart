<?php

class Chart_Pie extends ECData
{
  function __construct()
  {
    $this->config=<<<CODE
        tooltip: {
            trigger: 'item',
            formatter: "{b} <br/>{c} ({d}%)"
        },
        legend: {
            show:true,
            orient: 'vertical',
            x: 'right',
            top:'50px',
            data:['']
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['40%', '70%'],
                data:[
                    {value:0, name:''}
                ],

            }
        ],

CODE;
  }
  function add($d){
    if (isset($d[1])){
      $this->d1[]=$d[0];
      $this->d2[]=array(
        'name'=>$d[0],
        'value'=>$d[1],
        'data'=>(isset($d[2]))?$d[2]:'',
      );


    }

  }
  function make_data(){
    $this->data=array(
      'legend'=>array(
        "data"=>$this->d1,
      ),
      'series'=>array(
        array(
          "data"=>$this->d2,
        )
      )
    );
  }
}

 ?>
