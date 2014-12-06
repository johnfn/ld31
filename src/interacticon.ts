/// <reference path="refs.d.ts" />

class InteractIcon extends Phaser.Sprite {
  startX:number;
  startY:number;

  tween:Phaser.Tween;

  target:MagicSprite;

  dumbcons() {
    this.startX = this.x;
    this.startY = this.y;

    //this.visible = false;
  }

  update() {

  }

  startBounce() {
    if (this.tween) {
      this.tween.stop();
    }

    this.tween = G.game.add.tween(this)
      .to({ x: this.startX, y: this.startY - 16 }, 300, Phaser.Easing.Power0)
      .to({ x: this.startX, y: this.startY }, 300, Phaser.Easing.Power0)
      .loop()
      .start();
  }

  setTarget(target:MagicSprite) {
    // fn is called constantly - only change if we need to.

    // should we switch targets?
    if (target && (this.target == undefined || this.target != target)) {
      this.startX = target.x;
      this.startY = target.y - this.height;

      this.x = this.startX;
      this.y = this.startY;

      this.visible = true;

      this.startBounce();
    }

    // no target any more?
    if (!target) {
      this.visible = false;
    }

    this.target = target;
  }
}