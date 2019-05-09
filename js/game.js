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
    ground: '/night_and_day/assets/platform.png',
    star: '/night_and_day/assets/star.png',
    bomb: '/night_and_day/assets/bomb.png',

    sky: '/night_and_day/assets/mine/background.png',
    box: '/night_and_day/assets/mine/box.png',
    door: '/night_and_day/assets/mine/door.png'
  });
  this.load.spritesheet('dude',
    '/night_and_day/assets/mine/dude.png',
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

