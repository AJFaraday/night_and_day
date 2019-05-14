action = {
  readCursors: function () {
    if (player.active) {

      if (cursors.left.isDown && !player.slamming) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
      }
      else if (cursors.right.isDown && !player.slamming) {
        player.setVelocityX(160);
        player.anims.play('right', true);
      }
      else {
        player.setVelocityX(0);
        if (!player.slamming) {
          player.anims.play('turn');
        }
      }

      if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
        if (typeof player.latestDoor !== 'undefined' && utils.checkOverlap(player, player.latestDoor)) {
          if (player.latestDoor.target && player.latestDoor.target.includes('-')) {
            map.draw(player.latestDoor.target);
          } else if (player.latestDoor.target) {
            var target_door = doors.children.entries.find(function (d) {
              return d.name == player.latestDoor.target
            });
            if (typeof(target_door) !== 'undefined') {
              player.setPosition(target_door.x, target_door.y);
            }
          }
        }
      } else if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY((game.config.physics.arcade.gravity.y * -1) * 0.5);
      }

      var reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      if (Phaser.Input.Keyboard.JustDown(reset_key) && map.current) {
        map.restart();
      }
      if (cursors.down.isDown && !player.body.blocked.down && !player.slamming) {
        player.anims.play('slam', true);
        player.slamming = true;
        player.setVelocityY(400);
      }
    }
  }
}
;
