var csvCompare = require('./csv_service/csvCompare');

csvCompare.indexKey = "ClassID";
csvCompare.exportFileName = "diff.json";
//csvCompare.csvDifference('doc.b.csv', 'doc.a.csv', '","');
csvCompare.csvDifference('Classes.20161210.csv', 'Classes.20161207.csv', '","');

// var firstLine = '"E-000003591-M-11-0010-I-2016-2017","001","000003591","Axman, Mitchell - M-11"';
// var segment = firstLine.split(",");