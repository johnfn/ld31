/// <reference path="refs.d.ts" />

interface DialogContent {
  speaker:string;
  content: string;
}

class Dialog extends Phaser.Group {
  graphic:Phaser.Sprite;
  text:Phaser.Text;
  pressZText:Phaser.Text;
  content:DialogContent[];

  updateEvery:number = 5;
  ticks:number = 0;

  constructor(content:DialogContent[]) {
    super(G.game);

    this.content = content;

    this.x = 100;
    this.y = 400;

    this.graphic = new Phaser.Sprite(G.game, 0, 0, "dialog");
    this.add(this.graphic);

    var textStyle:any = {
      font: "14px Arial",
      fill: "white"
    };

    this.text = new Phaser.Text(G.game, 10, 10, "", textStyle);
    this.add(this.text);

    this.pressZText = new Phaser.Text(G.game, 10, 180, "Press Z to continue", textStyle);
    this.add(this.pressZText);
  }

  update() {
    if (++this.ticks % this.updateEvery != 0) return;

    if (this.text.text != this.content[0].content) {
      this.text.setText(this.content[0].content.substring(0, this.text.text.length + 1));
    }
  }
}