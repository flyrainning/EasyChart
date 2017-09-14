<?php
/**
 *
 */
class chart
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
  function error($msg){
    return json_encode(array(
      "result"=>false,
      "type"=>"error",
      "data"=>$msg
    ));
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

/**
 *
 */
class chart_dataMaker_line extends chart_dataMaker
{
  function __construct()
  {
    $this->config=<<<CODE
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    },

    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'值',
            type:'line',
            smooth:true,
            lineWidth:1.2,

            itemStyle:{
                normal:{
                    color:'#f17a52',
                    shadowBlur: 40,
                    label:{
                        show:true,
                        position:'top',
                        textStyle:{
                            color:'#f17a52',

                        }
                    }
                }
            },
            areaStyle:{
                normal:{
                    color:'#f17a52',
                    opacity:0.08
                }
            },
            data:[]
        }
    ],

CODE;
  }

}


/**
 *
 */
class chart_dataMaker_bar extends chart_dataMaker
{
  function __construct()
  {
    $this->config=<<<CODE
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    },

    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'值',
            type:'bar',
            barWidth: '60%',
            data:[]
        }
    ],

CODE;
  }
}
class chart_dataMaker_pie extends chart_dataMaker
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
class chart_dataMaker_scatter extends chart_dataMaker
{
  function __construct()
  {
    $this->config=<<<CODE


CODE;
  }
  function add($d){

  }
}
class chart_dataMaker_gauge extends chart_dataMaker
{
  public $max;
  function __construct()
  {
    $this->config=<<<CODE
    tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
      },


      series: [
          {
              name: '百分比',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [0]
          }
      ],

CODE;
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
