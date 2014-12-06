/// <reference path="refs.d.ts" />

class SpecialText extends Phaser.Text {
  constructor(x:number, y:number, text:string, style:any = undefined) {
    if (style == undefined) {
      style = {
        font: "14px Arial",
        fill: "white"
      };
    }

    super(G.game, x, y, text, style);

    G.game.world.add(this);
  }
}