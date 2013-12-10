"use strict";

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
  this.sprite.next_sprite_time = 15;

  this.timer = 0;
  this.is_jump = false;
  
  this.initialize = function(){
    this.sprite.x = 50;
    this.sprite.y = 252;
  };

  this.jump = function() {
    this.is_jump = true;
  };

  this.update = function() {
    if(this.is_jump) {
      this.timer += 0.15;
      this.sprite.y = Lib.ActionUtility.jumpToVertical(this.sprite.y, this.timer, 4.0);

      if(this.sprite.y > 252) {
        this.sprite.y = 252;
        this.is_jump = false;
        this.timer = 0;
      }
    }
  };

  this.draw = function(){
    this.sprite.animationFree(context, 2, [0, 1, 2, 1]);
  }; 
};

/*
 *  背景
 */
var Background = function(filename, scroll){
  this.sprite = new Lib.Sprite(filename, 800, 600);
  if (scroll == 1) {
    this.sprite.x += 790;
  }

  // 更新
  this.update = function(){
    // 画像のスクロールスピード調整
    this.sprite.x -= 2;

    // スクロール処理
    if(this.sprite.x == -790){
      this.sprite.x += 1580;
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
  this.manager = Lib.AudioManager.getInstance();

  this.initialize = function(){
    this.manager.add("snd/test.mp3", "test");
    this.manager.setLoop("test", true);
  };

  this.play = function(){
    this.manager.play("test");
  };

  this.pause = function() {
    this.manager.pause("test");
  };
};

var Enemy = function() {
  this.sprite = new Lib.Sprite("img/enemy.png");
  this.sprite.x = 900;
  this.sprite.y = 270;

  this.draw = function(context) {
    this.sprite.x -= 4;

    this.sprite.draw(context);
  };
};