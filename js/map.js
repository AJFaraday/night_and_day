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
      platforms.clear(true, true);
      doors.clear(true, true);
      water.clear(true, true);
      keys.clear(true, true);
      springs.clear(true, true);
      sliders.clear(true, true);
      slider_tracks.clear(true, true);
      texts.forEach(function (t) {
        t.destroy()
      });
      texts = [];

      var data = {};
      Object.assign(data, map_data['default']);
      Object.assign(data, map_data[name]);
      var shape = xml_req.responseText;
      var rows = shape.split("\n");
      for (var y = 0; y < height_in_blocks; y++) {
        var row = rows[y];
        for (var x = 0; x < width_in_blocks; x++) {
          var xpos = x * block_size + (block_size / 2);
          var ypos = y * block_size + (block_size / 2);
          if (night_box.boxDelimiters.includes(row.charAt(x))) {
            map.setNightBoxDelimter.call(this, row.charAt(x), xpos, ypos);
          }
        }
      }

      for (var y = 0; y < height_in_blocks; y++) {
        var row = rows[y];
        for (var x = 0; x < width_in_blocks; x++) {
          var xpos = x * block_size + (block_size / 2);
          var ypos = y * block_size + (block_size / 2);
          var space = data[row.charAt(x)];
          if (space) {
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
    };
    xml_req.send();
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
    map.draw.call(this, map.current);
  },

  // Actions referred to in map_data
  add_floor: function (x, y, data) {
    platforms.create(x, y, 'floor');
  },
  add_water: function (x, y, data) {
    var w = water.create(x, y, 'water');
    w.deactivated = false;
  },
  add_box: function (x, y, data) {
    platforms.create(x, y, map.zone(x, y) + 'box');
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
    delete data.text;
    data = Object.assign(data, {fontSize: '32px', fill: '#000'});
    texts.push(this.add.text(x, y, content, data));
  },

  move_player: function (x, y, data) {
    player.setPosition(x, y);
  }

};
