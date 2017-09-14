"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EC_Group = function () {
  function EC_Group() {
    _classCallCheck(this, EC_Group);

    this.count = 0;
    this.item = [];
  }

  _createClass(EC_Group, [{
    key: "addItem",
    value: function addItem(_item) {
      this.item.push(_item);
      this.count = this.item.length;
    }
  }, {
    key: "add",
    value: function add(opt) {
      var item = new EasyChart(opt);
      this.addItem(item);
      return item;
    }
  }, {
    key: "get",
    value: function get(id) {
      return this.getByID(id);
    }
  }, {
    key: "getByID",
    value: function getByID(id) {
      var item;
      this.item.forEach(function (obj, i) {
        if (obj.opt.id == id) {
          item = obj;
        }
      });
      return item;
    }
  }, {
    key: "getByIndex",
    value: function getByIndex(index) {
      return this.item[index];
    }
  }]);

  return EC_Group;
}();

if (window && !window.EC) {
  window.EC = new EC_Group();
}

"use strict";

var EasyChart = function () {
  function EasyChart(_opt) {
    _classCallCheck(this, EasyChart);

    this.opt = {
      echarts_style: 'macarons',
      loading_text: '加载中 ...',
      uri: "/EasyChart/api",
      post: false,
      width: "",
      height: "",

      use_websocket: false

    };

    this.echarts = false;
    this.is_debug = false;
    this.EL = false;

    this.init(_opt);
  }

  _createClass(EasyChart, [{
    key: "debug",
    value: function debug(isdebug) {
      this.is_debug = isdebug ? true : false;
    }
  }, {
    key: "setOpt",
    value: function setOpt(_opt) {
      _opt = _opt || {};
      this.opt = Object.assign(this.opt, _opt);
    }
  }, {
    key: "init",
    value: function init(_opt) {
      this.setOpt(_opt);
      if (this.echarts) return;
      if (this.opt.id) {
        this.EL = jQuery("#" + this.opt.id);
        if (this.opt.width) this.EL.css({ width: this.opt.width });
        if (this.opt.height) this.EL.css({ height: this.opt.height });
        this.echarts = echarts.init(document.getElementById(this.opt.id), this.opt.echarts_style);
        this.echarts.showLoading({
          text: this.opt.loading_text
        });
        if (typeof this.opt.onload == "function") this.opt.onload(this);
      } else {
        if (this.is_debug) console.log("No id found for EasyChart");
      }
    }
  }, {
    key: "send",
    value: function send(data, callback) {
      if (this.opt.use_websocket) {} else {
        this.ajax(this.opt.api, data, callback);
      }
    }
  }, {
    key: "ajax",
    value: function ajax(api, datas, callback) {
      var that = this;
      jQuery.ajax({
        type: "POST",
        timeout: 600000,
        url: this.opt.uri + "/index.php?api=" + api,
        data: datas,
        success: callback,
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          that.msg('与服务器链接失败，请重试 : ' + textStatus + '  ' + errorThrown, true);
        }

      });
    }
  }, {
    key: "msg",
    value: function msg(_msg) {
      if (_msg) {
        this.echarts.showLoading({ text: _msg });
      } else {
        this.echarts.hideLoading();
      }
    }
  }, {
    key: "load",
    value: function load(data, _opt) {
      //加载数据

      if (this.echarts) {
        if (_opt) this.init(_opt);
      } else {
        this.init(_opt);
      }
      var that = this;

      var postdata = data || this.opt.post || "";
      if ((typeof postdata === "undefined" ? "undefined" : _typeof(postdata)) != "object") {
        postdata = { data: postdata };
      }
      this.send(postdata, function (msg) {
        if (msg.result) {

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

          if (that.is_debug) {
            console.log("config:", config);
            console.log("data:", data);
            console.log("option:", opt);
          }

          that.echarts.setOption(opt);
        } else {
          that.msg(msg.data);
        }
        that.echarts.hideLoading();
      });
    }
  }]);

  return EasyChart;
}();

;

function EC_UUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
      i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
function EC_ID(header) {
  header = header || "ID";
  return header + "_" + EC_UUID(10);
}

jQuery(function ($) {
  $("[EasyChart]").each(function (c) {

    var opt = {};
    var iopt = $(this).data("opt");
    if (iopt) {
      opt = (typeof iopt === "undefined" ? "undefined" : _typeof(iopt)) == "object" ? iopt : JSON.parse(iopt);
    }

    var id = $(this).attr("id");
    if (!id) {
      id = opt.id || EC_ID("EasyChart");
      $(this).attr("id", id);
    }
    opt.id = id;

    var api = $(this).data("api");
    if (api) opt.api = api;

    var debug = $(this).data("debug");
    if (debug) {
      opt.debug = true;
      item.debug(true);
    }

    var init_function_name = $(this).data("onload");
    if (init_function_name) {
      if (typeof window[init_function_name] == "function") {
        opt.onload = window[init_function_name];
      }
    }

    window.EasyChart_delaytime = 1;
    var delaytime = parseInt($(this).data("delay"));
    if (!delaytime) {
      if (opt.delay) {
        delaytime = opt.delay;
      } else {
        delaytime = window.EasyChart_delaytime;
        window.EasyChart_delaytime += 300;
      }
    }

    var post = $(this).data("post");
    if (post) {
      opt.post = (typeof post === "undefined" ? "undefined" : _typeof(post)) == "object" ? post : JSON.parse(post);
    }

    var item = window.EC.add(opt);
    $(this).data("EasyChart", item);

    window.setTimeout(function () {
      item.load();
    }, delaytime);
  });
  // if (typeof(charts_init)=="function"){
  // 	charts_init();
  // }
});