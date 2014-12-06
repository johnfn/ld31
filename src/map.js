/// <reference path="refs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        _super.call(this, G.game, "map");
        this.objectLayers = {};
        this.addTilesetImage("tileset", "tileset", 32, 32);
        this.setCollisionBetween(1, 200, true, "walls");
        this.bg = this.createLayer('bg');
        this.bg.z = Depths.BG;
        this.walls = this.createLayer('walls');
        this.walls.z = Depths.WALLS;
        var group = G.game.add.group();
        this.createFromObjects("treasurechest", 3, "treasurechest", 0, true, true, group, TreasureChest);
        /*
        for (var key in this.objects) {
          var group:Phaser.Group = G.game.add.group();
    
          if (this.objects[key].length == 0) {
            console.log("layer ", key, " is empty. ;/");
    
            continue;
          }
    
          var gid:number = this.objects[key][0].gid;
    
          this.createFromObjects(key, gid, "tileset", 0, true, false, group, TreasureChest);
        }
        */
    }
    return GameMap;
})(Phaser.Tilemap);
