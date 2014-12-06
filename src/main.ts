/// <reference path="refs.d.ts" />

class Depths {
  static BG:number = -100;
  static WALLS:number = 0;
  static PLAYER:number = 100;
  static INTERACT_ICON:number = 200;
  static DIALOG:number = 500;
}

interface SpecialMapItem {
  type: typeof MagicSprite;
  collideable: boolean;
  interactable?: boolean;
}

class C {
  static specialMapItems:{[key: string]: SpecialMapItem} = {
    treasurechest: { type: TreasureChest, collideable: true, interactable: true }
  };
}

class G {
  static player:Player;
  static map:GameMap;
  static interacticon:InteractIcon;

  static cursors:Phaser.CursorKeys;

  static SCREEN_WIDTH:number = 640;
  static SCREEN_HEIGHT:number = 640;

  static game:Phaser.Game;
}

class Util {
  static nearestInListToSprite(list:Phaser.Sprite[], sprite:Phaser.Sprite):Phaser.Sprite {
    var bestDist:number = Number.POSITIVE_INFINITY;
    var nearestSprite:Phaser.Sprite = undefined;

    for (var i = 0; i < list.length; i++) {
      var s:Phaser.Sprite = list[i];
      var dist:number = Phaser.Math.distance(sprite.x, sprite.y, s.x, s.y);

      if (dist < bestDist) {
        bestDist = dist;
        nearestSprite = s;
      }
    }

    return nearestSprite;
  }
}

class MainState extends Phaser.State {
  public preload():void {
    // fw, fh, num frames,
    this.load.spritesheet("default", "assets/default.png", 32, 32);
    this.load.spritesheet("tileset", "assets/tileset.png", 32, 32);
    this.load.spritesheet("dialog", "assets/dialog.png", 400, 200);
    this.load.spritesheet("interact", "assets/interact.png", 400, 200);
    this.load.spritesheet("treasurechest", "assets/treasurechest.png", 32, 32);

    this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
  }

  public init():void {
    G.game.stage.backgroundColor = "#356b92";
  }

  public create():void {
    G.game.world.setBounds(0, 0, G.SCREEN_WIDTH, G.SCREEN_HEIGHT);
    G.cursors = G.game.input.keyboard.createCursorKeys();

    G.player = new Player();
    G.player.z = Depths.PLAYER;
    G.game.add.existing(G.player);

    G.interacticon = new InteractIcon(G.game, 0, 0, "interact");
    G.interacticon.z = Depths.INTERACT_ICON;
    G.game.add.existing(G.interacticon);

    G.map = new GameMap();

    G.game.world.sort();
  }

  public update():void {
    // (<any> this.game.physics.arcade).TILE_BIAS = 30;

    this.game.physics.arcade.collide(G.player, G.map.walls);

    for (var key in C.specialMapItems) {
      if (C.specialMapItems[key].collideable) {
        this.game.physics.arcade.collide(G.player, G.map.getSpecialObjGroup(key));
      }
    }
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