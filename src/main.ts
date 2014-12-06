/// <reference path="refs.d.ts" />

class Depths {
  static BG:number = -100;
  static WALLS:number = 0;
  static PLAYER:number = 100;
}

class G {
  static player:Player;
  static map:GameMap;

  static cursors:Phaser.CursorKeys;

  static SCREEN_WIDTH:number = 640;
  static SCREEN_HEIGHT:number = 640;

  static MAP_W:number = 500;
  static MAP_H:number = 500;

  static game:Phaser.Game;
}

class MainState extends Phaser.State {
  public preload():void {
    // fw, fh, num frames,
    this.load.spritesheet("default", "assets/default.png", 32, 32);
    this.load.spritesheet("tileset", "assets/tileset.png", 32, 32);

    this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
  }

  public init():void {
    G.game.stage.backgroundColor = "#356b92";
  }

  public create():void {
    G.game.world.setBounds(0, 0, G.MAP_W, G.MAP_H);
    G.cursors = G.game.input.keyboard.createCursorKeys();

    G.player = new Player();
    G.player.z = Depths.PLAYER;
    G.game.add.existing(G.player);

    G.map = new GameMap();

    G.game.world.sort();
  }

  public update():void {
    // (<any> this.game.physics.arcade).TILE_BIAS = 30;

    this.game.physics.arcade.collide(G.player, G.map.walls);
  }
}

class Game {
  state: Phaser.State;

  constructor() {
    this.state = new MainState();
    G.game = new Phaser.Game(G.SCREEN_WIDTH, G.SCREEN_HEIGHT, Phaser.WEBGL, "main", this.state);
  }
}

new Game();