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

  loader.day.call(this);
  loader.night.call(this);
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  initialize.background.call(this);
  initialize.display.call(this);
  initialize.text.call(this);
  initialize.player.call(this);
  initialize.platforms.call(this);
  initialize.camera.call(this);
  initialize.doors.call(this);
  initialize.water.call(this);
  initialize.keys.call(this);
  initialize.springs.call(this);
  initialize.sliders.call(this);


  initialize.interactions.call(this);
  audio.play_theme();
}

function update() {
  action.readCursors.call(this);
  map.draw_window();
}


