/**
 * ground class
 * only animate...
 */
var Ground = function(filename) {
  this.sprite = new Lib.Sprite(filename, 36, 36);
  
  /**
   *  draw ground
   */
  this.draw = function(context) {
    this.sprite.draw(context);
  };
};

/**
 * background class
 */
var Background = function(filename){
  this.sprite = new Lib.Sprite(filename, 256, 256);
  
  /**
   * update background
   */
  this.update = function() {
    this.sprite.x -= 10;
  };
  
  /**
   * draw background
   */
  this.draw = function(context) {
    this.sprite.draw(context);
  };
};

/**
 * Drop Fall Class
 */
var DropFall = function(filename) {
  this.sprite = new Lib.Sprite(filename, 36, 36);
  
};

/**
 * Drop Fall's prototype
 */
DropFall.prototype = {
  update: function() {
    this.sprite.draw(context);
  }
};

/**
 * Block Class
 */
var Block = function(filename) 
  this.sprite = new Lib.Sprite(filename, 36, 36);
};

/**
 * Block's prototype
 */
Block.prototype = {
  update: function() 
    this.sprite.draw(context);
  }
};
