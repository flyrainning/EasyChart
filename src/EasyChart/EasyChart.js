"use strict";


class EasyChart{
  constructor(_opt){
    this.opt={
      id:EC_ID("EasyChart"),//id
      echarts_style:'macarons',
      loading_text:'加载中 ...',

    };
    this.setOpt(_opt);

    this.echarts=false;
    this.is_debug=false;
  }
  debug(isdebug){
    this.is_debug=(isdebug)?true:false;
  }
  setOpt(_opt){
    _opt=_opt || {};
    this.opt=Object.assign(this.opt,_opt);
  }
  init(_opt){
    this.setOpt(_opt);
    this.echarts=echarts.init(document.getElementById(this.id),this.opt.echarts_style);
  	this.echarts.showLoading({
  		text : this.opt.loading_text,
  	});
  }
  ajax(api,datas,callback){
  	jQuery.ajax({
  		type: "POST",
  		timeout : 600000,
  		url: "/index.php?api="+api,
  		data: datas,
  		success: callback,
  		error:function(XMLHttpRequest, textStatus, errorThrown){
  			this.msg('与服务器链接失败，请重试<br /><br />'+textStatus+'  <br />  '+errorThrown,true);
  		}

  	});
  }
  msg(msg){
    this.echarts.showLoading({
  		text : msg,
  	});
  }
  load(data,_opt){
    if (!this.echarts) this.init(_opt);
  	var that=this;
    
  	var postdata=data;
  	if (typeof(postdata)!="object"){
  		postdata={data:postdata};
  	}
  	this.ajax(that.api,postdata,function(msg){

  		if (msg.result){

  			var config={};
  			if (msg.data.config){
  				config=eval("("+msg.data.config+")");
  			}
  			var data={};
  			if (msg.data.data){
  				data=msg.data.data;
  			}

  			var opt=jQuery.extend(true,{},config,data);

  			if (that.is_debug){
  				console.log("config:",config);
  				console.log("data:",data);
  				console.log("option:",opt);
  			}

  			that.charts.setOption(opt);
  		}else{
  			malert(msg.data);
  		}
  		that.charts.hideLoading();
  	});
  }

};
