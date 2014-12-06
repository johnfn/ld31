/// <reference path="refs.d.ts" />

class Player extends MagicSprite {
  speed:number = 400;

  constructor() {
    super(G.game, 50, 50, "default");

    this.body.drag.x = 4000;
    this.body.drag.y = 4000;

    this.body.collideWorldBounds = true;
  }

  update() {
    if (G.cursors.left.isDown) this.body.velocity.x = -this.speed;
    if (G.cursors.right.isDown) this.body.velocity.x = this.speed;

    if (G.cursors.up.isDown) this.body.velocity.y = -this.speed;
    if (G.cursors.down.isDown) this.body.velocity.y = this.speed;
  }
}