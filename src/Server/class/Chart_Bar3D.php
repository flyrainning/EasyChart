<?php


/**
 *
 */
class Chart_Bar3D extends ECData3D
{
  function init(){

    $this->option->set("tooltip","{}");

    $this->option->set("backgroundColor","#FFFFFF");
    $this->option->set("visualMap","
    {
         max: 20,
         inRange: {
             color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
         }
     }
    ");
    $this->option->set("xAxis3D","
    {
       type: 'category',
       data: []
    }
    ");
    $this->option->set("yAxis3D","
    {
       type: 'category',
       data: []
    }
    ");
    $this->option->set("zAxis3D","
    {
       type: 'value',
       data: []
    }
    ");
    $this->option->set("grid3D","
    {
       boxWidth: 200,
       boxDepth: 80,
       light: {
           main: {
               intensity: 1.2
           },
           ambient: {
               intensity: 0.3
           }
       }
   }
    ");
    $this->option->set("series","
    [{
        type: 'bar3D',
        data: [],
        shading: 'color',

        label: {
            show: false,
            textStyle: {
                fontSize: 16,
                borderWidth: 1
            }
        },

        itemStyle: {
            opacity: 0.4
        },

        emphasis: {
            label: {
                textStyle: {
                    fontSize: 20,
                    color: '#900'
                }
            },
            itemStyle: {
                color: '#900'
            }
        }
    }]
       ");


  }
}


 ?>
