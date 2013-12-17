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
  this.sprite = new Lib.Sprite(filename, 384, 384, 32, 48);
  this.sprite.next_sprite_time = 15;
  this.timer = 0;
  this.is_jump = false;
  
  this.initialize = function(){
    this.sprite.x = 50;
    this.sprite.y = 252;
  }

  this.update = function(){
    if(this.is_jump){
      this.timer += 0.115;
      this.sprite.y = Lib.ActionUtility.jumpToVertical(this.sprite.y, this.timer, 4.0);

      if(this.sprite.y > 252){
        this.sprite.y = 252;
        this.is_jump = false;
        this.timer = 0;
      }
    }
  }

  this.draw = function(){
    this.sprite.animationFree(context, 2, [0, 1, 2, 1]);
  };

  this.jump = function(){
    this.is_jump = true;
  };
};

/*
 *  Enemy
 */
var Enemy = function(filename){
  this.sprite = new Lib.Sprite(filename, 32, 32);
  this.sprite.x = 800;
  this.sprite.y = 268;
}

Enemy.prototype = {
  draw: function(){
    this.sprite.x -=5;

    this.sprite.draw(context);
  }
};

/*
 *  Fall
 */
var Fall = function(filename){
  this.sprite = new Lib.Sprite(filename, 64, 8);
  this.sprite.x = 800;
  this.sprite.y = 292;
}

Fall.prototype = {
  draw: function(){
    this.sprite.x -=5;

    this.sprite.draw(context);
  }
};

/*
 *  Background
 */
var Background = function(filename, scroll){
  this.sprite = new Lib.Sprite(filename, 800, 600);

  if (scroll == 1) {
    this.sprite.x += this.sprite.src_w;
  }

  // 更新
  this.update = function(){
    // 画像のスクロールスピード調整
    this.sprite.x -= 2;

    // スクロール処理
    if(this.sprite.x == -this.sprite.src_w){
      this.sprite.x += this.sprite.src_w*2;
    }
  }

  /**
   * draw background
   */
  this.draw = function(context) {
    this.sprite.draw(context);
  };
};

/*  
 *  BGM
 */
var Sound = function(){
  var sndManager = Lib.AudioManager.getInstance();
  var keyManager = Lib.InputManager.getInstance();
  var is_snd = false;

  this.initialize = function(){
    sndManager.add("snd/test.mp3", "test");
    sndManager.setLoop("test");
  }

  this.play = function(){
    // 再生
    if (is_snd) {
      sndManager.play("test");

      is_snd = false;
    }else{
      sndManager.stop("test");

      is_snd = true;
    }
  }
};

