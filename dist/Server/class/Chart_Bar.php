<?php


/**
 *
 */
class Chart_Bar extends ECData
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


 ?>
