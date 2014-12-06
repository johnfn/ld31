/// <reference path="refs.d.ts" />

class GameMap extends Phaser.Tilemap {
  walls:Phaser.TilemapLayer;
  bg:Phaser.TilemapLayer;

  constructor() {
    super(G.game, "map");

    this.addTilesetImage("tileset", "tileset", 32, 32);
    this.setCollisionBetween(1, 200, true, "walls");

    this.bg = this.createLayer('bg');
    this.bg.z = Depths.BG;

    this.walls = this.createLayer('walls');
    this.walls.z = Depths.WALLS;
  }
}