var blessed = require('blessed'),
    contrib = require('blessed-contrib');

var screen = blessed.screen({
  tput: true,
  autoPadding: true,
  smartCSR: true,
  dockBorders: true
});

screen.title = "term-tunes";

screen.append(blessed.text({
  top: 0,
  left: 2,
  width: '100%',
  //bg: 'blue',
  content: '{green-fg}Welcome to term tunes{/green-fg}',
  style: {
    bg: '#0000ff'
  },
  // bg: blessed.colors.match('#0000ff'),
  tags: true,
  align: 'center'
}));

////////////////////////////////
//widget for handling tht boxes
var box = blessed.box({
  top: '70%',
  left: 'center',
  width: '100%',
  height: '40%',
  content: 'Hello {bold}World{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
///////////////////////////////////////

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

table.focus();
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

fm.on('keypress', function(ch, key) {
    if (key.name === 'up' || key.name === 'k') {
      screen.render();
      return;
    } else if (key.name === 'down' || key.name === 'j') {
      screen.render();
      return;
    }
});

fm.hide();
fm.refresh();

/////////////////////////////////

screen.append(box);

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

//box.focus();

screen.render();
