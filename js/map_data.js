map_data = {
  default: {
    'W': {method: 'add_floor'},
    '+': {method: 'add_water'},
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    'B': {method: 'add_breaking_box'},
    'S': {method: 'add_spring'}
  },
  '001-boxes': {
    'D': {
      method: 'add_door',
      target: '002-doors'
    }
  },
  '002-doors': {
    '1': {method: 'add_door', name: '1', target: '2'},
    '2': {method: 'add_door', name: '2', target: '1'},
    '3': {method: 'add_door', target: '003-keys'}
  },
  // TODO add_key, interaction with key, sprite name for door
  '003-keys': {
    'R': {method: 'add_door', name: 'R', target: 'D', sprite: 'red_door', required: 'red_key'},
    'D': {method: 'add_door', name: 'D', target: 'R', sprite: 'red_door'},
    'G': {method: 'add_door', name: 'G', target: '004-breaking', sprite: 'green_door', required: 'green_key'},
    'r': {method: 'add_key', door: 'R', sprite: 'red_key', name: 'red_key'},
    'g': {method: 'add_key', door: 'G', sprite: 'green_key', name: 'green_key'}
  },
  '004-breaking': {
    'D': {
      method: 'add_door',
      target: '005-maze'
    }
  },
  '005-maze': {
    'O': {
      method: 'add_box',
      offsetY: 0.5
    },
    'r': {method: 'add_key', door: 'R', sprite: 'red_key', name: 'red_key'},
    'R': {method: 'add_door', name: 'R', sprite: 'red_door', required: 'red_key', target: 'T'},
    'T': {method: 'add_door', name: 'T', sprite: 'red_door', required: 'red_key', target: 'R'},

    'g': {method: 'add_key', sprite: 'green_key', name: 'green_key'},
    'G': {method: 'add_door', name: 'G', target: 'H', sprite: 'green_door', required: 'green_key'},
    'H': {method: 'add_door', name: 'H', target: 'G', sprite: 'green_door', required: 'green_key'},

    'b': {method: 'add_key', sprite: 'brown_key', name: 'brown_key'},
    'D': {method: 'add_door', name: 'D', target: '001-boxes', required: 'brown_key'}
  },
  '006-sliders': {
    'S': {method: 'add_slider', direction: 'vertical'},
    '|': {method: 'add_slider_track', direction: 'vertical'}
  }
};