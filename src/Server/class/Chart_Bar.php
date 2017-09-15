<?php


/**
 *
 */
class Chart_Bar extends ECData
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
            type:'bar',
            barWidth: '60%',
            data:[]
        }
    ]
       ");


  }
}


 ?>
