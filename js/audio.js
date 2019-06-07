audio = {
  sounds: {
    theme: 'assets/audio/music/theme.ogg',
    die: 'assets/audio/sfx/die.ogg',
    door: 'assets/audio/sfx/door.ogg',
    jump: 'assets/audio/sfx/jump.ogg',
    break: 'assets/audio/sfx/break.ogg',
    spring: 'assets/audio/sfx/spring.ogg',
    head_block: 'assets/audio/sfx/head_block.ogg',
    land: 'assets/audio/sfx/land.ogg',
    pick_up: 'assets/audio/sfx/pick_up.ogg'
  },

  load: function () {
    audio.game = this;
    Object.keys(audio.sounds).forEach(
      function (key) {
        var path = audio.sounds[key];
        audio.game.load.audio(key, [prefix + path]);
      }
    );
    sfx_volume = 0.5;
    theme_volume = 0.5;
  },

  sound_instances: {},

  play_theme: function () {
    if (typeof audio.theme !== 'undefined') {
      audio.theme.stop();
    }
    audio.theme = audio.game.sound.add(
      'theme',
      {
        loop: true,
        volume: theme_volume
      }
    );
    audio.theme.play();
  },
  pause_theme: function () {
    audio.theme.pause();
  },
  resume_theme: function () {
    audio.theme.resume();
  },

  play_sfx: function (key) {
    if (typeof audio.sound_instances[key] !== 'undefined') {
      audio.sound_instances[key].stop();
    }
    audio.sound_instances[key] = audio.game.sound.add(
      key,
      {
        volume: sfx_volume,
        loop: false
      }
    );
    audio.sound_instances[key].play();
  },

  play_land: function () {
    if (player.body.onFloor()) {
      if (typeof audio.sound_instances.jump !== 'undefined') {
        audio.sound_instances.jump.stop();
      }
    }
    audio.play_sfx('land');
  },

  play_die: function () {
    audio.play_sfx('die');
    audio.pause_theme();
  },
  music_up: function () {
    theme_volume += 0.25;
    audio.theme.setVolume(theme_volume);
  },
  music_down: function () {
    theme_volume -= 0.25;
    audio.theme.setVolume(theme_volume);
  },
  sfx_up: function () {
    sfx_volume += 0.25;
  },
  sfx_down: function () {
    sfx_volume -= 0.25;
  }

};
