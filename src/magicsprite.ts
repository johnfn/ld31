/// <reference path="refs.d.ts" />

class MagicSprite extends Phaser.Sprite {
  body:Phaser.Physics.Arcade.Body;

  constructor(a:Phaser.Game, b:number, c:number, d:string) {
    super(a, b, c, d);

    G.game.physics.arcade.enable(this);
  }
}