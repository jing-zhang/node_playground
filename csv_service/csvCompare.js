var readcsv = require('./csvReader');
var fs = require('fs');

var count = 0;
var content1;
var content2;
var diff = [];
var indexKey;
var exportFileName;
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

function getResult2(result) {
    if (count == 0) {
        content1 = result;
        count++;
    }
    else {
        content2 = result;
        sync2(content1, content2);
    }
}

function sync(con1, con2, indexKey) {
    for (var i = 0; i < con1.length; i++) {
        var con = con1[i];
        var found = findElement(con2, indexKey, con[indexKey])
        if (found) {
            if (found.hashCode === con.hashCode)
                continue;
            else
                con["action"] = "upd";
        }
        else {
            con["action"] = "add";
        }
        diff.push(con);
        //console.log(JSON.stringify(con));
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

function sync2(con1, con2) {

    Object.keys(con1).forEach(function (key, index) {
        var con = con1[key];
        if (con2[key])
            if (con.hashCode == con2[key].hashCode)
                return;
            else
                con["action"] = "upd";
        else
            con["action"] = "add";
        diff.push(con);
    });

    Object.keys(con2).forEach(function (key, index) {
        var con = con2[key];
        if (con1[key])
            return;
        else
            con["action"] = "del";
        diff.push(con);
    });


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


function compareCsv(filename1, filename2, valueSeparete, indKey, exportFN) {
    start = new Date();
    indexKey = indKey;
    exportFileName = exportFN;
    readcsv.getContent(filename1, valueSeparete, getResult);
    readcsv.getContent(filename2, valueSeparete, getResult);

}

function compareCsv2(filename1, filename2, valueSeparete, indKey, exportFN) {
    start = new Date();
    indexKey = indKey;
    exportFileName = exportFN;
    readcsv.getContentObject(filename1, valueSeparete, indKey, getResult2);
    readcsv.getContentObject(filename2, valueSeparete, indKey, getResult2);
}


//compareCSVs('doc.b.csv', 'doc.a.csv', '","', );

module.exports = {
    csvDifference: compareCsv,
    csvDifference2: compareCsv2
}
