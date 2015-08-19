function printHelp(){
    console.log("app.js (c) Nathan Noonan");
    console.log("");
    console.log("usage:");
    console.log("--help                  print this help");
    console.log("--file={NAME}           read the file of {NAME} and output it");
    console.log("");
}


var args = require("minimist")(process.argv.slice(2), { string: "file" });

if (args.help || !args.file) {
    printHelp();
    process.exit(1);
}

var hello = require("./helloWorld.js");


hello.say(args.file)
.val(function (contents) {
    console.log(contents.toString());
})
.or(function (err) {
    console.error("Error: " + err);
});