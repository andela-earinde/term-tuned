var blessed = require('blessed'),
    contrib = require('blessed-contrib');

var screen = blessed.screen({
  tput: true,
  autoPadding: true,
  smartCSR: true,
  dockBorders: true
});

screen.title = "Term-Tunes";

screen.append(blessed.text({
  top: 0,
  left: 2,
  width: '100%',
  //bg: 'blue',
  content: '{green-fg}Welcome to Term Tunes{/green-fg}',
  style: {
    bg: '#0000ff'
  },
  // bg: blessed.colors.match('#0000ff'),
  tags: true,
  align: 'center'
}));

////////////////////////////////
//widget for handling tht boxes
///////////////////////////////
var box = blessed.box({
  top: '70%',
  left: 'center',
  width: '100%',
  height: '40%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
  }
});

screen.append(box);

//TODO: reduce this button instance: make it DRY
//insert start button int box wigdet
var play = blessed.button({
  parent: box,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  tags: true,
  height: '50%',
  width: '20%',
  left: 'center',
  top: 'center',
  shrink: true,
  name: 'Play',
  content: '{center}\nPlay{/center}',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

//insret button next
var next = blessed.button({
  parent: box,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  tags: true,
  height: '50%',
  width: '20%',
  left: '60%',
  top: 'center',
  shrink: true,
  name: 'Next',
  content: '{center}\nNext{/center}',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var previous = blessed.button({
  parent: box,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  tags: true,
  height: '50%',
  width: '20%',
  left: '20%',
  top: 'center',
  shrink: true,
  name: 'Previous',
  content: '{center}\nPrevious{/center}',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var add = blessed.button({
  parent: box,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  tags: true,
  left: '0%',
  top: 'center',
  shrink: true,
  name: 'add',
  width: '10%',
  height: '30%',
  content: '{center}\nAdd{/center}',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});
///////////////////////////////////////
//End of Box widget
////////////////////////////////////

//////////////////////////////////////////
var table = blessed.listtable({
  parent: screen,
  top: '5%',
  left: 'center',
  data: null,
  border: 'line',
  align: 'center',
  tags: true,
  keys: false,
  width: '100%',
  height: '15%',
  vi: true,
  mouse: true,
  style: {
    border: {
      fg: 'white'
    },
    header: {
      fg: 'blue',
      bold: true
    },
    cell: {
      fg: 'magenta',
      selected: {
        bg: 'blue'
      }
    }
  }
});

var data = [
  [ 'Title',  'Artist',  'Album']
];

table.setData(data);

screen.append(table);
/////////////////////////////////

////////////////////
//list section
var list = blessed.list({
  parent: screen,
  top: '20%',
  align: 'center',
  mouse: true,
  border: 'line',
  style: {
    fg: 'blue',
    bg: 'default',
    border: {
      fg: 'default',
      bg: 'default'
    },
    selected: {
      bg: 'green'
    }
  },
  width: '100%',
  height: '50%',
  left: 'center',
  tags: true,
  invertSelected: false,
  items: [
    'one',
    '{red-fg}two{/red-fg}',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten'
  ],
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'yellow'
    },
    style: {
      inverse: true
    }
  }
});

screen.append(list);
list.select(0);


var item = list.items[1];
list.removeItem(list.items[1]);
list.insertItem(1, item.getContent());

list.on('keypress', function(ch, key) {
  if (key.name === 'up' || key.name === 'k') {
    list.up();
    screen.render();
    return;
  } else if (key.name === 'down' || key.name === 'j') {
    list.down();
    screen.render();
    return;
  }
});

//
///////////////////////////////////

//////////////////////////////////
var fm = blessed.filemanager({
  parent: screen,
  border: 'line',
  style: {
    selected: {
      bg: 'blue'
    }
  },
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}%path{/blue-fg} ',
  cwd: process.env.HOME,
  keys: true,
  vi: true,
  scrollbar: {
    bg: 'white',
    ch: ' '
  }
});

fm.hide();
fm.refresh();

/////////////////////////////////

screen.key(['s', 'h'], function(ch, key) {
  if(ch === 's'){
    fm.focus();
    fm.show();
    list.hide();
    fm.refresh();
    screen.render();
  }
  else if (ch === 'h') {
    fm.hide();
    list.focus();
    list.show();
    screen.render();
  }
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render();

//export the widgets to be used in the player logic
exports.screen = screen;
exports.fm = fm;
exports.list = list;
exports.box = box;
exports.play = play;
exports.previous = previous;
exports.next = next;