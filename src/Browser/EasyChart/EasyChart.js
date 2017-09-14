"use strict";


class EasyChart{
  constructor(_opt){
    var user_opt={};
    if (typeof(EasyChart_config)=="object") user_opt=EasyChart_config;
    this.opt=Object.assign({
      echarts_style:'macarons',
      loading_text:'加载中 ...',
      uri:"/api/",
      post:false,
      width:"",
      height:"",

      use_websocket:false

    },user_opt);


    this.echarts=false;
    this.is_debug=false;
    this.DOM=false;

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
      this.DOM=jQuery("#"+this.opt.id);
      if (this.opt.width) this.DOM.css({width:this.opt.width});
      if (this.opt.height) this.DOM.css({height:this.opt.height});
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
  ajax(api,PostData,callback){
    var that=this;
    if (typeof(PostData)!="object"){
  		PostData={data:PostData};
  	}
    PostData.__api=api;

  	jQuery.ajax({
  		type: "POST",
  		timeout : 600000,
  		url: this.opt.uri,
  		data: PostData,
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

    this.send(postdata,function(msg){
      if (typeof(msg)=="string") msg=JSON.parse(msg);
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
        that.echarts.hideLoading();
  		}else{
        var a=msg.msg || msg.data;
        console.log(msg);
        var msgs=msg.msg||msg.data||msg.message||"";
  			that.msg(msgs);
  		}

    });

  }

};
