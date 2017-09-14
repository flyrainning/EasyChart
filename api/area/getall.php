<?php
if (!defined('EasyChart')){
	die('Access denied');
}

function customError($errno, $errstr, $errfile, $errline)
 {
 echo "<b>Custom error:</b> [$errno] $errstr<br />";
 echo " Error on line $errline in $errfile<br />";
 echo "Ending Script";
 die();
 }

//set error handler
set_error_handler("customError");


$c=new EasyChart("bar");

$c->option->set("title"," {
                subtext: 'ECharts'
            }");

//$c->zoom();

//$c->fullsize();
//$c->toolbox();

$c->out();

?>
