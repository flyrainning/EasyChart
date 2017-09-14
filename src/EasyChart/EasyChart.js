"use strict";


class EasyChart{
  constructor(_opt){
    this.opt={
      echarts_style:'macarons',
      loading_text:'加载中 ...',
      uri:"/EasyChart/api",
      post:false,
      width:"",
      height:"",


      use_websocket:false

    };


    this.echarts=false;
    this.is_debug=false;
    this.EL=false;

    this.init(_opt);
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
    if (this.echarts) return;
    if (this.opt.id){
      this.EL=jQuery("#"+this.opt.id);
      if (this.opt.width) this.EL.css({width:this.opt.width});
      if (this.opt.height) this.EL.css({height:this.opt.height});
      this.echarts=echarts.init(document.getElementById(this.opt.id),this.opt.echarts_style);
    	this.echarts.showLoading({
    		text : this.opt.loading_text,
    	});
      if (typeof(this.opt.onload)=="function") this.opt.onload(this);
    }else{
      if (this.is_debug) console.log("No id found for EasyChart");
    }

  }
  send(data,callback){
    if (this.opt.use_websocket){

    }else{
      this.ajax(this.opt.api,data,callback);
    }
  }
  ajax(api,datas,callback){
    var that=this;
  	jQuery.ajax({
  		type: "POST",
  		timeout : 600000,
  		url: this.opt.uri+"/index.php?api="+api,
  		data: datas,
  		success: callback,
  		error:function(XMLHttpRequest, textStatus, errorThrown){
  			that.msg('与服务器链接失败，请重试 : '+textStatus+'  '+errorThrown,true);
  		}

  	});
  }
  msg(msg){
    if (msg){
      this.echarts.showLoading({text : msg});
    }else{
      this.echarts.hideLoading();
    }
  }
  load(data,_opt){//加载数据

    if (this.echarts){
      if (_opt) this.init(_opt);
    }else{
      this.init(_opt);
    }
  	var that=this;

  	var postdata=data || this.opt.post || "";
  	if (typeof(postdata)!="object"){
  		postdata={data:postdata};
  	}
    this.send(postdata,function(msg){
      if (msg.result){

  			// var config={};
  			// if (msg.data.config){
  			// 	config=eval("("+msg.data.config+")");
  			// }
  			// var data={};
  			// if (msg.data.data){
  			// 	data=msg.data.data;
  			// }
        //
  			// var opt=jQuery.extend(true,{},config,data);

  			if (that.is_debug){
  				console.log("config:",config);
  				console.log("data:",data);
  				console.log("option:",opt);
  			}

  			that.echarts.setOption(opt);
  		}else{
  			that.msg(msg.data);
  		}
  		that.echarts.hideLoading();
    });

  }

};
