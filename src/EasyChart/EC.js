"use strict";

class EC_Group{
  constructor(){
    this.count=0;
    this.item=[];
  }
  addItem(_item){
    this.item.push(_item);
    this.count=this.item.length;
  }
  add(opt){
    var item=new EasyChart(opt);
    this.addItem(item);
    return item;
  }
  get(id){
    return this.getByID(id);
  }
  getByID(id){
    var item;
    this.item.forEach(function(obj,i){
      if (obj.opt.id==id){
        item=obj;
      }
    });
    return item;
  }
  getByIndex(index){
    return this.item[index];
  }

}

if ((window)&&(!window.EC)){
  window.EC=new EC_Group();
}
