var fs = require('fs');
var readline = require('readline');
var crypto = require('crypto');

var rd = readline.createInterface({
    input: fs.createReadStream('Classes.csv'),
    output: process.stdout,
    terminal : false
});

var count = 0;
var header;
var content = [];

rd.on('line', function(line){
    if(count ==0 )
      header = GetHeader(line)
    else
    {
      var obj = JSON.stringify(GetRow(line, count));
      console.log(obj);
      content.push(obj);
    }
    count++;
});

rd.on('end', function(){
    console.log(content.length);
})

function GetHeader(firstLine){

    var segment = firstLine.split(",");
    var i=0;
    for(; i<segment.length;i++)
    {
        segment[i]=segment[i].substring(1,segment[i].length-1);
    }
    segment[i]="hashCode";
    segment[i+1]="lineNumber";

    return segment;
}

function GetRow(line, ln){
    var segment = line.split(",");
    var ent = {};
    var raw  = "";
    for(var i =0 ; i<segment.length;i++){
        var value = segment[i].substring(1,segment[i].length-1);
        ent[header[i]] = value
        raw+=value;
    }

    ent["hashcode"] = crypto.createHash('md5').update(raw).digest("hex");
    ent["lineNumber"] = ln;

    return ent;
}