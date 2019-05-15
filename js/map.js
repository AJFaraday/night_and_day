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
      springs.clear(true, true)
      var data = {};
      Object.assign(data, map_data['default']);
      Object.assign(data, map_data[name]);
      var shape = xml_req.responseText;
      var rows = shape.split("\n");
      for (var y = 0; y < height_in_blocks; y++) {
        var row = rows[y];
        for (var x = 0; x < width_in_blocks; x++) {
          var space = data[row.charAt(x)];
          if (space) {
            var xpos = x * block_size + (block_size / 2);
            if (space.offsetX) { xpos += block_size * space.offsetX }
            var ypos = y * block_size + (block_size / 2);
            if (space.offsetY) { ypos += block_size * space.offsetY }
            map[space.method](xpos, ypos, space);
          }
        }
      }
    };
    xml_req.send();
  },
  restart: function () {
    map.draw(map.current);
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
    platforms.create(x, y, 'box');
  },
  add_spring: function (x, y, data) {
    var spring = springs.create(x, y, 'spring');
    spring.body.checkCollision.left = false;
    spring.body.checkCollision.right = false;

  },
  add_breaking_box: function (x, y, data) {
    var box = platforms.create(x, y, 'breaking_box');
    box.breaking = true;
  },
  add_door: function (x, y, data) {
    var sprite = 'door';
    if (typeof data['sprite'] !== 'undefined') {
      sprite = data['sprite'];
    }
    var door = doors.create(x, y, sprite);
    for (var key in data) {
      door[key] = data[key];
    }
  },
  add_key: function (x, y, data) {
    var sprite = 'key';
    if (typeof data['sprite'] !== 'undefined') {
      sprite = data['sprite'];
    }
    var key = keys.create(x, y, sprite);
    for (var data_key in data) {
      key[data_key] = data[data_key];
    }
  },
  move_player: function (x, y, data) {
    player.setPosition(x, y);
  }

};
