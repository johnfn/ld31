/// <reference path="refs.d.ts" />

class InteractIcon extends Phaser.Sprite {
  startX:number;
  startY:number;

  dumbcons() {
    this.startX = this.x;
    this.startY = this.y;

    //this.visible = false;
  }

  update() {

  }
}