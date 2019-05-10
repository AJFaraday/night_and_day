utils = {
  load_images: function (defs) {
    for (var prop in defs) {
      this.load.image(prop, (prefix + defs[prop]));
    }
  },
  checkOverlap: function (spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    var intersection = (Phaser.Geom.Rectangle.Intersection(boundsA, boundsB));
    return (intersection.width > 0 && intersection.height > 0);
  },
  getQueryVariable: function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (null);
  }
}
;
