initialize = {
  background: function () {
    var x = 0;
    do {
      var img = this.add.image(x, 0, 'sky');
      img.setOrigin(0, 0);
      x += 480;
    } while (x <= game.config.width);
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
      frames: this.anims.generateFrameNumbers('breaking_box', {start: 0, end: 9}),
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
    this.physics.add.overlap(player, keys, interaction.pickUpKey, null, this);
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
    this.physics.add.overlap(player, water, interaction.touchWater, null, this);
    this.physics.add.collider(player, springs, interaction.bounceOnSpring, null, this);

    this.cameras.main.startFollow(player);
  }
};
