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
    map.draw('003-keys');
  },
  doors: function () {
    doors = this.physics.add.staticGroup();
    this.physics.add.overlap(player, doors, interaction.touchDoor, null, this);
  },
  keys: function () {
    keys = this.physics.add.staticGroup();
    this.physics.add.overlap(player, keys, interaction.pickUpKey, null, this);
  },
  player: function () {
    var that = this;
    player = this.physics.add.sprite(100, 100, 'dude');
    player.inventory = [];
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

    this.physics.add.collider(player, platforms);
  },
  score: function () {
    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
  },
  stars: function () {
    stars = this.physics.add.group({
      key: 'star',
      repeat: 19,
      setXY: {x: 12, y: 0, stepX: game.config.width / 20}
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.8, 1));
    });
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, interaction.collectStar, null, this);
  },
  bombs: function () {
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, interaction.hitBomb, null, this);
  },
  camera: function () {
    this.cameras.main.setViewport(0, 0, 1000, 800);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
  }
};