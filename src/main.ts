/// <reference path="refs.d.ts" />

class G {
  static player:Player;

  static SCREEN_WIDTH:number = 500;
  static SCREEN_HEIGHT:number = 500;

  static MAP_W:number = 500;
  static MAP_H:number = 500;

  static game:Phaser.Game;
}

class MainState extends Phaser.State {
  public preload():void {
    // fw, fh, num frames,
    this.load.spritesheet("default", "assets/default.png", 32, 32);

    this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
  }

  public init():void {
    G.game.stage.backgroundColor = "#356b92";
  }

  public create():void {
    G.game.world.setBounds(0, 0, G.MAP_W, G.MAP_H);

    G.player = new Player();
    G.game.add.existing(G.player);
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