action = {
  shakeCamera: function() {
    camera.shake(100, 0.01);
  },

  walkLeft: function () {
    player.setVelocityX(player.speed * -1);
    player.anims.play(player.zone + 'left', true);
  },
  walkRight: function () {
    player.setVelocityX(player.speed);
    player.anims.play(player.zone + 'right', true);
  },
  faceFront: function () {
    player.setVelocityX(0);
    if (!player.slamming) {
      player.anims.play(player.zone + 'turn');
    }
  },
  slam: function () {
    player.anims.play(player.zone + 'slam', true);
    player.slamming = true;
    player.setVelocityY(player.slam_speed);
  },
  jump: function () {
    if (player.body.onFloor()) {
      player.jumping = true;
      audio.play_sfx('jump');
      player.setVelocityY((game.config.physics.arcade.gravity.y * -1) * player.jump_power);
    }
  },
  jumpToLevel: function (level) {
    map.draw.call(this, level);
  },
  jumpToDoor: function (door_name) {
    var target_door = doors.children.entries.find(function (d) {
      return d.name == door_name
    });
    if (typeof(target_door) !== 'undefined') {
      map.move_player(target_door.x, target_door.y, {});
    }
  },
  enterDoor: function () {
    if (typeof player.latestDoor !== 'undefined' && utils.checkOverlap(player, player.latestDoor)) {
      audio.play_sfx('door');
      if (player.latestDoor.target && player.latestDoor.target.includes('-')) {
        action.jumpToLevel(player.latestDoor.target);
      } else if (player.latestDoor.target) {
        action.jumpToDoor(player.latestDoor.target);
      }
    }
  },
  readCursors: function () {
    if (player.active) {

      if (cursors.left.isDown && !player.slamming) {
        action.walkLeft();
      }
      else if (cursors.right.isDown && !player.slamming) {
        action.walkRight();
      }
      else {
        action.faceFront();
      }

      if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
        if (player.body.onFloor() || player.slamming) {
          action.enterDoor();
        } else {
          action.slam();
        }


      } else if (cursors.up.isDown && player.body.onFloor()) {
        action.jump();
      }

      var reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      if (Phaser.Input.Keyboard.JustDown(reset_key) && map.current) {
        map.restart();
      }
    }
  }
}
;
