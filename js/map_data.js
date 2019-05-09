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
    '3': {method: 'add_door', target: '003-text'}
  },
  // TODO add_key, interaction with key, sprite name for door
  '003-keys': {
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    'R': {method: 'add_door', name: 'R', target: 'D', sprite: 'green_door'},
    'D': {method: 'add_door'},
    'G': {method: 'add_door', name: 'G', target: '004-something', sprite: 'green_door'},
    'r': {method: 'add_key', door: 'R', sprite: 'red_key'},
    'g': {method: 'add_key', door: 'G', sprite: 'green_key'}
  }
};