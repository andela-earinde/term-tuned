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
    findMusic = require('./file-man.js').findMusic,
    storeMusicDir = require('./file-man.js').storeMusicDir,
    readMusicDir = require('./file-man.js').readMusicDir;

/**
 * Refactor this shit
 */


var currentDir = "";
var playlist
var currentMusic = "";

//check if a music directory has been save
// and load it to the playlist
function checkSavedDirOrLoad(currentDir) {
  var li = [];
  readFile = readMusicDir('./music_dir.txt');
  if(readFile) { 
    li = findMusic(readFile, '.mp3');
  } 
  else if(currentDir) {
    li = findMusic(currentDir, '.mp3');
  }  
  li.forEach(function(file) {
    list.add(file);
  });
  currentMusic = list.items[0].content;
  list.show();
  fm.hide();
  list.focus();
  screen.render();
}
checkSavedDirOrLoad();

//listen for add music click event
add.on('press', function() {
  list.hide();
  fm.show();
  fm.focus();
});

//listen for directory change event
fm.on('cd', function(directory) {
  currentDir = directory;
});

//listen for the add music files key event
screen.key(['s'], function(ch, key){
  checkSavedDirOrLoad(currentDir);
  storeMusicDir('./music_dir.txt', currentDir) //store the directory in a file
});

//listen for play button press event
play.on('press', function() {
  playlist = new Player(currentMusic);
  playlist.play(function(err, player) {
    console.log(player);
  });
});

//listen for next button event
next.on('press', function() {
});