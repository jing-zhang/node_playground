var csvCompare = require('./csv_service/csvCompare');

csvCompare.csvDifference('doc.b.csv', 'doc.a.csv', '","', "ClassID", "diffs.json");
//csvCompare.csvDifference('Classes.20161210.csv', 'Classes.20161207.csv', '","', "ClassID", "diffs.json");
