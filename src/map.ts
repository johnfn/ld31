/// <reference path="refs.d.ts" />

class GameMap extends Phaser.Tilemap {
  walls:Phaser.TilemapLayer;
  bg:Phaser.TilemapLayer;

  objectLayers:{[key: string]: Phaser.Group} = {};

  constructor() {
    super(G.game, "map");

    this.addTilesetImage("tileset", "tileset", 32, 32);
    this.setCollisionBetween(1, 200, true, "walls");

    this.bg = this.createLayer('bg');
    this.bg.z = Depths.BG;

    this.walls = this.createLayer('walls');
    this.walls.z = Depths.WALLS;

    for (var key in this.objects) {
      var group:Phaser.Group = G.game.add.group();

      if (this.objects[key].length == 0) {
        console.log("layer ", key, " is empty. ;/");

        continue;
      }

      var gid:number = this.objects[key][0].gid;

      this.createFromObjects(key, gid, key, 0, true, true, group, C.specialMapItems[key].type);
      this.objectLayers[key] = group;
    }
  }

  public getSpecialObjGroup(type:string):Phaser.Group {
    return this.objectLayers[type];
  }

  public getInteractables():Phaser.Group[] {
    var result:Phaser.Group[] = [];

    for (var key in this.objectLayers) {
      if (C.specialMapItems[key].interactable) {
        result.push(this.objectLayers[key]);
      }
    }

    return result;
  }
}