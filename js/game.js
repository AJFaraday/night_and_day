// Should be the only difference between master and gh-pages
prefix = '/';

block_size = 48;
height_in_blocks = 16;
width_in_blocks = 41;
var config = {
  type: Phaser.AUTO,
  width: (block_size * width_in_blocks),
  height: (block_size * height_in_blocks),
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1000},
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
game.restarting = false;

function preload() {
  game_pointer = this;

  utils.load_images.call(this, {
    ground: 'assets/platform.png',
    star: 'assets/star.png',
    bomb: 'assets/bomb.png',

    water: 'assets/mine/water.png',
    floor: 'assets/mine/ground.png',
    sky: 'assets/mine/background.png',
    box: 'assets/mine/box.png',
    door: 'assets/mine/door.png',
    red_door: 'assets/mine/red_door.png',
    green_door: 'assets/mine/green_door.png',
    red_key: 'assets/mine/red_key.png',
    green_key: 'assets/mine/green_key.png'
  });
  this.load.spritesheet('dude',
    prefix + 'assets/mine/dude.png',
    {frameWidth: 32, frameHeight: 48}
  );
  this.load.spritesheet('breaking_box',
    prefix + 'assets/mine/breaking_box.png',
    {frameWidth: 48, frameHeight: 48}
  );
}

function create() {
  score = 0;

  initialize.background.call(this);
  initialize.player.call(this);
  initialize.platforms.call(this);
  initialize.camera.call(this);
  initialize.doors.call(this);
  initialize.water.call(this);
  initialize.keys.call(this);
  //initialize.stars.call(this);
  initialize.display.call(this);
  //initialize.bombs.call(this);
}

function update() {
  if (typeof player !== 'undefined') {
    action.readCursors.call(this);
  }
}

