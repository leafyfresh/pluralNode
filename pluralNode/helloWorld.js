function readFile(filename){

    return ASQ(function (done) {
        var stream = fs.createReadStream(filename);
        var contents = "";
        
        stream.pipe(fs.createWriteStream(filename + ".backup"));

        stream.on("data", function (chunk) {
            console.log("data");
            contents += chunk;
        });
        stream.on("end", function () {
            done(contents);
        });
    });

    //var sq = ASQ(); 
    //fs.readFile(filename, sq.errfcb());
    //console.log(sq.eerfcb);   
    //return sq;
}
function delayMsg(done, contents){
    setTimeout(function () {
        done(contents);
       // console.log(contents.toString());
    },1000);
}


function say(filename){
    console.log("my file:" + filename);
    return readFile(filename)
        .then(delayMsg);
}



var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");

module.exports.say = say;   