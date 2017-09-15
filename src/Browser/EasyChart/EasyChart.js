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
      debug:false,

      use_websocket:false

    },user_opt);


    this.echarts=false;

    this.DOM=false;

    this.init(_opt);
  }
  debug(isdebug){
    this.opt.debug=(isdebug)?true:false;
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
      if (this.opt.debug) console.log("No id found for EasyChart");
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
    PostData.EC_api=api;

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
  resize(){
    this.echarts.resize();
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

  			var opt={};
  			if (msg.data){
  				//config=eval("("+msg.data+")");
          opt=(new Function("EasyChart",msg.data))(this);
  			}

  			if (that.opt.debug){
  				console.log("option:",opt);
          window.debug_opt=opt;
          window.myChart=that.echarts;
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
