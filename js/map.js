map = {
  draw: function (name) {
    var that = this;
    map.current = name;
    var xml_req = new XMLHttpRequest();
    xml_req.open('GET', '/maps/' + name + '.txt?_=' + new Date().getTime());

    xml_req.onload = function () {
      platforms.clear(true, true);
      doors.clear(true, true);
      var data = map_data[name];
      var shape = xml_req.responseText;
      var rows = shape.split("\n");
      for (var y = 0; y < height_in_blocks; y++) {
        var row = rows[y];
        for (var x = 0; x < width_in_blocks; x++) {
          var space = data[row.charAt(x)];
          if (space) {
            var xpos = x * block_size + (block_size / 2);
            var ypos = y * block_size + (block_size / 2);
            map[space.method](xpos, ypos, space);
          }
        }
      }
    };
    xml_req.send();
  },
  add_box: function (x, y, data) {
    platforms.create(x, y, 'box');
  },
  add_door: function (x, y, data) {
    var door = doors.create(x, y, 'door');
    for(var key in data) {
      door[key] = data[key];
    }
  },
  move_player: function(x,y,data) {
    player.setPosition(x,y);
  }
};
