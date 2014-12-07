/// <reference path="refs.d.ts" />

class Player extends MagicSprite {
  speed:number = 400;
  zkey:Phaser.Key;

  constructor() {
    super(G.game, 50, 50, "default");

    this.body.drag.x = 4000;
    this.body.drag.y = 4000;

    this.body.collideWorldBounds = true;

    this.zkey = G.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  }

  findNearestInteractable():MagicSprite {
    var interactables:Phaser.Sprite[] = G.map.getInteractables();
    var nearest:Phaser.Sprite = Util.nearestInListToSprite(interactables, this);

    if (!nearest) {
      return undefined;
    }

    if (Phaser.Math.distance(this.x, this.y, nearest.x, nearest.y) < 100) {
      return <MagicSprite> nearest;
    }

    return undefined;
  }

  update() {
    if (G.cursors.left.isDown) this.body.velocity.x = -this.speed;
    if (G.cursors.right.isDown) this.body.velocity.x = this.speed;

    if (G.cursors.up.isDown) this.body.velocity.y = -this.speed;
    if (G.cursors.down.isDown) this.body.velocity.y = this.speed;

    var interactTarget:MagicSprite = this.findNearestInteractable();
    G.interacticon.setTarget(interactTarget);

    var asInteractable:Interactable = (<Interactable> (<any> interactTarget));

    if (interactTarget) {
      G.HUD.setInteractText(asInteractable.text());

      if (this.zkey.justDown) {
        asInteractable.interact();
      }
    } else {
      G.HUD.setInteractText("do nothing");
    }
  }
}