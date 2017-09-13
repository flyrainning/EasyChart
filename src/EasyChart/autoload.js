jQuery(function($){
	$("[data-chart]").each(function(c){
		var id=$(this).attr("id");
		if (! id){
			id="div_chart_id_"+c;
			$(this).attr("id",id);
		}
		window.charts[id]=new chart(id,$(this).data("chart"));

		if ($(this).data("debug")){

			window.charts[id].debug();
		}

		var init_function_name=$(this).data("init");
		if (typeof(window[init_function_name])=="function"){
			window[init_function_name](window.charts[id]);

		}

		var postdata=$(this).data("data");

		var delaytime=parseInt($(this).data("delay"));
		if (delaytime){

			window.setTimeout(function(){
				window.charts[id].load(postdata);
			},delaytime);

		}else{
			window.charts[id].load(postdata);
		}


	});
	if (typeof(charts_init)=="function"){
		charts_init();
	}

});
