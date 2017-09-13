jQuery(function($){
	$("[EasyChart]").each(function(c){

    var opt={};
    var iopt=$(this).data("opt");
    if (iopt){
      opt=(typeof(iopt)=="object")?iopt:JSON.parse(iopt);
    }

    var id=$(this).attr("id");
		if (!id){
      id=opt.id || EC_ID("EasyChart");
      $(this).attr("id",id);
		}
    opt.id=id;


    var api=$(this).data("api");
    if (api) opt.api=api;

    var debug=$(this).data("debug");
    if (debug){
      opt.debug=true;
			item.debug(true);
		}

    var init_function_name=$(this).data("onload");
    if (init_function_name){
      if (typeof(window[init_function_name])=="function"){
  			opt.onload=window[init_function_name];
  		}
    }

    window.EasyChart_delaytime=1;
		var delaytime=parseInt($(this).data("delay"));
    if (!delaytime){
      if (opt.delay){
        delaytime=opt.delay;
      }else{
        delaytime=window.EasyChart_delaytime;
        window.EasyChart_delaytime+=300;
      }
		}

    var send=$(this).data("send");
    if (send){
      opt.send=(typeof(send)=="object")?send:JSON.parse(send);
    }

    var item=window.EC.add(opt);
    $(this).data("EasyChart",item);


    window.setTimeout(function(){
      item.load();
    },delaytime);


	});
	// if (typeof(charts_init)=="function"){
	// 	charts_init();
	// }

});
