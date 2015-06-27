var blessed = require('blessed'),
    contrib = require('blessed-contrib');

var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true
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

var box = blessed.box({
  top: '80%',
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

var table = blessed.listtable({
  parent: screen,
  top: 'center',
  left: 'center',
  data: null,
  border: 'line',
  align: 'center',
  tags: true,
  keys: true,
  width: '80%',
  height: '70%',
  vi: true,
  mouse: true,
  style: {
    border: {
      fg: 'red'
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
  [ 'Animals',  'Foods',  'Times',   'Numbers' ],
  [ 'Elephant', 'Apple',  '1:00am',  'One'     ],
  [ 'Bird',     'Orange', '2:15pm',  'Two'     ],
  [ 'T-Rex',    'Taco',   '8:45am',  'Three'   ],
  [ 'Mouse',    'Cheese', '9:05am',  'Four'    ]
];

table.setData(data);

table.focus();

screen.append(box);

box.on('click', function(data) {
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

box.key('enter', function(ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

box.focus();

screen.render();
