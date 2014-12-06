/// <reference path="refs.d.ts" />

class MagicSprite extends Phaser.Sprite {
  body:Phaser.Physics.Arcade.Body;

  constructor(a:Phaser.Game, b:number, c:number, d:string, e:number = 0) {
    super(a, b, c, d, e);

    G.game.physics.arcade.enable(this);

    this.dumbcons();
  }

  // to be overridden; i'm too lazy to figure out wat all the friggin args are
  dumbcons() {

  }
}