/// <reference path="refs.d.ts" />

class HUD extends Phaser.Group {
  interactText:SpecialText;
  shrinkText:SpecialText;
  growText:SpecialText;

  constructor() {
    super(G.game);

    this.interactText = new SpecialText(10, 10, "");

    this.setInteractText("nothing")
  }

  setInteractText(text:string) {
    this.interactText.setText("Press Z: " + text);
  }
}