var widgets = require('./term-widgets.js'),
    add = widgets.add,
    fm = widgets.fm,
    list = widgets.list,
    box = widgets.box,
    play = widgets.play,
    next = widgets.next,
    previous = widgets.previous,
    screen = widgets.screen,

    Player = require('player'),
    findMusic = require('./file-man.js').findMusic;

var currentDir = "";
var playlist;

//listen for add music click event
add.on('press', function() {
  list.hide();
  fm.show();
  fm.focus();
});

fm.on('cd', function(directory) {
  currentDir = directory;
});

//listen for the add music files key event
screen.key(['s'], function(ch, key){
  var li = [];
  li = findMusic(currentDir, '.mp3');
  li.forEach(function(file) {
    list.add(file);
  });
  playlist = new Player(li);
  list.show();
  fm.hide();
  list.focus();
  screen.render();
});

//listen for play button press event
play.on('press', function() {
 playlist.play();
})