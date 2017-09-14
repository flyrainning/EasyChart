<?php
require '../src/PHP_Server/loader.php';


//取得需要的变量
$_hash="";
if (isset($_REQUEST["api"])){//取得API
  $_hash=$_REQUEST["api"];
}

empty($_hash) and EasyChart::error('没有指定API');

function uhash($p){
	return strtr($p,array('.' => '/'));
}
$_file=uhash($_hash).'.php';


if (file_exists($_file)) {

	require $_file;

}else{
	EasyChart::error('找不到API');
}

?>
