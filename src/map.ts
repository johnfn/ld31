/// <reference path="refs.d.ts" />

class GameMap extends Phaser.Tilemap {
  constructor() {
    super(G.game, "map");

    this.addTilesetImage("tileset", "tileset", 32, 32);
    this.setCollisionBetween(1, 1000, true, "main");

    this.createLayer('main');
  }
}