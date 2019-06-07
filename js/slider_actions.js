slider_actions = {
  sliderTrackAbove: function (slider) {
    track = slider_tracks.children.entries.find(
      function (track) {
        return (
          track.body.x == slider.body.x &&
          track.body.y == (slider.body.y - block_size) &&
          track.direction == 'vertical'
        )
      }
    );
    return (typeof track != 'undefined');
  },
  sliderTrackBelow: function (slider) {
    track = slider_tracks.children.entries.find(
      function (track) {
        return (
          track.body.x == slider.body.x &&
          track.body.y == (slider.body.y + block_size) &&
          track.direction == 'vertical'
        )
      }
    );
    return (typeof track != 'undefined');
  },

  sliderTrackLeft: function (slider) {
    track = slider_tracks.children.entries.find(
      function (track) {
        return (
          track.body.y == slider.body.y &&
          track.body.x == (slider.body.x - block_size) &&
          track.direction == 'horizontal'
        )
      }
    );
    return (typeof track != 'undefined');
  },
  sliderTrackRight: function (slider) {
    track = slider_tracks.children.entries.find(
      function (track) {
        return (
          track.body.y == slider.body.y &&
          track.body.x == (slider.body.x + block_size) &&
          track.direction == 'horizontal'
        )
      }
    );
    return (typeof track != 'undefined');
  },


  moveSliderUp: function (slider) {
    if (slider_actions.sliderTrackAbove(slider)) {
      slider.setY(slider.y - block_size);
      slider.refreshBody();
      utils.evalIfDefined(slider.up_function);
      player.setVelocityY(100);
    } else {
      audio.play_sfx('head_block');
    }
  },
  moveSliderDown: function (slider) {
    if (slider_actions.sliderTrackBelow(slider)) {
      slider.setY(slider.y + block_size);
      slider.refreshBody();
      utils.evalIfDefined(slider.down_function);
    } else {
      audio.play_sfx('head_block');
    }
  },
  moveSliderRight: function (slider) {
    if (slider_actions.sliderTrackRight(slider)) {
      slider.setX(slider.x + block_size);
      slider.refreshBody();
      utils.evalIfDefined(slider.right_function);
    } else {
      audio.play_sfx('head_block');
    }

  },
  moveSliderLeft: function (slider) {
    if (slider_actions.sliderTrackLeft(slider)) {
      slider.setX(slider.x - block_size);
      slider.refreshBody();
      utils.evalIfDefined(slider.left_function);
    } else {
      audio.play_sfx('head_block');
    }
  }
};
