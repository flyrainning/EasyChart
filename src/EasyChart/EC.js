"use strict";

if (!window.EC){
  var EC={
    count:0,
    item:[],
    addItem:function(_item){
      this.item.push(_item);
      this.count=this.item.length;
    },
    add:function(opt){
      var item=new EasyChart(opt);
      this.addItem(item);
      return item;
    },
    get:function(id){
      return this.getByID(id);
    },
    getByID:function(id){
      var item=undefined;
      this.item.forEach(function(o,i){
        if (o.opt.id==id){
          item=o;
          break;
        }
      });
      return item;
    },
    getByIndex:function(index){
      return this.item[index];
    }


  };
  if (window) window.EC=EC;
}
