var csvCompare = require('./csv_service/csvCompare');

csvCompare.indexKey = "ClassID";
csvCompare.exportFileName = "diff.json";
//csvCompare.csvDifference('doc.b.csv', 'doc.a.csv', '","');
csvCompare.csvDifference('Classes.20161210.csv', 'Classes.20161207.csv', '","');