var fs = require('fs');
var readline = require('readline');
var crypto = require('crypto');
var header;

function GetHeader(firstLine) {

    var segment = firstLine.split(",");
    for (var i = 0; i < segment.length; i++) {
        segment[i] = segment[i].replace('"', '').replace('"', '');
    }
    return segment;
}

function GetRow(line, valueSeparate, ln) {
    var segment = line.split(valueSeparate);
    var ent = {};
    var raw = '';
    for (var i = 0; i < segment.length; i++) {
        var value = segment[i].replace('"', '').replace('"', '');
        ent[header[i]] = value;
        raw += value;
    }

    ent["hashCode"] = crypto.createHash('md5').update(raw).digest("hex");
    ent["lineNumber"] = ln;
    return ent;
}

function getContent(fileName, valueSparate, callback) {
    var count = 0;
    var content = [];

    var rd = readline.createInterface({
        input: fs.createReadStream(fileName),
        output: process.stdout,
        terminal: false
    });

    rd.on('line', function (line) {
        if (count == 0)
            header = GetHeader(line)
        else {
            var obj = GetRow(line, valueSparate, count);
            content.push(obj);
        }
        count++;
    });

    rd.on('close', function () {
        callback(content);
    })
}

function getContentObject(fileName, valueSparate, indexKey, callback) {
    var count = 0;
    var content = {};

    var rd = readline.createInterface({
        input: fs.createReadStream(fileName),
        output: process.stdout,
        terminal: false
    });

    rd.on('line', function (line) {
        if (count == 0)
            header = GetHeader(line)
        else {
            var obj = GetRow(line, valueSparate, count);
            content[obj[indexKey]]=obj;
        }
        count++;
    });

    rd.on('close', function () {
        callback(content);
    })
}


module.exports = {
    getContent: getContent,
    getContentObject: getContentObject,
}