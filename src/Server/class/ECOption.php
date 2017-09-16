<?php

class ECOption
{

  protected $option = array();

  function set($name,$value){
    if (is_array($value)) $value=json_encode($value);
    $this->option[]=array(
      'name'=>$name,
      'option'=>$value,
    );
  }
  function parseJSFunction(){

    $code=<<<CODE

  var option={};
  var name;
  var obj;
  function add_option(name,obj){
  if (name){
    if (typeof(obj)=="string") obj=JSON.parse(obj);
    if (option[name]){
      if (name=="series"){
        if ((option[name].length)&&(obj.length)){
          for(var i=0;i<obj.length;i++){
            if (option[name][i]){
              option[name][i]=jQuery.extend(true,{},option[name][i],obj[i]);
            }else{
              option[name][i]=obj[i];
            }
          }
        }
      }else{
        option[name]=jQuery.extend(true,{},option[name],obj);
      }
    }else{
      option[name]=obj;
    }
  }
  }

CODE;
    foreach ($this->option as $opt) {
      $n=$opt["name"];
      $o=$opt["option"];
      $code.=<<<CODE

  name="$n";
  obj=$o;
  add_option(name,obj);

CODE;
    }
    $code.=<<<CODE

  return option;

CODE;
    return $code;
  }



}


 ?>
