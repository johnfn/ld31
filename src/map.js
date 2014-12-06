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
        this.addTilesetImage("tileset", "tileset", 32, 32);
        this.setCollisionBetween(1, 200, true, "walls");
        this.bg = this.createLayer('bg');
        this.walls = this.createLayer('walls');
    }
    return GameMap;
})(Phaser.Tilemap);
