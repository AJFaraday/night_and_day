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

  audio.load.call(this);

  utils.load_images.call(this, {
    sky: 'assets/images/sky.png',
    hills: 'assets/images/hills.png',
    cloud: 'assets/images/cloud.png',

    water: 'assets/images/water.png',
    floor: 'assets/images/ground.png',
    box: 'assets/images/box.png',
    door: 'assets/images/door.png',
    red_door: 'assets/images/red_door.png',
    green_door: 'assets/images/green_door.png',
    brown_key: 'assets/images/brown_key.png',
    red_key: 'assets/images/red_key.png',
    green_key: 'assets/images/green_key.png',
    spring: 'assets/images/spring.png',

    horizontal_slider: 'assets/images/horizontal_slider.png',
    horizontal_track: 'assets/images/horizontal_track.png',
    vertical_slider: 'assets/images/vertical_slider.png',
    vertical_track: 'assets/images/vertical_track.png'
  });
  this.load.spritesheet('dude',
    prefix + 'assets/images/dude.png',
    {frameWidth: 32, frameHeight: 48}
  );
  this.load.spritesheet('breaking_box',
    prefix + 'assets/images/breaking_box.png',
    {frameWidth: 48, frameHeight: 48}
  );
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  initialize.background.call(this);
  initialize.player.call(this);
  initialize.platforms.call(this);
  initialize.camera.call(this);
  initialize.doors.call(this);
  initialize.water.call(this);
  initialize.keys.call(this);
  initialize.display.call(this);
  initialize.springs.call(this);
  initialize.sliders.call(this);


  initialize.interactions.call(this);
  audio.play_theme();
}

function update() {
  action.readCursors.call(this);
}

