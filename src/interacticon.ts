/// <reference path="refs.d.ts" />

class InteractIcon extends Phaser.Sprite {
  startX:number;
  startY:number;

  target:MagicSprite;

  dumbcons() {
    this.startX = this.x;
    this.startY = this.y;

    //this.visible = false;
  }

  update() {

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
    }

    // no target any more?
    if (!target) {
      this.visible = false;
    }

    this.target = target;
  }
}