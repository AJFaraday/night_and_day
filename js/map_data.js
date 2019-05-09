map_data = {
  '001-boxes': {
    '#': {method: 'add_box'},
    'D': {
      method: 'add_door',
      target: '002-stars'
    },
    'P': {method: 'move_player'}
  },
  '002-stars': {
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    '1': {method: 'add_door', name: '1', target: '2'},
    '2': {method: 'add_door', name: '2', target: '1'},
    '3': {method: 'add_door', target: '003-keys'}
  },
  // TODO add_key, interaction with key, sprite name for door
  '003-keys': {
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    'R': {method: 'add_door', name: 'R', target: 'D', sprite: 'red_door', required: 'red_key'},
    'D': {method: 'add_door', name: 'D'},
    'G': {method: 'add_door', name: 'G', target: '004-something', sprite: 'green_door', required: 'green_key'},
    'r': {method: 'add_key', door: 'R', sprite: 'red_key', name: 'red_key'},
    'g': {method: 'add_key', door: 'G', sprite: 'green_key', name: 'green_key'}
  }
};