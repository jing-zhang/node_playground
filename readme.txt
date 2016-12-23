csv compare
the purpose of this code is get differtial data from two csv files. 

var csvCompare = require('./csv_service/csvCompare');
csvCompare.csvDifference('doc.b.csv', 'doc.a.csv', '","', "ClassID", "diffs.json");

paramter list
1) file a, 
2) file b, 
3) CSV dilimiter,
4) csv file indexKey,
5) export csv file name,

the export will be json format file, has additional field of hashcode and action. 
hashcode is the hash value for all fields
action has three values. [add, update, delete] 

Add csvCompare2 methods
the performance improve about 50 times better than previous version.