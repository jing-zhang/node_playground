var csvCompare = require('./csv_service/csvCompare');
var csvCompare2 = require('./csv_service/csvCompare2');

//csvCompare.csvDifference('doc.b.csv', 'doc.a.csv', '","', "ClassID", "diffs.json");
//csvCompare.csvDifference('Classes.20161210.csv', 'Classes.20161207.csv', '","', "ClassID", "diffs.json");

//csvCompare.csvDifference2('doc.b.csv', 'doc.a.csv', '","', "ClassID", "diffs.json");
//csvCompare2.csvDifference('Classes.20161210.csv', 'Classes.20161207.csv', '","', "ClassID", "diffs.json");
csvCompare2.csvDifference('roster.b.csv', 'roster.a.csv', '","', "hashCode", "diffs.json");

//add new line
//add featuer for 201701/try1
