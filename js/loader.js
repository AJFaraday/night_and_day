loader = {
  day: function () {
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
    this.load.spritesheet('breakable_box',
      prefix + 'assets/images/breakable_box.png',
      {frameWidth: 48, frameHeight: 48}
    );
  },
  night: function () {
    utils.load_images.call(this, {
      dark_sky: 'assets/night_images/sky.png',
      dark_hills: 'assets/night_images/hills.png',
      dark_cloud: 'assets/night_images/cloud.png',

      dark_water: 'assets/night_images/water.png',
      dark_floor: 'assets/night_images/ground.png',
      dark_box: 'assets/night_images/box.png',
      dark_door: 'assets/night_images/door.png',
      dark_red_door: 'assets/night_images/red_door.png',
      dark_green_door: 'assets/night_images/green_door.png',
      dark_brown_key: 'assets/night_images/brown_key.png',
      dark_red_key: 'assets/night_images/red_key.png',
      dark_green_key: 'assets/night_images/green_key.png',
      dark_spring: 'assets/night_images/spring.png',

      dark_horizontal_slider: 'assets/night_images/horizontal_slider.png',
      dark_horizontal_track: 'assets/night_images/horizontal_track.png',
      dark_vertical_slider: 'assets/night_images/vertical_slider.png',
      dark_vertical_track: 'assets/night_images/vertical_track.png'
    });
    this.load.spritesheet('dark_dude',
      prefix + 'assets/night_images/dude.png',
      {frameWidth: 32, frameHeight: 48}
    );
    this.load.spritesheet('dark_breakable_box',
      prefix + 'assets/night_images/breakable_box.png',
      {frameWidth: 48, frameHeight: 48}
    );
  }
};
