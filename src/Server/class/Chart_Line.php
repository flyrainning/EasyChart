<?php
/**
 *
 */
class Chart_Line extends ECData
{
  function init(){
    $this->option->set("tooltip","
    {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    }
    ");
    $this->option->set("xAxis","
    [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ]
    ");
    $this->option->set("yAxis","
    [
        {
            type : 'value'
        }
    ]
    ");
    $this->option->set("series","
    [
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
    ]
    ");
  
  }

}


 ?>
