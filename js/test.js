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


/*
 *  プレイヤー
 */
var Player = function(filename){
  this.sprite = new Lib.Sprite(filename, 96, 192, 32, 48);
  var manager = Lib.InputManager.getInstance();
  var position = new Lib.Vec2(250, 250);
  var timer = 0;
  
  this.initialize = function(){
    this.sprite.x = 50;
    this.sprite.y = 252;
  }

  this.update = function(){

    canvas.addEventListener("keydown", function(e) {
      if(manager.getKey("UP") == e.keyCode) {
        // ジャンプ処理
        position.y = Lib.ActionUtility.jumpToVertical(position.y, timer);
      }
    });

    timer += 0.5;

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

  /**
   * draw background
   */
  this.draw = function(context) {
    this.sprite.draw(context);
  };
};

var Sound = function(){
  var manager = Lib.AudioManager.getInstance();

  this.initialize = function(){
    manager.add("snd/test.mp3", "test");
    manager.setLoop(true);
  }

  this.play = function(){
    manager.play("test");

    canvas.addEventListener("keydown", function(e) {
      if(manager.getKey("SPACE") == e.keyCode) {
        // 一時停止
        manager.pause("test");
      }
    });
  }
};

