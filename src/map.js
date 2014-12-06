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
        for (var key in this.objects) {
            var group = G.game.add.group();
            if (this.objects[key].length == 0) {
                console.log("layer ", key, " is empty. ;/");
                continue;
            }
            var gid = this.objects[key][0].gid;
            this.createFromObjects(key, gid, key, 0, true, true, group, C.specialMapItems[key].type);
            this.objectLayers[key] = group;
        }
    }
    GameMap.prototype.getSpecialObjGroup = function (type) {
        return this.objectLayers[type];
    };
    GameMap.prototype.getInteractables = function () {
        var result = [];
        for (var key in this.objectLayers) {
            if (C.specialMapItems[key].interactable) {
                result.push(this.objectLayers[key]);
            }
        }
        return result;
    };
    return GameMap;
})(Phaser.Tilemap);
