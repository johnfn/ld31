/// <reference path="refs.d.ts" />

class TreasureChest extends MagicSprite {
  constructor(a:Phaser.Game, b:number, c:number, d:string, e:number) {
    super(a, b, c, d, 2);

    console.log("make tchest");
  }
}