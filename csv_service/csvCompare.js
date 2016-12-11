var readcsv = require('./csvReader');
var fs = require('fs');

var count = 0;
var content1;
var content2;
var diff = [];
var indexKey = "ClassID";
var exportFileName = "diff.json";
var start;

function getResult(result) {
    if (count == 0) {
        content1 = result;
        count++;
    }
    else {
        content2 = result;
        sync(content1, content2, indexKey);
    }
}



function sync(con1, con2, indexKey) {
    for (var i = 0; i < con1.length; i++) {
        var con = con1[i];
        var found = findElement(con2, indexKey, con[indexKey])
        if (found && found.hashCode == con.hashCode)
            continue;
        else {
            con["action"] = "add";
            diff.push(con);
            //console.log(JSON.stringify(con));
        }
    }

    for (var i = 0; i < con2.length; i++) {
        var con = con2[i];
        var found = findElement(con1, indexKey, con[indexKey])
        if (found)
            continue;
        else {
            con["action"] = "del";
            diff.push(con);
            //console.log(JSON.stringify(con));
        }
    }

    if (diff.length > 0) {
        console.log("diff : " + diff.length);
        fs.writeFileSync('./' + exportFileName, JSON.stringify(diff), 'utf-8');
        var end = new Date() - start;
        console.info("Execution time: %dms", end);
    }
}

function findElement(arr, indexKey, value) {
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (element[indexKey] === value)
            return element
    }
}


function compareCsv(filename1, filename2, valueSeparete) {
    start = new Date();

    readcsv.getContent(filename1, valueSeparete, getResult);
    readcsv.getContent(filename2, valueSeparete, getResult);

}


//compareCSVs('doc.b.csv', 'doc.a.csv', '","', );

module.exports = {
    indexKey: indexKey,
    exportFileName: exportFileName,
    csvDifference: compareCsv
}
