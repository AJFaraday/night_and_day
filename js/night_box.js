//TODO maybe, one day, work out how to define multiple boxes

night_box = {
  boxDelimiters: ['1', '2', '3', '4'],
  boxes: [],
  workingBox: {top: null, bottom: null, right: null, left: null},
  setTopLeft: function (x, y) {
    night_box.workingBox.top = y - (block_size / 2) - 1;
    night_box.workingBox.left = x - (block_size / 2) - 1;
  },
  setTopRight: function (x, y) {
    night_box.workingBox.top = y - (block_size / 2) - 1;
    night_box.workingBox.right = x + (block_size / 2) + 1;
  },
  setBottomLeft: function (x, y) {
    night_box.workingBox.bottom = y + (block_size / 2) + 1;
    night_box.workingBox.left = x - (block_size / 2) - 1;
  },
  setBottomRight: function (x, y) {
    var myBottom = y + (block_size / 2) + 1;
    var myRight = x + (block_size / 2) + 1;
    if (
      (typeof night_box.workingBox.top !== 'undfined') &&
      (typeof night_box.workingBox.left !== 'undfined') &&
      (myBottom == night_box.workingBox.bottom) &&
      (myRight == night_box.workingBox.right)
    ) {
      night_box.finalise();
    } else {
      console.log("looks like the night box doesn't describe a rectangle!");
    }
  },
  finalise: function() {
    var new_box = Object.assign({}, night_box.workingBox);
    new_box.width = (new_box.right - new_box.left);
    new_box.height = (new_box.bottom - new_box.top);
    new_box.area = (new_box.height * new_box.width);
    night_box.boxes.push(new_box);

    night_box.workingBox =  {top: null, bottom: null, right: null, left: null};
  },

  contains: function (x, y) {
    return night_box.boxes.some(
      function(box) {
        return (
          (x >= box.left) &&
          (x <= box.right) &&
          (y >= box.top) &&
          (y <= box.bottom)
        )
      }
    )
  },

  clear: function(){
    night_box.boxes = [];
    night_box.workingBox = {top: null, bottom: null, right: null, left: null};
  }
};
