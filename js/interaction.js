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
      if (player.inventory.includes(door.required)) {
        player.latestDoor = door;
      }
    }
  },
  touchWater: function (player, water) {
    map.restart();
  },
  pickUpKey: function (player, key) {
    if (typeof key.collected == 'undefined') {
      key.collected = true;
      key.destroy();
      player.inventory.push(key.name);
      var x = 180 + (player.inventory.length * 48);
      var y = 32;
      var inventoryDisplay = this.add.image(x, y, key.sprite);
      inventoryDisplay.setScrollFactor(0);
      inventoryImages.push(inventoryDisplay);
    }
  },
  breakPlatform: function (player, platform) {
    if (player.slamming) {
      player.slamming = false;
      if (platform.breaking) {
        platform.anims.play('break', false);
        platform.once(
          'animationcomplete',
          function () {
            platform.destroy();
          }
        );
      }
    }
  }, bounceOnSpring: function (player, spring) {
    player.slamming = false;
    if (player.body.velocity.y < -10) {
      player.setVelocityY(Math.abs(player.body.velocity.y * 5) * -1);
    }
  }

};
