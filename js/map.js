map = {
  draw: function (name) {
    var that = this;
    if (typeof player !== 'undefined') {
      player.inventory = [];
    }
    if (typeof inventoryImages !== 'undefined') {
      for (i in inventoryImages) {
        inventoryImages[i].destroy();
      }
      inventoryImages = [];
    }

    map.current = name;
    var xml_req = new XMLHttpRequest();
    xml_req.open('GET', (prefix + 'maps/' + name + '.txt?_=' + new Date().getTime()));

    xml_req.onload = function () {
      map.clear_everything();
      texts = [];

      map.data = {};
      Object.assign(map.data, map_data['default']);
      Object.assign(map.data, map_data[name]);
      var shape = xml_req.responseText;
      map.rows = shape.split("\n");
      for (var y = 0; y < height_in_blocks; y++) {
        var row = map.rows[y];
        for (var x = 0; x < width_in_blocks; x++) {
          var xpos = x * block_size + (block_size / 2);
          var ypos = y * block_size + (block_size / 2);
          if (night_box.boxDelimiters.includes(row.charAt(x))) {
            map.setNightBoxDelimter.call(this, row.charAt(x), xpos, ypos);
          }
        }
      }
      initialize.darkBackground.call(that);

      map.space_indexes = {};
      for (var y = 0; y < height_in_blocks; y++) {
        var row = map.rows[y];
        for (var x = 0; x < width_in_blocks; x++) {
          var space = map.getSpaceData(row.charAt(x), map.data);
          if (space && map.front_load_methods.includes(space.method)) {
            var xpos = x * block_size + (block_size / 2);
            var ypos = y * block_size + (block_size / 2);
            if (space.offsetX) {
              xpos += block_size * space.offsetX
            }
            if (space.offsetY) {
              ypos += block_size * space.offsetY
            }
            map[space.method].call(that, xpos, ypos, space);
          }
        }
      }
      initialize.moveClouds();
      initialize.depths();
      game.restarting = false;
    };
    xml_req.send();
  },

  front_load_methods: ['add_door', 'add_key', 'move_player', 'add_text', 'add_slider', 'add_slider_track'],

  clear_everything: function () {
    doors.clear(true, true);
    keys.clear(true, true);
    texts.forEach(function (t) {
      t.destroy();
    });
    sliders.clear(true, true);
    slider_tracks.clear(true, true);
    map.clear_active_objects();
  },

  clear_active_objects: function () {
    platforms.clear(true, true);
    water.clear(true, true);
    springs.clear(true, true);
    night_box.clear();
  },

  get_window_centre: function () {
    var centre = {
      x: Math.floor(player.x / block_size),
      y: Math.floor(player.y / block_size)
    }
    if (centre.x < 7) {
      centre.x = 7;
    } else if (centre.x > (width_in_blocks - 8)) { // TODO solve this nonsense!
      centre.x = (width_in_blocks - 8)
    }
    if (centre.y < 7) {
      centre.y = 7;
    } else if (centre.y > (height_in_blocks - 8)) { // TODO solve this nonsense!
      centre.y = (height_in_blocks - 8)
    }
    return centre;
  },

  draw_window: function () {
    // This, but only objects outside the window
    var window_centre = map.get_window_centre();
    if (map.rows === undefined || (map.current_centre && map.current_centre == [window_centre.x, window_centre.y].toString())) {
      return;
    }
    map.clear_active_objects();
    map.current_centre = [window_centre.x, window_centre.y].toString();
    for (var y = (window_centre.y - window_height); y < (window_centre.y + window_height + 1); y++) {
      var row = map.rows[y];
      if (row === undefined) {
        continue;
      }
      for (var x = (window_centre.x - window_width); x < (window_centre.x + window_width + 1); x++) {
        var xpos = x * block_size + (block_size / 2);
        var ypos = y * block_size + (block_size / 2);
        var space = map.getSpaceData(row.charAt(x), map.data);
        if (space && map.front_load_methods.includes(space.method)) {
          continue;
        }
        if (space) {
          if (space.offsetX) {
            xpos += block_size * space.offsetX
          }
          if (space.offsetY) {
            ypos += block_size * space.offsetY
          }
          map[space.method].call(map, xpos, ypos, space);
        }
      }
    }
  },

  getSpaceData: function (char, data) {
    var data = data[char];
    if (Array.isArray(data)) {
      if (typeof map.space_indexes[char] == 'number') {
        map.space_indexes[char] += 1;
      } else {
        map.space_indexes[char] = 0;
      }
      return data[map.space_indexes[char] % data.length];
    } else if (typeof data == 'object') {
      return data;
    }
  },
  // Used to respond to night box delimiters
  setNightBoxDelimter: function (char, x, y) {
    switch (char) {
      case '1':
        night_box.setTopLeft(x, y);
        break;
      case '2':
        night_box.setTopRight(x, y);
        break;
      case '3':
        night_box.setBottomLeft(x, y);
        break;
      case '4':
        night_box.setBottomRight(x, y);
        break;
    }
  },
  zone: function (x, y) {
    if (night_box.contains(x, y)) {
      return 'dark_';
    } else {
      return '';
    }
  },

  restart: function () {
    game.restarting = true;
    map.draw.call(this, map.current);
  },

  // Actions referred to in map_data
  add_floor: function (x, y, data) {
    floor = platforms.create(x, y, map.zone(x, y) + 'floor');
    // TODO possible lead on performance issue...
    //floor.disableBody();
  },
  add_water: function (x, y, data) {
    var w = water.create(x, y, map.zone(x, y) + 'water');
    w.deactivated = false;
  },
  add_box: function (x, y, data) {
    var box = platforms.create(x, y, map.zone(x, y) + 'box');
    box.active = false;
  },
  add_slider: function (x, y, data) {
    map.add_slider_track(x, y, data);
    var slider = sliders.create(x, y, map.zone(x, y) + data.direction + '_slider');
    for (var key in data) {
      slider[key] = data[key];
    }
  },
  add_slider_track: function (x, y, data) {
    var track = slider_tracks.create(x, y, map.zone(x, y) + data.direction + '_track');
    for (var key in data) {
      track[key] = data[key];
    }
  },
  add_spring: function (x, y, data) {
    var spring = springs.create(x, y, map.zone(x, y) + 'spring');
    spring.body.checkCollision.left = false;
    spring.body.checkCollision.right = false;
  },
  add_breakable_box: function (x, y, data) {
    var box = platforms.create(x, y, map.zone(x, y) + 'breakable_box');
    box.breakable = true;
    box.breaking = false;
  },
  add_door: function (x, y, data) {
    var sprite = 'door';
    if (typeof data['sprite'] !== 'undefined') {
      sprite = data['sprite'];
    }
    var door = doors.create(x, y, map.zone(x, y) + sprite);
    for (var key in data) {
      door[key] = data[key];
    }
  },
  add_key: function (x, y, data) {
    var sprite = 'key';
    if (typeof data['sprite'] !== 'undefined') {
      sprite = data['sprite'];
    }
    var key = keys.create(x, y, map.zone(x, y) + sprite);
    for (var data_key in data) {
      key[data_key] = data[data_key];
    }
  },

  add_text: function (x, y, data) {
    var content = data.text;
    data = Object.assign({fontSize: '32px', fill: '#000'}, data);
    texts.push(game_pointer.add.text(x, y, content, data));
  },

  move_player: function (x, y, data) {
    player.setPosition(x, y);
    if (night_box.contains(x, y)) {
      player.zone = 'dark_';
    } else {
      player.zone = '';
    }
  }

};
