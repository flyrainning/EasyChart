<?php
/**
 *
 */
class Chart_Line extends ECData
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


 ?>
