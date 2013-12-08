var Ground = function(filename) {
  this.sprite = new Lib.Sprite(filename, 36, 36);

  this.update = function(){
    this.sprite.draw(context);
  }

};

/*
 *  プレイヤー
 */
var Player = function(filename){
  this.sprite = new Lib.Sprite(filename, 96, 192, 32, 48);
  var manager = Lib.InputManager.getInstance();
  var is_jump;
  
  this.initialize = function(){
    this.sprite.x = 50;
    this.sprite.y = 252;

    is_jump = false;
  }

  this.update = function(){

    var position = new Lib.Vec2(250, 250);
    var timer = 0;

    canvas.addEventListener("keydown", function(e) {
      if(manager.getKey("SPACE") == e.keyCode) {
        // ジャンプ処理
        is_jump = true;

        if(is_jump) {
          position.y = Lib.ActionUtility.jumpToVertical(position.y, timer);
        }

        timer += 0.05;

        if(position.y >= 300) {
          timer = 0;
          is_jump = false;
        }
      }
    });

  }

  this.draw = function(){
    this.sprite.animation(context, 2);
  }
};

/*
 *  背景
 */
var Background = function(filename, scroll){
  this.sprite = new Lib.Sprite(filename, 256, 256);
  if (scroll == 1) {
    this.sprite.x += 800;
  }

  // 更新
  this.update = function(){
    // 画像のスクロールスピード調整
    this.sprite.x -= 5;

    // スクロール処理
    if(this.sprite.x == -800){
      this.sprite.x += 1600;
    }
  }

  // 描画
  this.draw = function(context){
    this.sprite.draw(context);
  }
};

/*
 *  落とし穴
 */
var DropFall = function(filename){
  this.sprite = new Lib.Sprite(filename, 36, 36);
  
};

DropFall.prototype = {

  update: function(){
    this.sprite.draw(context);
  }
};

/*
 *  ブロック
 */
var Block = function(filename){
  this.sprite = new Lib.Sprite(filename, 36, 36);
};

Block.prototype = {

  update: function(){
    this.sprite.draw(context);
  }
};