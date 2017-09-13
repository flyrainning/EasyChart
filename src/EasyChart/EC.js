"use strict";

var EC={
  count:0,
  item:[],
  addItem:function(_item){
    this.item.push(_item);
    this.count=this.item.length;
  },

};
if (window) window.EC=EC;
