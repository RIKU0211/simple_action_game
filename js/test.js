var Ground = function(filename) {
  this.sprite = new Lib.Sprite(filename, 36, 36);

  this.update = function(){
    this.sprite.draw(context);
  }

};

var Background = function(filename){
  this.sprite = new Lib.Sprite(filename, 256, 256);

  this.update = function(){
    this.sprite.x -= 10;
  }

  this.draw = function(context){
    this.sprite.draw(context);
  }
};

var DropFall = function(filename){
  this.sprite = new Lib.Sprite(filename, 36, 36);
  
};

DropFall.prototype = {

  update: function(){
    this.sprite.draw(context);
  }
};

var Block = function(filename){
  this.sprite = new Lib.Sprite(filename, 36, 36);
};

Block.prototype = {

  update: function(){
    this.sprite.draw(context);
  }
};