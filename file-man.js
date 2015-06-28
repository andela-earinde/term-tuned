var path = require('path'),
    fs = require('fs');

exports.findMusic = function findMusic(startDir, filetype) {
    var musicFiles = []
    if (!fs.existsSync(startDir)){
        console.log("no dir ",startDir);
        return;
    }

    var files=fs.readdirSync(startDir);

    for(var i=0;i<files.length;i++){
        var filename = path.join(startDir,files[i]);
        if(filename.indexOf('.') !== 0){
          var stat = fs.lstatSync(filename);
          if (stat.isDirectory()){
              musicFiles = musicFiles.concat(findMusic(filename,filetype)); //recurse
          }
          else if (filename.indexOf(filetype)>=0) {
           musicFiles.push(filename)
          };
        }
    };
    return musicFiles;
};