map_data = {
  default: {
    "W": {method: "add_floor"},
    "+": {method: "add_water"},
    "#": {method: "add_box"},
    "P": {method: "move_player"},
    "B": {method: "add_breakable_box"},
    "S": {method: "add_spring"},

    "V": {method: "add_slider", direction: "vertical"},
    "|": {method: "add_slider_track", direction: "vertical"},
    "-": {method: "add_slider_track", direction: "horizontal"},
    "H": {method: "add_slider", direction: "horizontal"},

    // Night box delimiters
    "3": {method: "add_floor"},
    "4": {method: "add_floor"},

    "r": {method: "add_key", sprite: "red_key", name: "red_key"},
    "g": {method: "add_key", sprite: "green_key", name: "green_key"},
    "b": {method: "add_key", sprite: "brown_key", name: "brown_key"}
  },
  "000-home": {
    "T": [
      {method: "add_text", text: "Welcome to Night and Day"},
      {method: "add_text", text: "Enter the door to start"},
      {method: "add_text", text: "Keep walking for settings"},
      {method: "add_text", text: "Press the DOWN arrow to enter doors.", fontSize: "16px"}
    ],
    'M': [
      {method: "add_text", text: "Music"},
      {method: "add_text", text: "Volume"}
    ],
    'S': [
      {method: "add_text", text: "Sound Effects"},
      {method: "add_text", text: "Volume"}
    ],
    'V': [
      {method: "add_slider", direction: "vertical", up_function: 'audio.music_up()', down_function: 'audio.music_down()'},
      {method: "add_slider", direction: "vertical", up_function: 'audio.sfx_up()', down_function: 'audio.sfx_down()'}
    ],
    "D": {method: "add_door", target: "001-boxes"}
  },
  "001-boxes": {
    "D": {method: "add_door", target: "002-doors"},
    "T": {method: "add_text", text: "Jump with the UP arrow.", fontSize: "16px"}
  },
  "002-doors": {
    "d": [
      {method: "add_door", name: "1", target: "2"},
      {method: "add_door", name: "2", target: "1"}
    ],
    "D": {method: "add_door", target: "003-keys"}
  },
  "003-keys": {
    "R": [
      {method: "add_door", name: "R", target: "D", sprite: "red_door", required: "red_key"},
      {method: "add_door", name: "D", target: "R", sprite: "red_door", required: "red_key"}
    ],
    "G": {method: "add_door", name: "G", target: "004-breaking", sprite: "green_door", required: "green_key"},
    "h": {method: "add_text", text: "Some doors need keys to be opened.", fontSize: "16px"}
  },
  "004-breaking": {
    "D": {method: "add_door", target: "005-maze"},
    "T": [
      {method: "add_text", text: "That floor looks weak.", fontSize: "16px"},
      {method: "add_text", text: "Try pressing DOWN while in the air.", fontSize: "16px"},
      {method: "add_text", text: "Trapped? Press R to restart.", fontSize: "16px"}
    ]
  },
  "005-maze": {
    "O": {
      method: "add_box",
      offsetY: 0.5
    },
    "R": [
      {method: "add_door", name: "R1", sprite: "red_door", required: "red_key", target: "R2"},
      {method: "add_door", name: "R2", sprite: "red_door", required: "red_key", target: "R1"}
    ],
    "G": [
      {method: "add_door", name: "G1", target: "G2", sprite: "green_door", required: "green_key"},
      {method: "add_door", name: "G2", target: "G1", sprite: "green_door", required: "green_key"}
    ],
    "D": {method: "add_door", name: "D", target: "006-sliders", required: "brown_key"},
    "T": {method: "add_text", text: "Press DOWN to bounce higher.", fontSize: "16px"}
  },
  "006-sliders": {
    "D": {method: "add_door", name: "D", target: "007-night"},

    "R":
      [
        {method: "add_door", name: "R1", sprite: "red_door", required: "red_key", target: "R2"},
        {method: "add_door", name: "R2", sprite: "red_door", required: "red_key", target: "R1"}
      ],

    "G": [
      {method: "add_door", name: "G1", target: "G2", sprite: "green_door", required: "green_key"},
      {method: "add_door", name: "G2", target: "G1", sprite: "green_door", required: "green_key"}
    ],
    "T": [
      {method: "add_text", text: "Slam the slider", fontSize: "16px"},
      {method: "add_text", text: "to move it", fontSize: "16px"}
    ]
  },
  "007-night": {
    "D": [
      {method: "add_door", target: "D2", name: "D1"},
      {method: "add_door", target: "D1", name: "D2"}
    ],
    "E": {method: "add_door", target: "008-many-doors"},
    "R": [
      {method: "add_door", target: "r", sprite: "red_door", name: "R"},
      {method: "add_door", target: "R", sprite: "red_door", name: "r"}
    ],
    "T": [
      {method: "add_text", text: "Oops, nothing over here...", fontSize: "16px", fill: "#fff"},
      {method: "add_text", text: "Maybe take a leap of faith?", fontSize: "16px", fill: "#fff"}
    ]
  },
  "008-many-doors": {
    "D": [
      {"method": "add_door", "name": "D1", "target": "D6"},
      {"method": "add_door", "name": "D2", "target": "D11"},
      {"method": "add_door", "name": "D3", "target": "D16"},
      {"method": "add_door", "name": "D4", "target": "D5"},
      {"method": "add_door", "name": "D5", "target": "D4"},
      {"method": "add_door", "name": "D6", "target": "D1"},
      {"method": "add_door", "name": "D7", "target": "D18"},
      {"method": "add_door", "name": "D8", "target": "D12"},
      {"method": "add_door", "name": "D9", "target": "D10"},
      {"method": "add_door", "name": "D10", "target": "D9"},
      {"method": "add_door", "name": "D11", "target": "D2"},
      {"method": "add_door", "name": "D12", "target": "D8"},
      {"method": "add_door", "name": "D13", "target": "D17"},
      {"method": "add_door", "name": "D14", "target": "D15"},
      {"method": "add_door", "name": "D15", "target": "D14"},
      {"method": "add_door", "name": "D16", "target": "D3"},
      {"method": "add_door", "name": "D17", "target": "D13"},
      {"method": "add_door", "name": "D18", "target": "D7"},
      {"method": "add_door", "name": "D19", "target": "D20"},
      {"method": "add_door", "name": "D20", "target": "D19"}
    ],
    "R": {method: "add_door", target: "000-home", sprite: "red_door", required: "red_key"}
  },
  "TEST-000-night-and-day": {
    "D": [
      {method: "add_door", target: "F", name: "D"},
      {method: "add_door", target: "D", name: "F"}
    ],
    "G": [
      {method: "add_door", target: "G2", name: "G1", sprite: "green_door"},
      {method: "add_door", target: "G1", name: "G2", sprite: "green_door"}
    ],
    "R": [
      {method: "add_door", target: "R2", name: "R1", sprite: "red_door"},
      {method: "add_door", target: "R1", name: "R2", sprite: "red_door"}
  }
};
