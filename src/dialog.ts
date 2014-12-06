/// <reference path="refs.d.ts" />

class Dialog extends Phaser.Group {
  graphic:Phaser.Sprite;
  text:Phaser.Text;
  pressZText:Phaser.Text;

  constructor() {
    super(G.game);

    this.x = 100;
    this.y = 400;

    this.graphic = new Phaser.Sprite(G.game, 0, 0, "dialog");
    this.add(this.graphic);

    var textStyle:any = {
      font: "14px Arial",
      fill: "white"
    };

    this.text = new Phaser.Text(G.game, 10, 10, "test test test test", textStyle);
    this.add(this.text);

    this.pressZText = new Phaser.Text(G.game, 10, 180, "Press Z to continue", textStyle);
    this.add(this.pressZText);
  }
}