<?php
/**
 *
 */
class EasyChart
{
  protected $type="";
  public $data=false;
  public $option=false;


  function __construct($type="bar"){
    $this->set_type($type);
  }
  function title($title='',$subtitle='',$x="left"){
    $this->addon_conf.=<<<CODE
    title : {
            text: '$title',
            subtext: '$subtitle',
            x: '$x',
            align: 'left'
        },
CODE;
  }
  function zoom($enable=true){
    $en=($enable)?"true":"false";
    $this->addon_conf.=<<<CODE
    dataZoom: {
        show: $en,
        start : 0
    },

CODE;
  }
  function fullsize($left="1%",$right="1%",$top="60",$bottom="60"){
    $this->addon_conf.=<<<CODE
    grid: {
        left: '$left',
        right: '$right',
        top: '$top',
        bottom: '$bottom',
        containLabel: true
    },
CODE;

  }
  function toolbox($conf=""){
    $this->addon_conf.=<<<CODE
  toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
          //  magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true},
            $conf
        }
    },
CODE;
  }
  function set_type($type=''){
    $this->type=ucfirst($type);
    if (!empty($type)){
      $classname='Chart_'.$this->type;
      $this->option=new ECOption();
      $this->data=new $classname($this->option);

    }else{

    }

  }

  function add(){
    $args = func_get_args();
    $this->data->add($args);
  }
  function add_data($data){
    $this->data->add_data($data);
  }
  function clean($d){
    $this->data->clean();
  }
  function right2left(){
    $this->data->right2left();
  }
  static function error($msg){
    self::apiout(array(
      "result"=>false,
      "type"=>"error",
      "data"=>$msg
    ));

  }
  static function apiout($data){

    header('Cache-Control: no-cache, must-revalidate');
		header("Pragma: no-cache");
    header('Content-type: application/json');

    echo json_encode($data);
    die();
  }
  static function getAPI($msg){
    return self::getVar("__api","");
  }
  static function getVar($name,$default=""){
    return (isset($_REQUEST[$name]))?$_REQUEST[$name]:$default;
  }
  static function getP($parmstr){
		$str=is_array($parmstr)?$parmstr:explode(',',trim($parmstr,','));
		foreach ($str as $ks){
			$k=trim($ks);
			global ${$k};
			${$k}=self::getVar($k);
		}

	}
  function out(){
    $this->data->build();
    self::apiout(
      array(
      	'result'=>true,
        'type'=>"option",
      	'data'=>$this->option->parseJSFunction(),
      )
    );

  }

}


?>
