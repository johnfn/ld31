/// <reference path="refs.d.ts" />

class HUD extends Phaser.Group {
  interactText:SpecialText;
  shrinkText:SpecialText;
  growText:SpecialText;

  constructor(g:Phaser.Game) {
    super(g);

    this.interactText = new SpecialText(10, 10, "Z: nothing");
  }
}