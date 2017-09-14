<?php
/**
 *
 */
class EasyChart
{
  protected $config = array();
  protected $type="";
  protected $data_maker=false;
  protected $addon_conf="";

  public $switch=array(
    'title'=>true,

  );

  function __construct($type="bar",$conf="")
  {
    $this->set_type($type);
    $this->set_config($conf);
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
    $this->type=$type;
    $classname="chart_dataMaker";
    if (!empty($type)){
      $classname.='_'.$type;
    }
    $this->data_maker=new $classname;
  }
  function set_config($conf=''){

    $this->config=$this->data_maker->get_config($conf);
  }
  function data(){
    $args = func_get_args();
    $this->data_maker->add($args);
  }
  function add_data($data){
    $this->data_maker->add_data($data);
  }
  function clean($d){
    $this->data_maker->clean();
  }
  function right2left(){
    $this->data_maker->right2left();
  }
  static function error($msg){
    echo json_encode(array(
      "result"=>false,
      "type"=>"error",
      "data"=>$msg
    ));
    die();
  }
  static function getAPI($msg){
    return self::getVar("__api","");
  }
  static function getVar($name,$default=""){
    print_r($_REQUEST[$name]);
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
    //合并config
    $configs='{';
    $configs.=$this->config;
    $configs.=$this->addon_conf;
    $configs.='}';

    //输出
    //print_r($this->data_maker->out());
    return array(
    	'config'=>$configs,
    	'data'=>$this->data_maker->out(),
    );

  }


}


?>
