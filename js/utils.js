utils = {
  load_images: function (defs) {
    for (var prop in defs) {
      this.load.image(prop, defs[prop]);
    }
  },
  checkOverlap: function(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    var intersection = (Phaser.Geom.Rectangle.Intersection(boundsA, boundsB));
    return (intersection.width > 0 && intersection.height > 0);
  }
}
;
