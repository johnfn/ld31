/// <reference path="refs.d.ts" />

class TreasureChest extends MagicSprite implements Interactable {
  constructor(a:Phaser.Game, b:number, c:number, d:string, e:number) {
    super(a, b, c, "treasurechest", 1);

    this.body.immovable = true;

    this.animations.add('closed', [0]);
    this.animations.add('open', [1]);
  }

  interact() {
    Dialog.makeMeADialogPlease(DialogCopy.OpenTreasureChest);

    this.animations.play('open');
  }
}