map_data = {
  '001-boxes': {
    'W': {method: 'add_floor'},
    '+': {method: 'add_water'},
    '#': {method: 'add_box'},
    'D': {
      method: 'add_door',
      target: '002-doors'
    },
    'P': {method: 'move_player'}
  },
  '002-doors': {
    'W': {method: 'add_floor'},
    '+': {method: 'add_water'},
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    '1': {method: 'add_door', name: '1', target: '2'},
    '2': {method: 'add_door', name: '2', target: '1'},
    '3': {method: 'add_door', target: '003-keys'}
  },
  // TODO add_key, interaction with key, sprite name for door
  '003-keys': {
    'W': {method: 'add_floor'},
    '+': {method: 'add_water'},
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    'R': {method: 'add_door', name: 'R', target: 'D', sprite: 'red_door', required: 'red_key'},
    'D': {method: 'add_door', name: 'D', target: 'R', sprite: 'red_door'},
    'G': {method: 'add_door', name: 'G', target: '004-breaking', sprite: 'green_door', required: 'green_key'},
    'r': {method: 'add_key', door: 'R', sprite: 'red_key', name: 'red_key'},
    'g': {method: 'add_key', door: 'G', sprite: 'green_key', name: 'green_key'}
  },
  '004-breaking': {
    'W': {method: 'add_floor'},
    '+': {method: 'add_water'},
    '#': {method: 'add_box'},
    'B': {method: 'add_breaking_box'}  ,
    'D': {
      method: 'add_door',
      target: '005-something'
    } ,
    'P': {method: 'move_player'}
  }
};