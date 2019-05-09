// Should be the only difference between master and gh-pages
prefix = '/night_and_day/';

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

function preload() {
  game_pointer = this;

  utils.load_images.call(this, {
    ground: prefix + 'assets/platform.png',
    star: prefix + 'assets/star.png',
    bomb: prefix + 'assets/bomb.png',

    sky: prefix + 'assets/mine/background.png',
    box: prefix + 'assets/mine/box.png',
    door: prefix + 'assets/mine/door.png'
  });
  this.load.spritesheet('dude',
    prefix + 'assets/mine/dude.png',
    {frameWidth: 32, frameHeight: 48}
  );
}

function create() {
  score = 0;

  initialize.background.call(this);
  initialize.platforms.call(this);
  initialize.player.call(this);
  initialize.camera.call(this);
  initialize.doors.call(this);
  //initialize.stars.call(this);
  initialize.score.call(this);
  //initialize.bombs.call(this);
}

function update() {
  if (typeof player !== 'undefined') {
    action.readCursors.call(this);
  }
}

