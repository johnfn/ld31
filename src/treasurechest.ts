/// <reference path="refs.d.ts" />

class TreasureChest extends MagicSprite implements Interactable {
  constructor(a:Phaser.Game, b:number, c:number, d:string, e:number) {
    super(a, b, c, "treasurechest", 1);

    this.body.immovable = true;
  }

  interact() {
    console.log('whaoah');
  }
}