<?php

require '../src/Server/loader.php';



//取得需要的变量
$_hash=EasyChart::getAPI();

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
