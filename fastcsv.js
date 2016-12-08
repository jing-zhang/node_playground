var csv = require('fast-csv');

csv('Classes.csv')
    .on('data', function(data){
        console.log(data);
    })
    .on('end',function(){
        console.log('Done');
    })
    .parse();