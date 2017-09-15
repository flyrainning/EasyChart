<?php
if (!defined('EasyChart')){
	die('Access denied');
}



$c=new EasyChart("bar");

$c->option->set("title"," {
                subtext: 'ECharts'
            }");
$c->title("sss");
$c->add("ff",345);
//$c->zoom();
$c->add("aa",3415);
$c->add("bb",3245);

//$c->fullsize();
//$c->toolbox();

$c->out();

?>
