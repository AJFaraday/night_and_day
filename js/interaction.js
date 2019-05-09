interaction = {
  collectStar: function (player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var half_way = (game.config.width / 2);
      var x = (player.x < (half_way)) ? Phaser.Math.Between(half_way, game.config.width) : Phaser.Math.Between(0, half_way);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  },
  hitBomb: function (player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
  },
  touchDoor: function (player, door) {
    if (typeof(door.required) == 'undefined') {
      player.latestDoor = door;
    } else {
      if(player.inventory.includes(door.required)) {
        player.latestDoor = door;
      }
    }
  },
  pickUpKey: function (player, key) {
    if (typeof key.collected == 'undefined') {
      key.disableBody(true, true);
      key.collected = true;
      player.inventory.push(key.name);
    }
  }

};
