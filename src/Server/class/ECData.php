<?php

class ECData
{
  protected $data=array();
  protected $d1=array();
  protected $d2=array();
  protected $d3=array();
  protected $d4=array();
  protected $d5=array();
  protected $config='';

  function __construct()
  {
    $this->config='';
  }
  function get_config($conf){
    return $this->config . "\n" . $conf;
  }
  function set_data($data){
    $this->data=$data;
  }
  function get_data($data){
    return $this->data;
  }
  function add_data($data){
    $this->data=array_merge($this->data,$data);
  }
  function add($d){
    if (isset($d[1])){
      $this->d1[]=$d[0];
      $this->d2[]=array(
        "value"=>$d[1],
        'data'=>(isset($d[2]))?$d[2]:'',
      );

    }

  }
  function make_data(){
    $this->data=array(
      'xAxis'=>array(
        array(
          "data"=>$this->d1,
        )
      ),
      'series'=>array(
        array(
          "data"=>$this->d2,
        )
      )
    );
  }
  function clean($d){
    $this->data=array();
  }
  function right2left(){
    $this->d1=array_reverse($this->d1);
    $this->d2=array_reverse($this->d2);
    $this->d3=array_reverse($this->d3);
    $this->d4=array_reverse($this->d4);
    $this->d5=array_reverse($this->d5);
  }
  function out(){
    $this->make_data();
    return $this->data;
  }
}


 ?>
