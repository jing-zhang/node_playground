var readcsv = require('./csvReader');
var fs = require('fs');

var count = 0;
var content1;
var content2;
var diff = [];
var exportFileName;
var start;

function getResult(result) {
    if (count == 0) {
        content1 = result;
        count++;
    }
    else {
        content2 = result;
        sync(content1, content2);
    }
}



function sync(con1, con2) {

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


function compareCsv(filename1, filename2, valueSeparete, indKey, exportFN) {
    start = new Date();
    exportFileName = exportFN;
    readcsv.getContentObject(filename1, valueSeparete, indKey, getResult);
    readcsv.getContentObject(filename2, valueSeparete, indKey, getResult);
}

module.exports = {
    csvDifference: compareCsv
}
