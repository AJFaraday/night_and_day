map_data = {
  default: {
    'W': {method: 'add_floor'},
    '+': {method: 'add_water'},
    '#': {method: 'add_box'},
    'P': {method: 'move_player'},
    'B': {method: 'add_breakable_box'},
    'S': {method: 'add_spring'},

    'V': {method: 'add_slider', direction: 'vertical'},
    '|': {method: 'add_slider_track', direction: 'vertical'},
    '-': {method: 'add_slider_track', direction: 'horizontal'},
    'H': {method: 'add_slider', direction: 'horizontal'},

    // Night box delimiters
    '3': {method: 'add_box'},
    '4': {method: 'add_box'},

    'r': {method: 'add_key', sprite: 'red_key', name: 'red_key'},
    'g': {method: 'add_key', sprite: 'green_key', name: 'green_key'},
    'b': {method: 'add_key', sprite: 'brown_key', name: 'brown_key'}
  },
  '000-home': {
    'T': {method: 'add_text', text: 'Welcome to Night and Day'},
    'd': {method: 'add_text', text: 'Enter the door to start'},
    's': {method: 'add_text', text: 'Keep walking for settings'},
    'v': {method: 'add_text', text: 'Volume'},
    'D': {method: 'add_door', target: '001-boxes'}
  },
  '001-boxes': {
    'D': {method: 'add_door', target: '002-doors'}
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
    'G': {method: 'add_door', name: 'G', target: '004-breaking', sprite: 'green_door', required: 'green_key'}
  },
  '004-breaking': {
    'D': {method: 'add_door', target: '005-maze'}
  },
  '005-maze': {
    'O': {
      method: 'add_box',                                   'D': {method: 'add_door', target: 'F'},
    'F': {method: 'add_door', target: 'D'},
      offsetY: 0.5
    },
    'R': {method: 'add_door', name: 'R', sprite: 'red_door', required: 'red_key', target: 'T'},
    'T': {method: 'add_door', name: 'T', sprite: 'red_door', required: 'red_key', target: 'R'},

    'G': {method: 'add_door', name: 'G', target: 'H', sprite: 'green_door', required: 'green_key'},
    'H': {method: 'add_door', name: 'H', target: 'G', sprite: 'green_door', required: 'green_key'},

    'D': {method: 'add_door', name: 'D', target: '006-sliders', required: 'brown_key'}
  },
  '006-sliders': {
    'D': {method: 'add_door', name: 'D', target: '001-boxes'},

    'R': {method: 'add_door', name: 'R', sprite: 'red_door', required: 'red_key', target: 'T'},
    'T': {method: 'add_door', name: 'T', sprite: 'red_door', required: 'red_key', target: 'R'},

    'G': {method: 'add_door', name: 'G', target: 'H', sprite: 'green_door', required: 'green_key'},
    'F': {method: 'add_door', name: 'H', target: 'G', sprite: 'green_door', required: 'green_key'}
  },
  '007-night-and-day': {
    '3': {method: 'add_floor'},
    '4': {method: 'add_floor'},
    'D': {method: 'add_door', target: 'F', name: 'D'},
    'F': {method: 'add_door', target: 'D', name: 'F'},
    'G': {method: 'add_door', target: '007-night-and-day', sprite: 'green_door'},
    'R': {method: 'add_door', target: '007-night-and-day', sprite: 'red_door'}
  }
};