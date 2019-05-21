initialize = {
  drawSky: function () {
    var x = 0;
    do {
      var img = this.add.image(x, 0, 'sky');
      img.setOrigin(0, 0);
      x += 480;
    } while (x <= game.config.width);
  },
  drawHills: function () {
    var x = 0;
    do {
      var img = this.add.image(x, game.config.height, 'hills');
      img.setOrigin(0, 1);
      img.setScrollFactor(0.7, 1.1);
      x += 800;
    } while (x <= game.config.width);
  },
  drawClouds: function() {
    clouds = [];
    var numClouds = 20;
    for(var i = 0; i < numClouds; i++) {
      var img = this.add.image(0, 0, 'cloud');
      img.setOrigin(0, 0);
      clouds.push(img);
    }
  },
  moveClouds: function() {
    var generator = new Phaser.Math.RandomDataGenerator([map.current]);
    clouds.forEach(function(cloud){
      var size = (generator.between(1,100) / 100);
      var x = generator.between(0, 1400);
      var y = generator.between(0, 420);
      cloud.setX(x);
      cloud.setY(y);
      cloud.setScrollFactor(
        (generator.between(20, 100) / 100),
        (generator.between(100, 130) / 100)
      );
      cloud.setScale(size);
    });
  },
  background: function () {
    initialize.drawSky.call(this);
    initialize.drawClouds.call(this);
    initialize.drawHills.call(this);
  },
  platforms: function () {
    var level = '001-boxes';
    var level_from_url = utils.getQueryVariable('level');

    if (level_from_url) {
      level = level_from_url;
    }
    platforms = this.physics.add.staticGroup();
    map.draw(level);

    // add breaking animation
    this.anims.create({
      key: 'break',
      frames: this.anims.generateFrameNumbers('breakable_box', {start: 0, end: 9}),
      frameRate: 20,
      repeat: 0
    });
  },
  springs: function () {
    springs = this.physics.add.staticGroup();
  },
  doors: function () {
    doors = this.physics.add.staticGroup();
  },
  water: function () {
    water = this.physics.add.staticGroup();
  },
  keys: function () {
    keys = this.physics.add.staticGroup();
  },
  sliders: function() {
    sliders = this.physics.add.staticGroup();
    slider_tracks = this.physics.add.staticGroup();
  },

  player: function () {
    var that = this;
    player = this.physics.add.sprite(100, 100, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'slam',
      frames: [{key: 'dude', frame: 9}],
      frameRate: 20
    });

    // Not part of Phaser
    player.inventory = [];
    player.slamming = false;
  },
  display: function () {
    invText = this.add.text(16, 16, 'Inventory:', {fontSize: '32px', fill: '#000'});
    invText.setScrollFactor(0);
    inventoryImages = []
  },
  camera: function () {
    this.cameras.main.setViewport(0, 0, 800, 600);
    this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
  },
  interactions: function () {
    this.physics.add.collider(player, platforms, interaction.landOnPlatform, null, this);
    this.physics.add.overlap(player, doors, interaction.touchDoor, null, this);
    this.physics.add.overlap(player, water, interaction.killPlayer, null, this);
    this.physics.add.collider(player, springs, interaction.bounceOnSpring, null, this);
    this.physics.add.overlap(player, keys, interaction.pickUpKey, null, this);
    this.physics.add.collider(player, sliders, interaction.hitSlider);

    this.cameras.main.startFollow(player);
  }
};
